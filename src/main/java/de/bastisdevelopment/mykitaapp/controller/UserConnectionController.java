package de.bastisdevelopment.mykitaapp.controller;

import de.bastisdevelopment.mykitaapp.dtos.AppUserDTO;
import de.bastisdevelopment.mykitaapp.dtos.ConnectionDTO;
import de.bastisdevelopment.mykitaapp.dtos.KitaDTO;
import de.bastisdevelopment.mykitaapp.service.ConnectionService;
import de.bastisdevelopment.mykitaapp.utils.UserRole;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/userConnection")
public class UserConnectionController {

    private static final Logger logger = LoggerFactory.getLogger(UserConnectionController.class);
    private final ConnectionService connectorService;

    public UserConnectionController(ConnectionService connectorService) {
        this.connectorService = connectorService;
    }

    @PostMapping(path = "addKitaSide")
    public void addNewKitaSide(@RequestBody ConnectionDTO dto) throws Exception {
        logger.info("Add Kita User Connection");
        connectorService.addNewKitaSide(dto);
    }

    @PostMapping(path = "addUserSide")
    public void addNewUserSide(@RequestBody ConnectionDTO dto) throws Exception {
        logger.info("Add Kita User Connection");
        connectorService.addNewUserSide(dto);
    }

    @GetMapping(path = "getAllAccepted/{playSchoolId}")
    public List<ConnectionDTO> getAllAccepted(@PathVariable String playSchoolId) {
        return connectorService.getAllAccepted(playSchoolId);
    }

    @GetMapping(path = "getAllInProgress/{playSchoolId}")
    public List<ConnectionDTO> getAllInProgress(@PathVariable String playSchoolId) {
        return connectorService.getAllInProgress(playSchoolId);
    }

    @GetMapping(path = "getAllPending/{playSchoolId}")
    public List<ConnectionDTO> getAllPending(@PathVariable String playSchoolId) {
        return connectorService.getAllPending(playSchoolId);
    }

    @GetMapping(path = "getAllAcceptedUser")
    public List<ConnectionDTO> getAllAcceptedUser() {
        return connectorService.getAllAcceptedUser();
    }

    @GetMapping(path = "getAllInProgressUser")
    public List<ConnectionDTO> getAllInProgressUser() {
        return connectorService.getAllInProgressUser();
    }

    @GetMapping(path = "getAllPendingUser")
    public List<ConnectionDTO> getAllPendingUser() {
        return connectorService.getAllPendingUser();
    }

    @GetMapping(path = "getAllKitas")
    public List<KitaDTO> getAllKitas() {
        return connectorService.getAllKitas();
    }

    @GetMapping(path = "getAllConnectableUser/{playSchoolId}")
    public List<AppUserDTO> getAllConnectableUser(@PathVariable String playSchoolId) {
        return connectorService.getAllConnectableUser(playSchoolId);
    }

    @PostMapping(path = "change/{id}/{role}")
    public void changeConnection(@PathVariable String id, @PathVariable String role) throws Exception {
        connectorService.changeConnection(id, UserRole.valueOf(role));
    }

    @PostMapping(path = "confirm/{id}")
    public void confirmConnection(@PathVariable String id) throws Exception {
        connectorService.confirmConnection(id);
    }

    @PostMapping(path = "delete/{id}")
    public void deleteConnection(@PathVariable String id) {
        connectorService.deleteConnection(id);
    }

}