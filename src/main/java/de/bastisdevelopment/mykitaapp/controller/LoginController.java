package de.bastisdevelopment.mykitaapp.controller;

import de.bastisdevelopment.mykitaapp.items.AppUserDBItem;
import de.bastisdevelopment.mykitaapp.service.AppUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class LoginController {

    private static final Logger logger = LoggerFactory.getLogger(LoginController.class);

    private final AppUserService service;

    public LoginController(AppUserService service) {
        this.service = service;
    }

    @PostMapping(path = "/signin")
    public String signInNewUser(@RequestBody AppUserDBItem user) {
        logger.info("Sign in new user: " + user.getEmail());
        return service.signIn(user);
    }

    @PostMapping(path = "/login")
    public String loginUser(@RequestBody AppUserDBItem user) {
        logger.info("Try to Login user: " + user.getEmail());
        return service.logIn(user);
    }
}
