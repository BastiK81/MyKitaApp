package de.bastisdevelopment.mykitaapp.items;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import de.bastisdevelopment.mykitaapp.utils.UserRole;

import java.util.List;

import org.junit.jupiter.api.Test;

class AppUserDBItemTest {
    @Test
    void testInitialiseUserRole() {
        AppUserDBItem appUserDBItem = new AppUserDBItem();
        appUserDBItem.initialiseUserRole();
        assertEquals("AppUserDBItem(id=null, email=null, password=null, lastName=null, firstName=null, visibility=null,"
                + " userRoles=[NONE])", appUserDBItem.toString());
        List<UserRole> userRoles = appUserDBItem.getUserRoles();
        assertEquals(1, userRoles.size());
        assertEquals(UserRole.NONE, userRoles.get(0));
    }

    @Test
    void testConstructor() {
        AppUserDBItem actualAppUserDBItem = new AppUserDBItem();
        assertNull(actualAppUserDBItem.getAuthorities());
        assertNull(actualAppUserDBItem.getUsername());
        assertTrue(actualAppUserDBItem.isAccountNonExpired());
        assertTrue(actualAppUserDBItem.isAccountNonLocked());
        assertTrue(actualAppUserDBItem.isCredentialsNonExpired());
        assertTrue(actualAppUserDBItem.isEnabled());
    }
}

