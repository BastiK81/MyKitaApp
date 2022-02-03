package de.bastisdevelopment.mykitaapp.controller;

import de.bastisdevelopment.mykitaapp.dtos.KitaGroupDTO;
import de.bastisdevelopment.mykitaapp.service.KitaGroupService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class KitaGroupController {

    private final KitaGroupService service;

    private static final Logger logger = LoggerFactory.getLogger(KitaGroupController.class);

    public KitaGroupController(KitaGroupService service) {
        this.service = service;
    }

    @PostMapping(path = "/addnewgroup")
    public List<KitaGroupDTO> addNewGroup(@RequestBody KitaGroupDTO groupDTO) throws Exception {
        logger.info("Try to add Group " + groupDTO.getName());
        return service.addNewGroup(groupDTO);
    }

    @GetMapping(value = "/getAllGroups/{id}")
    public List<KitaGroupDTO> getAllGroups(@PathVariable String id)  {
        logger.info("Get Kita Groups with id: " + id);
        return service.getAllGroups(id);
    }

}
