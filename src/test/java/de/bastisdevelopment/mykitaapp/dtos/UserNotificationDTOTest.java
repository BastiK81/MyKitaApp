package de.bastisdevelopment.mykitaapp.dtos;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertTrue;

import de.bastisdevelopment.mykitaapp.items.ConnectionDBItem;
import de.bastisdevelopment.mykitaapp.utils.ConnectionStatus;
import de.bastisdevelopment.mykitaapp.utils.UserRole;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

import org.junit.jupiter.api.Test;

class UserNotificationDTOTest {
    @Test
    void testConstructor() {
        UserNotificationDTO actualUserNotificationDTO = new UserNotificationDTO();
        assertNull(actualUserNotificationDTO.getCreatedAt());
        assertEquals(
                "UserNotificationDTO(id=null, title=null, description=null, type=null, createdAt=null," + " isUnRead=false)",
                actualUserNotificationDTO.toString());
        assertFalse(actualUserNotificationDTO.isUnRead());
        assertNull(actualUserNotificationDTO.getType());
        assertNull(actualUserNotificationDTO.getTitle());
        assertNull(actualUserNotificationDTO.getId());
        assertNull(actualUserNotificationDTO.getDescription());
    }

    @Test
    void testConstructor2() {
        ConnectionDBItem connectionDBItem = new ConnectionDBItem();
        LocalDateTime atStartOfDayResult = LocalDate.of(1970, 1, 1).atStartOfDay();
        connectionDBItem.setExpireDate(Date.from(atStartOfDayResult.atZone(ZoneId.of("UTC")).toInstant()));
        connectionDBItem.setId("42");
        LocalDateTime atStartOfDayResult1 = LocalDate.of(1970, 1, 1).atStartOfDay();
        Date fromResult = Date.from(atStartOfDayResult1.atZone(ZoneId.of("UTC")).toInstant());
        connectionDBItem.setImplementationDate(fromResult);
        connectionDBItem.setKitaId("42");
        connectionDBItem.setKitaStatus(ConnectionStatus.CONFIRMED);
        connectionDBItem.setUserId("42");
        connectionDBItem.setUserRole(UserRole.ADMIN);
        connectionDBItem.setUserStatus(ConnectionStatus.CONFIRMED);
        UserNotificationDTO actualUserNotificationDTO = new UserNotificationDTO(connectionDBItem);
        assertSame(fromResult, actualUserNotificationDTO.getCreatedAt());
        assertTrue(actualUserNotificationDTO.isUnRead());
        assertEquals("UserKitaConnection", actualUserNotificationDTO.getType());
        assertEquals("Open Connection", actualUserNotificationDTO.getTitle());
        assertEquals("Open Kita User Connection wait for response", actualUserNotificationDTO.getDescription());
    }
}

