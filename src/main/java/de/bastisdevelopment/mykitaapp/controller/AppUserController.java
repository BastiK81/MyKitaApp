package de.bastisdevelopment.mykitaapp.controller;

import de.bastisdevelopment.mykitaapp.dtos.AppUserDTO;
import de.bastisdevelopment.mykitaapp.service.AppUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class AppUserController {

    private final AppUserService service;

    private static final Logger logger = LoggerFactory.getLogger(KitaController.class);

    public AppUserController(AppUserService service) {
        this.service = service;
    }

    @GetMapping(path = "/getuserinformation")
    public AppUserDTO getUserInformation() {
        logger.info("Try to get User Information");
        return service.getInformationOfActiveUser();
    }

}
