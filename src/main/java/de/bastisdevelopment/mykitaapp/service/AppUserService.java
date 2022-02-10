package de.bastisdevelopment.mykitaapp.service;

import de.bastisdevelopment.mykitaapp.dtos.AppUserDTO;
import de.bastisdevelopment.mykitaapp.items.AppUserDBItem;
import de.bastisdevelopment.mykitaapp.repository.AppUserRepository;
import de.bastisdevelopment.mykitaapp.utils.UserVisibility;
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

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AppUserService {

    private static final Logger logger = LoggerFactory.getLogger(AppUserService.class);

    private final AppUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JWTUtils jwtUtils;

    public AppUserService(AppUserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JWTUtils jwtUtils) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
    }

    public String signIn(AppUserDBItem user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            logger.warn(String.format("User with email: %s already exist", user.getEmail()));
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "user already exist");
        }
        user.setPassword(this.passwordEncoder.encode(user.getPassword()));
        user.initialiseVisibility();
        user.initialiseUserRole();
        userRepository.save(user);
        logger.info(String.format("User: %s created", user.getEmail()));
        return jwtUtils.createToken(new HashMap<>(), user.getEmail());
    }

    public String logIn(AppUserDBItem user) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
            logger.info("User logged in");
            return jwtUtils.createToken(new HashMap<>(), user.getEmail());
        } catch (AuthenticationException e) {
            logger.warn(String.format("Invalid credentials user: %s", user.getEmail()));
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "invalid credentials");
        }
    }

    public AppUserDBItem getUserByEmail(String userEmail) {
        return userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("User " + userEmail + " not found!"));
    }

    public AppUserDTO getInformationOfActiveUser() {
        return new AppUserDTO(getActualUser());
    }

    public AppUserDBItem getActualUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        logger.info(String.format("Get actual User %s", currentPrincipalName));
        return userRepository.findByEmail(currentPrincipalName)
                .orElseThrow(() -> new UsernameNotFoundException("User " + currentPrincipalName + " not found!"));
    }

    public List<AppUserDTO> getAllUser(Collection<UserVisibility> allowedVisibility) {
        return userRepository.findAll().stream().
                filter(appUserDBItem -> allowedVisibility.contains(appUserDBItem.getVisibility())).toList()
                .stream().map(AppUserDTO::new).toList();

    }

    public UserVisibility getUSerVisibility() {
        return this.getActualUser().getVisibility();
    }

    public void setUserVisibility(UserVisibility visibility) {
        AppUserDBItem userDBItem = getActualUser();
        userDBItem.setVisibility(visibility);
        userRepository.save(userDBItem);
    }
}
