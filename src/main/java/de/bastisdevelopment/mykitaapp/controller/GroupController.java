package de.bastisdevelopment.mykitaapp.controller;

import de.bastisdevelopment.mykitaapp.dtos.GroupDTO;
import de.bastisdevelopment.mykitaapp.service.GroupService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/group")
public class GroupController {

    private static final Logger logger = LoggerFactory.getLogger(GroupController.class);
    private final GroupService service;

    public GroupController(GroupService service) {
        this.service = service;
    }

    @PostMapping(path = "/addnewgroup")
    public List<GroupDTO> addNewGroup(@RequestBody GroupDTO groupDTO) throws Exception {
        return service.addNewGroup(groupDTO);
    }

    @GetMapping(value = "/getAllGroups/{kitaId}")
    public List<GroupDTO> getAllGroups(@PathVariable String kitaId) {
        return service.getAllGroups(kitaId);
    }

}
