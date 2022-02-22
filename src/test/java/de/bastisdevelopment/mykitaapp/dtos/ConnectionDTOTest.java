package de.bastisdevelopment.mykitaapp.dtos;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertSame;

import de.bastisdevelopment.mykitaapp.items.ConnectionDBItem;
import de.bastisdevelopment.mykitaapp.utils.ConnectionStatus;
import de.bastisdevelopment.mykitaapp.utils.UserRole;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

import org.junit.jupiter.api.Test;

class ConnectionDTOTest {
    @Test
    void testConstructor() {
        ConnectionDTO actualConnectionDTO = new ConnectionDTO();
        assertNull(actualConnectionDTO.getExpireDate());
        assertEquals("ConnectionDTO(id=null, userId=null, kitaId=null, userStatus=null, kitaStatus=null, userRole=null,"
                + " implementationDate=null, expireDate=null)", actualConnectionDTO.toString());
        assertNull(actualConnectionDTO.getUserStatus());
        assertNull(actualConnectionDTO.getUserRole());
        assertNull(actualConnectionDTO.getUserId());
        assertNull(actualConnectionDTO.getKitaStatus());
        assertNull(actualConnectionDTO.getKitaId());
        assertNull(actualConnectionDTO.getImplementationDate());
        assertNull(actualConnectionDTO.getId());
    }

    @Test
    void testConstructor2() {
        ConnectionDTO actualConnectionDTO = new ConnectionDTO("42", "42", UserRole.ADMIN);

        assertNull(actualConnectionDTO.getUserStatus());
        assertEquals(UserRole.ADMIN, actualConnectionDTO.getUserRole());
        assertEquals("42", actualConnectionDTO.getUserId());
        assertNull(actualConnectionDTO.getKitaStatus());
        assertEquals("42", actualConnectionDTO.getKitaId());
        assertNull(actualConnectionDTO.getImplementationDate());
        assertNull(actualConnectionDTO.getId());
    }

    @Test
    void testConstructor3() {
        ConnectionDBItem connectionDBItem = new ConnectionDBItem();
        LocalDateTime atStartOfDayResult = LocalDate.of(1970, 1, 1).atStartOfDay();
        Date fromResult = Date.from(atStartOfDayResult.atZone(ZoneId.of("UTC")).toInstant());
        connectionDBItem.setExpireDate(fromResult);
        connectionDBItem.setId("42");
        LocalDateTime atStartOfDayResult1 = LocalDate.of(1970, 1, 1).atStartOfDay();
        Date fromResult1 = Date.from(atStartOfDayResult1.atZone(ZoneId.of("UTC")).toInstant());
        connectionDBItem.setImplementationDate(fromResult1);
        connectionDBItem.setKitaId("42");
        connectionDBItem.setKitaStatus(ConnectionStatus.CONFIRMED);
        connectionDBItem.setUserId("42");
        connectionDBItem.setUserRole(UserRole.ADMIN);
        connectionDBItem.setUserStatus(ConnectionStatus.CONFIRMED);
        ConnectionDTO actualConnectionDTO = new ConnectionDTO(connectionDBItem);
        assertSame(fromResult, actualConnectionDTO.getExpireDate());
        assertEquals(ConnectionStatus.CONFIRMED, actualConnectionDTO.getUserStatus());
        assertEquals(UserRole.ADMIN, actualConnectionDTO.getUserRole());
        assertEquals("42", actualConnectionDTO.getUserId());
        assertEquals(ConnectionStatus.CONFIRMED, actualConnectionDTO.getKitaStatus());
        assertEquals("42", actualConnectionDTO.getKitaId());
        assertSame(fromResult1, actualConnectionDTO.getImplementationDate());
        assertEquals("42", actualConnectionDTO.getId());
    }
}

