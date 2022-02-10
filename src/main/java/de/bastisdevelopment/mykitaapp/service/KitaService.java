package de.bastisdevelopment.mykitaapp.service;

import de.bastisdevelopment.mykitaapp.dtos.KitaDTO;
import de.bastisdevelopment.mykitaapp.items.AppUserDBItem;
import de.bastisdevelopment.mykitaapp.items.KitaDBItem;
import de.bastisdevelopment.mykitaapp.repository.KitaRepository;
import de.bastisdevelopment.mykitaapp.utils.PlaySchoolVisibility;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class KitaService {

    private static final Logger logger = LoggerFactory.getLogger(KitaService.class);
    private final KitaRepository kitaRepository;
    private final AppUserService userService;

    public KitaService(KitaRepository repository, AppUserService service) {
        this.kitaRepository = repository;
        this.userService = service;
    }

    public KitaDTO getKitaByAdmin() throws Exception {
        AppUserDBItem user = userService.getActualUser();
        KitaDBItem kitaDBItem = kitaRepository.findByAdminId(user.getId())
                .orElseThrow(() -> new Exception(String.format("For Admin %s no Kita was found", user.getEmail())));
        logger.info(String.format("Get Kita %s with Admin %s", kitaDBItem.getName(), user.getEmail()));
        return new KitaDTO(kitaDBItem);
    }

    public KitaDTO addKita(KitaDTO kita) {
        KitaDBItem kitaDBItem = initialiseKitaDBItem(kita);
        if (kitaRepository.findByName(kita.getName()).isPresent()) {
            throw new IllegalStateException(String.format("Kita %s already exist", kita.getName()));
        }
        if (kitaRepository.findByAdminId(kitaDBItem.getAdminId()).isPresent()) {
            throw new IllegalStateException(String.format("User %s already is Kita Admin", userService.getActualUser().getEmail()));
        }
        kitaDBItem = kitaRepository.save(kitaDBItem);
        logger.info("Kita added");
        return new KitaDTO(kitaDBItem);
    }

    private KitaDBItem initialiseKitaDBItem(KitaDTO kitaDTO) {
        KitaDBItem kitaDBItem = new KitaDBItem(kitaDTO);
        kitaDBItem.initialiseVisibility();
        this.initialiseUser(kitaDBItem);
        return kitaDBItem;
    }

    private void initialiseUser(KitaDBItem kitaDBItem) {
        String userId = userService.getActualUser().getId();
        kitaDBItem.setAdminId(userId);
        kitaDBItem.setMemberIds(new ArrayList<>());
        kitaDBItem.addMember(userId);
    }

    public Map<String, Boolean> getVisibility(String kitaId) throws Exception {
        KitaDBItem kitaDBItem = kitaRepository.findById(kitaId)
                .orElseThrow(() -> new Exception("Kita not Found"));
        if (userService.getActualUser().getId().equalsIgnoreCase(kitaDBItem.getAdminId())) {
            return kitaDBItem.getVisibility();
        }
        throw new IllegalStateException("No permissions to get Kita visibility");
    }

    public void changeVisibility(String kitaId, Map<String, Boolean> visibility) throws Exception {
        KitaDBItem kitaDBItem = kitaRepository.findById(kitaId)
                .orElseThrow(() -> new Exception("Kita not Found"));
        if (userService.getActualUser().getId().equalsIgnoreCase(kitaDBItem.getAdminId())) {
            kitaDBItem.changeVisibility(visibility);
            kitaRepository.save(kitaDBItem);
            return;
        }
        throw new IllegalStateException("No permissions to get Kita visibility");
    }
}
