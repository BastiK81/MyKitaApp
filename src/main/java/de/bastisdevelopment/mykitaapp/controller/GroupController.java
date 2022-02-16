package de.bastisdevelopment.mykitaapp.controller;

import de.bastisdevelopment.mykitaapp.dtos.GroupDTO;
import de.bastisdevelopment.mykitaapp.service.GroupService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/group")
public class GroupController {

    private final GroupService service;

    public GroupController(GroupService service) {
        this.service = service;
    }

    @PostMapping(path = "/addnewgroup")
    public List<GroupDTO> addNewGroup(@RequestBody GroupDTO groupDTO) throws Exception {
        return service.addNewGroup(groupDTO);
    }

    @GetMapping(value = "/getallgroups/{kitaId}")
    public List<GroupDTO> getAllGroups(@PathVariable String kitaId) {
        return service.getAllGroups(kitaId);
    }

    @GetMapping(value = "/getgroupbyid/{groupId}")
    public GroupDTO getGroupById(@PathVariable String groupId) throws Exception {
        return service.getGroupById(groupId);
    }

    @DeleteMapping(value = "/delete/{groupId}")
    public void deleteGroupById(@PathVariable String groupId) {
        service.deleteGroupById(groupId);
    }

}
