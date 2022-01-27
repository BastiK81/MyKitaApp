package de.bastisdevelopment.mykitaapp.service;

import de.bastisdevelopment.mykitaapp.items.AppUser;
import de.bastisdevelopment.mykitaapp.repository.AppUserRepository;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    private final AppUserRepository repository;

    public LoginService(AppUserRepository repository) {
        this.repository = repository;
    }


    public String signIn(AppUser user) {
        return "Token";
    }
}
