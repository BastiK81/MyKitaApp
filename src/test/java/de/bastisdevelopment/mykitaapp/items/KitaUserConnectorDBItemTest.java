package de.bastisdevelopment.mykitaapp.items;

import de.bastisdevelopment.mykitaapp.dtos.ConnectionDTO;
import de.bastisdevelopment.mykitaapp.utils.ConnectionStatus;
import de.bastisdevelopment.mykitaapp.utils.UserRole;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertSame;

class KitaUserConnectorDBItemTest {

    private static final ConnectionDTO dto = new ConnectionDTO("12345", "56789", UserRole.USER);

    @Test
    void getKitaId() {
        ConnectionDBItem dbItem = new ConnectionDBItem(dto);
        assertSame(dbItem.getKitaId(), dto.getKitaId());
    }

    @Test
    void getUserId() {
        ConnectionDBItem dbItem = new ConnectionDBItem(dto);
        assertSame(dbItem.getUserId(), dto.getUserId());
    }

    @Test
    void getUserStatus() {
        ConnectionDBItem dbItem = new ConnectionDBItem(dto);
        assertSame(dbItem.getUserStatus(), ConnectionStatus.OPEN);
    }

    @Test
    void getKitaStatus() {
        ConnectionDBItem dbItem = new ConnectionDBItem(dto);
        assertSame(dbItem.getKitaStatus(), ConnectionStatus.CONFIRMED);
    }

    @Test
    void getUserRole() {
        ConnectionDBItem dbItem = new ConnectionDBItem(dto);
        assertSame(dbItem.getUserRole(), dto.getUserRole());
    }
}