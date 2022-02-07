package de.bastisdevelopment.mykitaapp.controller;

import de.bastisdevelopment.mykitaapp.dtos.KitaDTO;
import de.bastisdevelopment.mykitaapp.dtos.KitaUserConnectorDTO;
import de.bastisdevelopment.mykitaapp.service.KitaService;
import de.bastisdevelopment.mykitaapp.service.KitaUserConnectorService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/kita")
public class KitaController {

    private static final Logger logger = LoggerFactory.getLogger(KitaController.class);

    private final KitaService kitaService;
    private final KitaUserConnectorService connectorService;

    public KitaController(KitaService kitaService, KitaUserConnectorService connectorService) {
        this.kitaService = kitaService;
        this.connectorService = connectorService;
    }

    @GetMapping(path = "/getkita")
    public KitaDTO getKitaByAdmin() throws Exception {
        logger.info("Try to get Kita by Admin");
        return this.kitaService.getKitaByAdmin();
    }

    @PostMapping(path = "/addkita")
    public KitaDTO createKita(@RequestBody KitaDTO kita) {
        logger.info(String.format("Try to add new Kita: %s", kita.getName()));
        return kitaService.addKita(kita);
    }

    @PostMapping(path = "addkitauserconnector")
    public void addNewKitaUserConnector(@RequestBody KitaUserConnectorDTO dto) throws Exception {
        logger.info("Add Kita User Connection");
        connectorService.addNewKitaUserConnection(dto);
    }

    @GetMapping(path = "getallkitauserconnections/{kitaId}")
    public List<KitaUserConnectorDTO> getAllKitaUserConnections(@PathVariable String kitaId) {
        return connectorService.getAllKitaUserConnections(kitaId);
    }
}
