package de.bastisdevelopment.mykitaapp.controller;

import de.bastisdevelopment.mykitaapp.dtos.AppUserDTO;
import de.bastisdevelopment.mykitaapp.service.AppUserService;
import de.bastisdevelopment.mykitaapp.utils.UserVisibility;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping("/api/user")
public class AppUserController {

    private static final Logger logger = LoggerFactory.getLogger(AppUserController.class);
    private final AppUserService service;

    public AppUserController(AppUserService service) {
        this.service = service;
    }

    @GetMapping(path = "/getuserinformation")
    public AppUserDTO getUserInformation() {
        logger.info("Try to get User Information");
        return service.getInformationOfActiveUser();
    }

    @GetMapping(path = "/getalluser/{visibility}")
    public List<AppUserDTO> getAllUser(@PathVariable String visibility) {
        Collection<UserVisibility> allowedVisibility = new ArrayList<>();
        allowedVisibility.add(UserVisibility.valueOf("VISIBLE"));
        allowedVisibility.add(UserVisibility.valueOf(visibility));
        return service.getAllUser(allowedVisibility);
    }

}
