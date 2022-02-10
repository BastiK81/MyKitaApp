package de.bastisdevelopment.mykitaapp.items;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document("userNotification")
public class UserNotificationDBItem {

    @Id
    private String id;
    private String title;
    private String description;
    private String type;
    private String createdAt;
    private boolean isUnRead;

}
