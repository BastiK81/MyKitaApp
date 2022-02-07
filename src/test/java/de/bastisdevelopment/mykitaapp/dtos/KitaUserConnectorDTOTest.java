package de.bastisdevelopment.mykitaapp.dtos;

import de.bastisdevelopment.mykitaapp.items.KitaUserConnectorDBItem;
import de.bastisdevelopment.mykitaapp.utils.ConnectionStatus;
import de.bastisdevelopment.mykitaapp.utils.KitaUserRole;
import org.junit.jupiter.api.Test;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertSame;

class KitaUserConnectorDTOTest {

    private static final KitaUserConnectorDBItem dbItem = new KitaUserConnectorDBItem("12345", "23654", "97987564", ConnectionStatus.CONFIRMED, ConnectionStatus.REJECTED, KitaUserRole.USER, new Date(), new Date());

    @Test
    void getId() {
        KitaUserConnectorDTO dto = new KitaUserConnectorDTO(dbItem);
        assertSame(dto.getId(), dbItem.getId());
    }

    @Test
    void getUserId() {
        KitaUserConnectorDTO dto = new KitaUserConnectorDTO(dbItem);
        assertSame(dto.getUserId(), dbItem.getUserId());
    }

    @Test
    void getKitaId() {
        KitaUserConnectorDTO dto = new KitaUserConnectorDTO(dbItem);
        assertSame(dto.getKitaId(), dbItem.getKitaId());
    }

    @Test
    void getUserStatus() {
        KitaUserConnectorDTO dto = new KitaUserConnectorDTO(dbItem);
        assertSame(dto.getUserStatus(), dbItem.getUserStatus());
    }

    @Test
    void getKitaStatus() {
        KitaUserConnectorDTO dto = new KitaUserConnectorDTO(dbItem);
        assertSame(dto.getKitaStatus(), dbItem.getKitaStatus());
    }

    @Test
    void getUserRole() {
        KitaUserConnectorDTO dto = new KitaUserConnectorDTO(dbItem);
        assertSame(dto.getUserRole(), dbItem.getUserRole());
    }

    @Test
    void getImplementationDate() {
        KitaUserConnectorDTO dto = new KitaUserConnectorDTO(dbItem);
        assertSame(dto.getImplementationDate(), dbItem.getImplementationDate());
    }

    @Test
    void getExpireDate() {
        KitaUserConnectorDTO dto = new KitaUserConnectorDTO(dbItem);
        assertSame(dto.getExpireDate(), dbItem.getExpireDate());
    }
}