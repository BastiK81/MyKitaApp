package de.bastisdevelopment.mykitaapp.controller;

import de.bastisdevelopment.mykitaapp.items.AppUser;
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

    Logger logger = LoggerFactory.getLogger(LoginController.class);

    private final AppUserService loginService;

    public LoginController(AppUserService loginService) {
        this.loginService = loginService;
    }

    @PostMapping(path = "/signin")
    public String signInNewUser(@RequestBody AppUser user) {
        logger.info("Sign in new user: " + user.getEmail());
        return loginService.signIn(user);
    }

    @PostMapping(path = "/login")
    public String loginUser(@RequestBody AppUser user) {
        logger.info("Try to Login user: " + user.getEmail());
        return loginService.logIn(user);
    }

}
