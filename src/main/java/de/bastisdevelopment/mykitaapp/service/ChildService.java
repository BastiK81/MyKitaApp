package de.bastisdevelopment.mykitaapp.service;

import de.bastisdevelopment.mykitaapp.dtos.ChildDTO;
import de.bastisdevelopment.mykitaapp.items.KindDBItem;
import de.bastisdevelopment.mykitaapp.repository.ChildRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChildService {

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
        return this.getAllChildren(child.getKitaId());
    }

    public List<ChildDTO> getAllChildren(String kitaId) {
        return childRepository.findByKitaId(kitaId).stream().map(ChildDTO::new).toList();
    }

    public void deleteChildById(String childId) throws Exception {
        KindDBItem kind = childRepository.findById(childId).orElseThrow(() -> new Exception("Kind not found"));
        try {
            groupService.deleteChildFromGroup(kind);
        } catch (Exception e) {
            e.printStackTrace();
        }
        childRepository.deleteById(childId);
    }

    public void updateChild(ChildDTO child) throws Exception {
        KindDBItem item = childRepository.findById(child.getId()).orElseThrow(() ->  new Exception("Child not found"));
        try {
            groupService.deleteChildFromGroup(item);
        } catch (Exception e) {
            e.printStackTrace();
        }
        item.update(child);
        try {
            groupService.addKindToGroup(item);
        } catch (Exception e) {
            e.printStackTrace();
        }
        childRepository.save(item);
    }
}
