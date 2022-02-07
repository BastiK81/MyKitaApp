package de.bastisdevelopment.mykitaapp.dtos;

import de.bastisdevelopment.mykitaapp.items.KitaUserConnectorDBItem;
import de.bastisdevelopment.mykitaapp.utils.ConnectionStatus;
import de.bastisdevelopment.mykitaapp.utils.KitaUserRole;
import lombok.Data;

import java.util.Date;

@Data
public class KitaUserConnectorDTO {

    private String id;
    private String userId;
    private String kitaId;
    private ConnectionStatus userStatus;
    private ConnectionStatus kitaStatus;
    private KitaUserRole userRole;
    private Date implementationDate;
    private Date expireDate;

    public KitaUserConnectorDTO(KitaUserConnectorDBItem dbItem) {
        this.id = dbItem.getId();
        this.userId = dbItem.getUserId();
        this.kitaId = dbItem.getKitaId();
        this.userStatus = dbItem.getUserStatus();
        this.kitaStatus = dbItem.getKitaStatus();
        this.userRole = dbItem.getUserRole();
        this.implementationDate = dbItem.getImplementationDate();
        this.expireDate = dbItem.getExpireDate();
    }

    public KitaUserConnectorDTO(String userId, String kitaId, KitaUserRole userRole) {
        super();
        this.userId = userId;
        this.kitaId = kitaId;
        this.userRole = userRole;
        this.expireDate = new Date();
    }

}
