package de.bastisdevelopment.mykitaapp.service;

import de.bastisdevelopment.mykitaapp.items.AppUserDBItem;
import de.bastisdevelopment.mykitaapp.model.TestDataProvider;
import de.bastisdevelopment.mykitaapp.repository.AppUserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.server.ResponseStatusException;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class AppUserServiceTest {

    private final AuthenticationManager authManager = mock(AuthenticationManager.class);
    private final JWTUtils jwtService = mock(JWTUtils.class);
    private final AppUserRepository repository = mock(AppUserRepository.class);
    private final PasswordEncoder password = mock(PasswordEncoder.class);
    private final AppUserService serviceUnderTest = new AppUserService(repository, password, authManager, jwtService);


    @Test
    void logInError() {
        AppUserDBItem user = TestDataProvider.testUserDBItem("user", "Password");
        when(authManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenThrow(mock(AuthenticationException.class));
        assertThrows(ResponseStatusException.class, () -> serviceUnderTest.logIn(user));
    }

    @Test
    void getUserByEmail() {
    }

    @Test
    void getInformationOfActiveUser() {

    }

    @Test
    void getActualUser() {
    }

    @Test
    void getAllUser() {
    }

    @Test
    void getUSerVisibility() {
    }

    @Test
    void setUserVisibility() {
    }

    @Test
    void getUserFromIdList() {
    }
}