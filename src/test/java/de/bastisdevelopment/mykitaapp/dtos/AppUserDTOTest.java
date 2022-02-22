package de.bastisdevelopment.mykitaapp.dtos;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

import de.bastisdevelopment.mykitaapp.items.AppUserDBItem;
import de.bastisdevelopment.mykitaapp.utils.UserVisibility;

import java.util.ArrayList;

import org.junit.jupiter.api.Test;

class AppUserDTOTest {
    @Test
    void testConstructor() {
        AppUserDTO actualAppUserDTO = new AppUserDTO();
        assertNull(actualAppUserDTO.getEmail());
        assertEquals("AppUserDTO(id=null, email=null, lastName=null, firstName=null)", actualAppUserDTO.toString());
        assertNull(actualAppUserDTO.getLastName());
        assertNull(actualAppUserDTO.getId());
        assertNull(actualAppUserDTO.getFirstName());
    }

    @Test
    void testConstructor2() {
        AppUserDTO actualAppUserDTO = new AppUserDTO("42", "jane.doe@example.org", "Doe", "Jane");

        assertEquals("jane.doe@example.org", actualAppUserDTO.getEmail());
        assertEquals("AppUserDTO(id=42, email=jane.doe@example.org, lastName=Doe, firstName=Jane)",
                actualAppUserDTO.toString());
        assertEquals("Doe", actualAppUserDTO.getLastName());
        assertEquals("42", actualAppUserDTO.getId());
        assertEquals("Jane", actualAppUserDTO.getFirstName());
    }

    @Test
    void testConstructor3() {
        AppUserDBItem appUserDBItem = new AppUserDBItem();
        appUserDBItem.setEmail("jane.doe@example.org");
        appUserDBItem.setFirstName("Jane");
        appUserDBItem.setId("42");
        appUserDBItem.setLastName("Doe");
        appUserDBItem.setPassword("iloveyou");
        appUserDBItem.setUserRoles(new ArrayList<>());
        appUserDBItem.setVisibility(UserVisibility.INVISIBLE);
        AppUserDTO actualAppUserDTO = new AppUserDTO(appUserDBItem);
        assertEquals("jane.doe@example.org", actualAppUserDTO.getEmail());
        assertEquals("Doe", actualAppUserDTO.getLastName());
        assertEquals("42", actualAppUserDTO.getId());
        assertEquals("Jane", actualAppUserDTO.getFirstName());
    }
}

