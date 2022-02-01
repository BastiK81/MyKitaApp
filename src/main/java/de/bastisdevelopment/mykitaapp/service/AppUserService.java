package de.bastisdevelopment.mykitaapp.service;

import de.bastisdevelopment.mykitaapp.dtos.AppUserDTO;
import de.bastisdevelopment.mykitaapp.items.AppUser;
import de.bastisdevelopment.mykitaapp.repository.AppUserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;

@Service
public class AppUserService {

    private static final Logger logger = LoggerFactory.getLogger(AppUserService.class);

    private final AppUserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JWTUtils jwtUtils;

    public AppUserService(AppUserRepository repository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JWTUtils jwtUtils) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
    }

    public String signIn(AppUser user) {
        if (repository.findByEmail(user.getEmail()).isPresent()) {
            logger.warn(String.format("User with email: %s already exist", user.getEmail()));
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "user already exist");
        }
        user.setPassword(this.passwordEncoder.encode(user.getPassword()));
        repository.save(user);
        logger.info(String.format("User: %s created", user.getEmail()));
        return jwtUtils.createToken(new HashMap<>(), user.getEmail());
    }

    public String logIn(AppUser user) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
            logger.info("User logged in");
            return jwtUtils.createToken(new HashMap<>(), user.getEmail());
        } catch (AuthenticationException e) {
            logger.warn(String.format("Invalid credentials user: %s", user.getEmail()));
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "invalid credentials");
        }
    }

    public AppUser getUserByEmail(String userEmail) {
        return repository.findByEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("User " + userEmail + " not found!"));
    }

    public AppUserDTO getInformationOfActiveUser() {
        return new AppUserDTO(getActualUser());
    }

    public AppUser getActualUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        logger.info(String.format("Get actual User %s", currentPrincipalName));
        return repository.findByEmail(currentPrincipalName).get();
    }

}