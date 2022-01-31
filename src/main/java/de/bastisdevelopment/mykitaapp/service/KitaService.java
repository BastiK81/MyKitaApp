package de.bastisdevelopment.mykitaapp.service;

import de.bastisdevelopment.mykitaapp.dtos.KitaDTO;
import de.bastisdevelopment.mykitaapp.items.AppUser;
import de.bastisdevelopment.mykitaapp.items.KitaDBItem;
import de.bastisdevelopment.mykitaapp.repository.KitaRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class KitaService {

    Logger logger = LoggerFactory.getLogger(KitaService.class);
    private final KitaRepository repository;
    private final AppUserService userService;

    public KitaService(KitaRepository repository, AppUserService userService) {
        this.repository = repository;
        this.userService = userService;
    }

    private AppUser getActualUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        logger.info(String.format("Get actual User %s", currentPrincipalName));
        return this.userService.getUserByEmail(currentPrincipalName);
    }

    public KitaDTO getKitaByAdmin() throws ClassNotFoundException {
        AppUser user = getActualUser();
        Optional<KitaDBItem> optionalKitaDBItem = repository.findByAdminId(user.getId());
        if (optionalKitaDBItem.isEmpty()) {
            throw new ClassNotFoundException(String.format("For Admin %s no Kita was found", user.getEmail()));
        }
        logger.info(String.format("Get Kita %s with Admin %s", optionalKitaDBItem.get().getName(), user.getEmail()));
        return  new KitaDTO(optionalKitaDBItem.get());
    }

    public KitaDTO addKita(KitaDTO kita) {
        KitaDBItem kitaDBItem = new KitaDBItem(kita);
        kitaDBItem.setAdminId(getActualUser().getId());
        if (repository.findByName(kita.getName()).isPresent()) {
            throw new IllegalStateException(String.format("Kita %s already exist", kita.getName()));
        }
        if (repository.findByAdminId(kitaDBItem.getAdminId()).isPresent()) {
            throw new IllegalStateException(String.format("User %s already is Kita Admin", getActualUser().getEmail()));
        }
        kitaDBItem = repository.save(kitaDBItem);
        logger.info("Kita %s added", kitaDBItem.getName());
        return new KitaDTO(kitaDBItem);
    }
}
