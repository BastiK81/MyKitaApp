package de.bastisdevelopment.mykitaapp.service;

import de.bastisdevelopment.mykitaapp.dtos.KitaDTO;
import de.bastisdevelopment.mykitaapp.items.AppUser;
import de.bastisdevelopment.mykitaapp.items.KitaDBItem;
import de.bastisdevelopment.mykitaapp.repository.KitaRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class KitaService {

    private static final Logger logger = LoggerFactory.getLogger(KitaService.class);
    private final KitaRepository repository;
    private final AppUserService userService;

    public KitaService(KitaRepository repository, AppUserService userService) {
        this.repository = repository;
        this.userService = userService;
    }

    public KitaDTO getKitaByAdmin() throws Exception {
        AppUser user = userService.getActualUser();
        KitaDBItem kitaDBItem = repository.findByAdminId(user.getId())
                .orElseThrow(() -> new Exception(String.format("For Admin %s no Kita was found", user.getEmail())));
        logger.info(String.format("Get Kita %s with Admin %s", kitaDBItem.getName(), user.getEmail()));
        return  new KitaDTO(kitaDBItem);
    }

    public KitaDTO addKita(KitaDTO kita) {
        KitaDBItem kitaDBItem = new KitaDBItem(kita);
        kitaDBItem.setAdminId(userService.getActualUser().getId());
        if (repository.findByName(kita.getName()).isPresent()) {
            throw new IllegalStateException(String.format("Kita %s already exist", kita.getName()));
        }
        if (repository.findByAdminId(kitaDBItem.getAdminId()).isPresent()) {
            throw new IllegalStateException(String.format("User %s already is Kita Admin", userService.getActualUser().getEmail()));
        }
        kitaDBItem = repository.save(kitaDBItem);
        logger.info("Kita %s added", kitaDBItem.getName());
        return new KitaDTO(kitaDBItem);
    }
}
