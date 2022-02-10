package de.bastisdevelopment.mykitaapp.service;

import de.bastisdevelopment.mykitaapp.dtos.UserNotificationDTO;
import de.bastisdevelopment.mykitaapp.items.AppUserDBItem;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserNotificationService {

    private final AppUserService userService;
    private final KitaUserConnectorService connectorService;

    public UserNotificationService(AppUserService userService, KitaUserConnectorService connectorService) {
        this.userService = userService;
        this.connectorService = connectorService;
    }

    public List<UserNotificationDTO> getAll() {
        AppUserDBItem userDBItem = userService.getActualUser();
        return connectorService.getAllOpenUserConnections(userDBItem.getId());
    }
}
