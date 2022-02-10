package de.bastisdevelopment.mykitaapp.controller;

import de.bastisdevelopment.mykitaapp.dtos.KitaDTO;
import de.bastisdevelopment.mykitaapp.service.KitaService;
import de.bastisdevelopment.mykitaapp.utils.PlaySchoolVisibility;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/kita")
public class PlaySchoolController {

    private static final Logger logger = LoggerFactory.getLogger(PlaySchoolController.class);

    private final KitaService kitaService;


    public PlaySchoolController(KitaService kitaService) {
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
    public Map<String, Boolean> getVisibility(@PathVariable String kitaId) throws Exception {
        logger.info("Try to get Kita visibility");
        return kitaService.getVisibility(kitaId);
    }

    @PostMapping(path = "/changeVisibility/{kitaId}")
    public void changeVisibility(@PathVariable String kitaId, @RequestBody Map<String, Boolean> visibility) throws Exception {
        logger.info("Change Kita visibility");
        kitaService.changeVisibility(kitaId, visibility);
    }
}
