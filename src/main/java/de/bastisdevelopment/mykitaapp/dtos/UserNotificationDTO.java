package de.bastisdevelopment.mykitaapp.dtos;

import de.bastisdevelopment.mykitaapp.items.ConnectionDBItem;
import lombok.Data;

import java.util.Date;

@Data
public class UserNotificationDTO {

    private String id;
    private String title;
    private String description;
    private String type;
    private Date createdAt;
    private boolean isUnRead;

    public UserNotificationDTO() {
    }

    public UserNotificationDTO(ConnectionDBItem dbItem) {
        this.title = "Open Connection";
        this.description = "Open Kita User Connection wait for response";
        this.type = "UserKitaConnection";
        this.createdAt = dbItem.getImplementationDate();
        this.isUnRead = true;
    }
}
