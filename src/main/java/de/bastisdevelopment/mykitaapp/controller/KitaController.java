package de.bastisdevelopment.mykitaapp.controller;

import de.bastisdevelopment.mykitaapp.dtos.KitaDTO;
import de.bastisdevelopment.mykitaapp.service.KitaService;
import de.bastisdevelopment.mykitaapp.utils.KitaVisibility;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/kita")
public class KitaController {

    private static final Logger logger = LoggerFactory.getLogger(KitaController.class);

    private final KitaService kitaService;


    public KitaController(KitaService kitaService) {
        this.kitaService = kitaService;
    }

    @GetMapping(path = "/getkita")
    public KitaDTO getKitaByAdmin() throws Exception {
        logger.info("Try to get Kita by Admin");
        return this.kitaService.getKitaByAdmin();
    }

    @PostMapping(path = "/addkita")
    public KitaDTO createKita(@RequestBody KitaDTO kita) {
        logger.info("Try to add new playSchool");
        return kitaService.addKita(kita);
    }

    @GetMapping(path = "/getVisibility/{kitaId}")
    public KitaVisibility getVisibility(@PathVariable String kitaId) throws Exception {
        logger.info("Try to get Kita visibility");
        return kitaService.getVisibility(kitaId);
    }

    @PostMapping(path = "/changeVisibility/{kitaId}")
    public void changeVisibility(@PathVariable String kitaId, @RequestBody KitaVisibility visibility) throws Exception {
        logger.info("Change Kita visibility");
        kitaService.changeVisibility(kitaId, visibility);
    }

    @GetMapping(path = "/getAllKitas/{visibility}")
    public List<KitaDTO> getAllKitas(@PathVariable KitaVisibility visibility) {
        return kitaService.getAllKitas(visibility);
    }
}
