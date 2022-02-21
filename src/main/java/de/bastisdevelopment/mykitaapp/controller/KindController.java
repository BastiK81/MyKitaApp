package de.bastisdevelopment.mykitaapp.controller;

import de.bastisdevelopment.mykitaapp.dtos.AppUserDTO;
import de.bastisdevelopment.mykitaapp.dtos.ChildDTO;
import de.bastisdevelopment.mykitaapp.service.ChildService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/child")
public class KindController {

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
        return service.getAllChildren(kitaId);
    }

    @GetMapping(path = "/getkindertouser/{userId}")
    public List<ChildDTO> getKinderToUser(@PathVariable String userId) {
        return service.getKinderToUser(userId);
    }

    @DeleteMapping(value = "/delete/{childId}")
    public void deleteChildById(@PathVariable String childId) throws Exception {
        service.deleteChildById(childId);
    }

    @PutMapping(path = "/updatechild")
    public void updateChild(@RequestBody ChildDTO child) throws Exception {
        service.updateChild(child);
    }

    @PutMapping(path = "/updateparents/{id}")
    public void updateParents(@RequestBody List<AppUserDTO> parents, @PathVariable String id) throws Exception {
        service.updateParents(id, parents);
    }
}