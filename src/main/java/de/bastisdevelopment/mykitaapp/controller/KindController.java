package de.bastisdevelopment.mykitaapp.controller;

import de.bastisdevelopment.mykitaapp.dtos.ChildDTO;
import de.bastisdevelopment.mykitaapp.service.ChildService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/child")
public class KindController {

    private static final Logger logger = LoggerFactory.getLogger(KindController.class);

    private final ChildService service;

    public KindController(ChildService service) {
        this.service = service;
    }

    @PostMapping(path = "/addNewChild")
    public List<ChildDTO> addNewChild(@RequestBody ChildDTO child) throws Exception {
        return service.addNewChild(child);
    }

    @GetMapping(path = "/getAllChildren/{kitaId}")
    public List<ChildDTO> getAllChildren(@PathVariable String kitaId) {
        return service.getAllChilds(kitaId);
    }

    @DeleteMapping(value = "/delete/{childId}")
    public void deleteChildById(@PathVariable String childId) {
        service.deleteChildById(childId);
    }
}