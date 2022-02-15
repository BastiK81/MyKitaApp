package de.bastisdevelopment.mykitaapp.dtos;

import de.bastisdevelopment.mykitaapp.items.ConnectionDBItem;
import de.bastisdevelopment.mykitaapp.utils.ConnectionStatus;
import de.bastisdevelopment.mykitaapp.utils.UserRole;
import org.junit.jupiter.api.Test;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertSame;

class KitaUserConnectorDTOTest {

    private static final ConnectionDBItem dbItem = new ConnectionDBItem("12345", "23654", "97987564", ConnectionStatus.CONFIRMED, ConnectionStatus.REJECTED, UserRole.USER, new Date(), new Date());

    @Test
    void getId() {
        ConnectionDTO dto = new ConnectionDTO(dbItem);
        assertSame(dto.getId(), dbItem.getId());
    }

    @Test
    void getUserId() {
        ConnectionDTO dto = new ConnectionDTO(dbItem);
        assertSame(dto.getUserId(), dbItem.getUserId());
    }

    @Test
    void getKitaId() {
        ConnectionDTO dto = new ConnectionDTO(dbItem);
        assertSame(dto.getKitaId(), dbItem.getKitaId());
    }

    @Test
    void getUserStatus() {
        ConnectionDTO dto = new ConnectionDTO(dbItem);
        assertSame(dto.getUserStatus(), dbItem.getUserStatus());
    }

    @Test
    void getKitaStatus() {
        ConnectionDTO dto = new ConnectionDTO(dbItem);
        assertSame(dto.getKitaStatus(), dbItem.getKitaStatus());
    }

    @Test
    void getUserRole() {
        ConnectionDTO dto = new ConnectionDTO(dbItem);
        assertSame(dto.getUserRole(), dbItem.getUserRole());
    }

    @Test
    void getImplementationDate() {
        ConnectionDTO dto = new ConnectionDTO(dbItem);
        assertSame(dto.getImplementationDate(), dbItem.getImplementationDate());
    }

    @Test
    void getExpireDate() {
        ConnectionDTO dto = new ConnectionDTO(dbItem);
        assertSame(dto.getExpireDate(), dbItem.getExpireDate());
    }
}