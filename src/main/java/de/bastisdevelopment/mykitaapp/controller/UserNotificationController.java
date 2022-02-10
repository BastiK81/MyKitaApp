package de.bastisdevelopment.mykitaapp.controller;


import de.bastisdevelopment.mykitaapp.dtos.UserNotificationDTO;
import de.bastisdevelopment.mykitaapp.service.UserNotificationService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/userNotification")
public class UserNotificationController {

    private final UserNotificationService notificationService;

    public UserNotificationController(UserNotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping
    public List<UserNotificationDTO> getAll() {
        return notificationService.getAll();
    }

}
