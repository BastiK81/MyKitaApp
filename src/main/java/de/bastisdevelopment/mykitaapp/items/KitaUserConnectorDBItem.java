package de.bastisdevelopment.mykitaapp.items;

import de.bastisdevelopment.mykitaapp.dtos.KitaUserConnectorDTO;
import de.bastisdevelopment.mykitaapp.utils.ConnectionStatus;
import de.bastisdevelopment.mykitaapp.utils.UserRole;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Document("kitaUserConnection")
public class KitaUserConnectorDBItem {

    @Id
    private String id;
    private String userId;
    private String kitaId;
    private ConnectionStatus userStatus;
    private ConnectionStatus kitaStatus;
    private UserRole userRole;
    private Date implementationDate;
    private Date expireDate;

    public KitaUserConnectorDBItem() {

    }

    public KitaUserConnectorDBItem(String id, String userId, String kitaId, ConnectionStatus userStatus, ConnectionStatus kitaStatus, UserRole userRole, Date implementationDate, Date expireDate) {
        super();
        this.id = id;
        this.userId = userId;
        this.kitaId = kitaId;
        this.userStatus = userStatus;
        this.kitaStatus = kitaStatus;
        this.userRole = userRole;
        this.implementationDate = implementationDate;
        this.expireDate = expireDate;
    }

    public KitaUserConnectorDBItem(KitaUserConnectorDTO dto) {
        super();
        this.userId = dto.getUserId();
        this.kitaId = dto.getKitaId();
        this.userRole = dto.getUserRole();
        this.userStatus = ConnectionStatus.OPEN;
        this.kitaStatus = ConnectionStatus.CONFIRMED;
        this.implementationDate = new Date();
        this.expireDate = dto.getExpireDate();
    }

}
