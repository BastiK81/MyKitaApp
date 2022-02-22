package de.bastisdevelopment.mykitaapp.service;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.HashMap;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ContextConfiguration(classes = {JWTUtils.class, String.class})
@ExtendWith(SpringExtension.class)
class JWTUtilsTest {
    @Autowired
    private JWTUtils jWTUtils;

    @Test
    void testCreateToken() {
        HashMap<String, Object> stringObjectMap = new HashMap<>();
        this.jWTUtils.createToken(stringObjectMap, "Hello from the Dreaming Spires");
        assertEquals(3, stringObjectMap.size());
    }
}

