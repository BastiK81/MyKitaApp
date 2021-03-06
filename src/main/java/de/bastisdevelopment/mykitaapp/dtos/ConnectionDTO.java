package de.bastisdevelopment.mykitaapp.dtos;

import de.bastisdevelopment.mykitaapp.items.ConnectionDBItem;
import de.bastisdevelopment.mykitaapp.utils.ConnectionStatus;
import de.bastisdevelopment.mykitaapp.utils.UserRole;
import lombok.Data;

import java.util.Date;

@Data
public class ConnectionDTO {

    private String id;
    private String userId;
    private String kitaId;
    private ConnectionStatus userStatus;
    private ConnectionStatus kitaStatus;
    private UserRole userRole;
    private Date implementationDate;
    private Date expireDate;

    public ConnectionDTO() {
    }

    public ConnectionDTO(ConnectionDBItem dbItem) {
        this.id = dbItem.getId();
        this.userId = dbItem.getUserId();
        this.kitaId = dbItem.getKitaId();
        this.userStatus = dbItem.getUserStatus();
        this.kitaStatus = dbItem.getKitaStatus();
        this.userRole = dbItem.getUserRole();
        this.implementationDate = dbItem.getImplementationDate();
        this.expireDate = dbItem.getExpireDate();
    }

    public ConnectionDTO(String userId, String kitaId, UserRole userRole) {
        this.userId = userId;
        this.kitaId = kitaId;
        this.userRole = userRole;
        this.expireDate = new Date();
    }

}
