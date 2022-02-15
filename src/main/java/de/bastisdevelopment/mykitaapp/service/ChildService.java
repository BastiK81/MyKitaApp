package de.bastisdevelopment.mykitaapp.service;

import de.bastisdevelopment.mykitaapp.dtos.ChildDTO;
import de.bastisdevelopment.mykitaapp.items.ChildDBItem;
import de.bastisdevelopment.mykitaapp.repository.ChildRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChildService {

    private static final Logger logger = LoggerFactory.getLogger(ChildService.class);

    private final ChildRepository repository;

    public ChildService(ChildRepository repository) {
        this.repository = repository;
    }

    public List<ChildDTO> addNewChild(ChildDTO child) throws Exception {
        if (repository.findByFirstNameAndLastNameAndDateOfBirth(child.getFirstName(), child.getLastName(), child.getDateOfBirth()).isPresent()) {
            throw new Exception(String.format("Child with name: %s lastName: %s and date of birth: %s already exist", child.getFirstName(), child.getLastName(), child.getDateOfBirth().toString()));
        }
        repository.save(new ChildDBItem(child));
        return this.getAllChilds(child.getKitaId());
    }

    public List<ChildDTO> getAllChilds(String kitaId) {
        return repository.findByKitaId(kitaId).stream().map(ChildDTO::new).toList();
    }

}
