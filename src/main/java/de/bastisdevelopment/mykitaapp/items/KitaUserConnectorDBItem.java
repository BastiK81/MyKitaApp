package de.bastisdevelopment.mykitaapp.items;

import de.bastisdevelopment.mykitaapp.dtos.KitaUserConnectorDTO;
import de.bastisdevelopment.mykitaapp.utils.ConnectionStatus;
import de.bastisdevelopment.mykitaapp.utils.KitaUserRole;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Document("kitaUserConnection")
public class KitaUserConnectorDBItem {

    @Id
    private String id;
    @Indexed
    private String userId;
    @Indexed
    private String kitaId;
    private ConnectionStatus userStatus;
    private ConnectionStatus kitaStatus;
    private KitaUserRole userRole;
    private Date implementationDate;
    private Date expireDate;

    public KitaUserConnectorDBItem(String id, String userId, String kitaId, ConnectionStatus userStatus, ConnectionStatus kitaStatus, KitaUserRole userRole, Date implementationDate, Date expireDate) {
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