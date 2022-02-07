package de.bastisdevelopment.mykitaapp.items;

import de.bastisdevelopment.mykitaapp.dtos.KitaUserConnectorDTO;
import de.bastisdevelopment.mykitaapp.utils.ConnectionStatus;
import de.bastisdevelopment.mykitaapp.utils.KitaUserRole;
import org.junit.jupiter.api.Test;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertSame;

class KitaUserConnectorDBItemTest {

    private static final KitaUserConnectorDTO dto = new KitaUserConnectorDTO("12345", "56789", KitaUserRole.USER);

    @Test
    void getKitaId() {
        KitaUserConnectorDBItem dbItem = new KitaUserConnectorDBItem(dto);
        assertSame(dbItem.getKitaId(), dto.getKitaId());
    }

    @Test
    void getUserId() {
        KitaUserConnectorDBItem dbItem = new KitaUserConnectorDBItem(dto);
        assertSame(dbItem.getUserId(), dto.getUserId());
    }

    @Test
    void getUserStatus() {
        KitaUserConnectorDBItem dbItem = new KitaUserConnectorDBItem(dto);
        assertSame(dbItem.getUserStatus(), ConnectionStatus.OPEN);
    }

    @Test
    void getKitaStatus() {
        KitaUserConnectorDBItem dbItem = new KitaUserConnectorDBItem(dto);
        assertSame(dbItem.getKitaStatus(), ConnectionStatus.CONFIRMED);
    }

    @Test
    void getUserRole() {
        KitaUserConnectorDBItem dbItem = new KitaUserConnectorDBItem(dto);
        assertSame(dbItem.getUserRole(), dto.getUserRole());
    }
}