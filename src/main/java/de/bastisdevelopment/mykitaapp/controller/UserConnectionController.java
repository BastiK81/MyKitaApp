package de.bastisdevelopment.mykitaapp.controller;

import de.bastisdevelopment.mykitaapp.dtos.AppUserDTO;
import de.bastisdevelopment.mykitaapp.dtos.KitaUserConnectorDTO;
import de.bastisdevelopment.mykitaapp.service.KitaUserConnectorService;
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

    @PostMapping(path = "add")
    public void addNew(@RequestBody KitaUserConnectorDTO dto) throws Exception {
        logger.info("Add Kita User Connection");
        connectorService.addNew(dto);
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

    @GetMapping(path = "getAllConnectableUser/{playSchoolId}")
    public List<AppUserDTO> getAllConnectableUser(@PathVariable String playSchoolId) {
        return connectorService.getAllConnectableUser(playSchoolId);
    }

}
