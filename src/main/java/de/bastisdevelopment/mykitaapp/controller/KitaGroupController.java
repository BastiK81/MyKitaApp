package de.bastisdevelopment.mykitaapp.controller;

import de.bastisdevelopment.mykitaapp.dtos.KitaGroupDTO;
import de.bastisdevelopment.mykitaapp.service.KitaGroupService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class KitaGroupController {

    private final KitaGroupService service;

    public KitaGroupController(KitaGroupService service) {
        this.service = service;
    }

    @PostMapping(path = "/addNewGroup")
    public List<KitaGroupDTO> addNewGroup(@RequestBody KitaGroupDTO groupDTO) throws Exception {
        return service.addNewGroup(groupDTO);
    }

    @GetMapping(value = "/getAllGroups/{id}")
    public List<KitaGroupDTO> getAllGroups(@PathVariable String id)  {
        return service.getAllGroups(id);
    }

}
