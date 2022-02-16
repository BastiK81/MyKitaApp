package de.bastisdevelopment.mykitaapp.service;

import de.bastisdevelopment.mykitaapp.dtos.ChildDTO;
import de.bastisdevelopment.mykitaapp.items.KindDBItem;
import de.bastisdevelopment.mykitaapp.repository.ChildRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChildService {

    private static final Logger logger = LoggerFactory.getLogger(ChildService.class);

    private final ChildRepository childRepository;
    private final GroupService groupService;

    public ChildService(ChildRepository childRepository, GroupService groupService) {
        this.childRepository = childRepository;
        this.groupService = groupService;
    }

    public List<ChildDTO> addNewChild(ChildDTO child) throws Exception {
        if (childRepository.findByFirstNameAndLastNameAndDateOfBirth(child.getFirstName(), child.getLastName(), child.getDateOfBirth()).isPresent()) {
            throw new Exception(String.format("Child with name: %s lastName: %s and date of birth: %s already exist", child.getFirstName(), child.getLastName(), child.getDateOfBirth().toString()));
        }
        KindDBItem newKind = childRepository.save(new KindDBItem(child));
        try {
            groupService.addKindToGroup(newKind);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return this.getAllChilds(child.getKitaId());
    }

    public List<ChildDTO> getAllChilds(String kitaId) {
        return childRepository.findByKitaId(kitaId).stream().map(ChildDTO::new).toList();
    }

    public void deleteChildById(String childId) {
        childRepository.deleteById(childId);
    }
}
