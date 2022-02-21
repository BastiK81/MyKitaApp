package de.bastisdevelopment.mykitaapp.controller;

import de.bastisdevelopment.mykitaapp.dtos.AbwesenheitDTO;
import de.bastisdevelopment.mykitaapp.service.AbwesenheitService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/abwesenheiten")
public class AbwesenheitenController {

    private final AbwesenheitService abwesenheitService;

    public AbwesenheitenController(AbwesenheitService abwesenheitService) {
        this.abwesenheitService = abwesenheitService;
    }

    @PostMapping(path = "/add")
    public void add(@RequestBody AbwesenheitDTO abwesenheit) {
        abwesenheitService.add(abwesenheit);
    }
}
