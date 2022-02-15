package de.bastisdevelopment.mykitaapp.controller;

import de.bastisdevelopment.mykitaapp.dtos.AppUserDTO;
import de.bastisdevelopment.mykitaapp.dtos.KitaDTO;
import de.bastisdevelopment.mykitaapp.dtos.KitaUserConnectorDTO;
import de.bastisdevelopment.mykitaapp.service.KitaUserConnectorService;
import de.bastisdevelopment.mykitaapp.utils.UserRole;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/userConnection")
public class UserConnectionController {

    private static final Logger logger = LoggerFactory.getLogger(UserConnectionController.class);
    private final KitaUserConnectorService connectorService;

    public UserConnectionController(KitaUserConnectorService connectorService) {
        this.connectorService = connectorService;
    }

    @PostMapping(path = "addKitaSide")
    public void addNewKitaSide(@RequestBody KitaUserConnectorDTO dto) throws Exception {
        logger.info("Add Kita User Connection");
        connectorService.addNewKitaSide(dto);
    }

    @PostMapping(path = "addUserSide")
    public void addNewUserSide(@RequestBody KitaUserConnectorDTO dto) throws Exception {
        logger.info("Add Kita User Connection");
        connectorService.addNewUserSide(dto);
    }

    @GetMapping(path = "getAllAccepted/{playSchoolId}")
    public List<KitaUserConnectorDTO> getAllAccepted(@PathVariable String playSchoolId) {
        return connectorService.getAllAccepted(playSchoolId);
    }

    @GetMapping(path = "getAllInProgress/{playSchoolId}")
    public List<KitaUserConnectorDTO> getAllInProgress(@PathVariable String playSchoolId) {
        return connectorService.getAllInProgress(playSchoolId);
    }

    @GetMapping(path = "getAllPending/{playSchoolId}")
    public List<KitaUserConnectorDTO> getAllPending(@PathVariable String playSchoolId) {
        return connectorService.getAllPending(playSchoolId);
    }

    @GetMapping(path = "getAllAcceptedUser")
    public List<KitaUserConnectorDTO> getAllAcceptedUser() {
        return connectorService.getAllAcceptedUser();
    }

    @GetMapping(path = "getAllInProgressUser")
    public List<KitaUserConnectorDTO> getAllInProgressUser() {
        return connectorService.getAllInProgressUser();
    }

    @GetMapping(path = "getAllPendingUser")
    public List<KitaUserConnectorDTO> getAllPendingUser() {
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

    @PostMapping(path = "change/{id}/{role}" )
    public void changeConnection(@PathVariable String id, @PathVariable String role) throws Exception {
        connectorService.changeConnection(id, UserRole.valueOf(role));
    }

    @PostMapping(path = "confirm/{id}" )
    public void confirmConnection(@PathVariable String id) throws Exception {
        connectorService.confirmConnection(id);
    }

}