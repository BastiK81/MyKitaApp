package de.bastisdevelopment.mykitaapp.controller;

import de.bastisdevelopment.mykitaapp.dtos.ChildDTO;
import de.bastisdevelopment.mykitaapp.service.ChildService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ChildController {

    private static final Logger logger = LoggerFactory.getLogger(ChildController.class);

    private final ChildService service;

    public ChildController(ChildService service) {
        this.service = service;
    }

    @PostMapping(path = "/addNewChild")
    public List<ChildDTO> addNewChild(@RequestBody ChildDTO child) throws Exception {
        logger.info("Add new Child");
        return service.addNewChild(child);
    }

    @GetMapping(path = "/getAllChilds/{kitaId}")
    public List<ChildDTO> getAllChilds(@PathVariable String kitaId) {
        logger.info("get all chillds");
        return service.getAllChilds(kitaId);
    }
}