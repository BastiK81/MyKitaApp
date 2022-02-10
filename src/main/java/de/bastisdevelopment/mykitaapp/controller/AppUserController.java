package de.bastisdevelopment.mykitaapp.controller;

import de.bastisdevelopment.mykitaapp.dtos.AppUserDTO;
import de.bastisdevelopment.mykitaapp.service.AppUserService;
import de.bastisdevelopment.mykitaapp.utils.UserVisibility;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

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

    @GetMapping(path = "/getUserVisibility")
    public UserVisibility getUserVisibility() {
        logger.info("Get Visibility");
        return service.getUSerVisibility();
    }

    @PostMapping(path = "/setUserVisibility")
    public void setUserVisibility(@RequestBody UserVisibility visibility){
        service.setUserVisibility(visibility);
    }

}
