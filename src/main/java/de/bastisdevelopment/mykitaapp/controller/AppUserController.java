package de.bastisdevelopment.mykitaapp.controller;

import de.bastisdevelopment.mykitaapp.dtos.AppUserDTO;
import de.bastisdevelopment.mykitaapp.service.AppUserService;
import de.bastisdevelopment.mykitaapp.utils.UserVisibility;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping("/api/user")
public class AppUserController {

    private final AppUserService service;

    public AppUserController(AppUserService service) {
        this.service = service;
    }

    @GetMapping(path = "/getuserinformation")
    public AppUserDTO getUserInformation() {
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
        return service.getUSerVisibility();
    }

    @PostMapping(path = "/setUserVisibility")
    public void setUserVisibility(@RequestBody UserVisibility visibility) {
        service.setUserVisibility(visibility);
    }

}
