package de.bastisdevelopment.mykitaapp.controller;

import de.bastisdevelopment.mykitaapp.dtos.KitaDTO;
import de.bastisdevelopment.mykitaapp.service.KitaService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/kita")
public class KitaController {

    private static final Logger logger = LoggerFactory.getLogger(KitaController.class);

    private final KitaService service;

    public KitaController(KitaService service) {
        this.service = service;
    }

    @GetMapping(path = "/getkita")
    public KitaDTO getKitaByAdmin() throws Exception {
        logger.info("Try to get Kita by Admin");
        return this.service.getKitaByAdmin();
    }

    @PostMapping(path = "/addkita")
    public KitaDTO createKita(@RequestBody KitaDTO kita) {
        logger.info(String.format("Try to add new Kita: %s", kita.getName()));
        return service.addKita(kita);
    }
}
