package de.bastisdevelopment.mykitaapp.service;

import de.bastisdevelopment.mykitaapp.dtos.GroupDTO;
import de.bastisdevelopment.mykitaapp.items.GroupDBItem;
import de.bastisdevelopment.mykitaapp.items.KindDBItem;
import de.bastisdevelopment.mykitaapp.repository.GroupRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class GroupService {

    private final GroupRepository repository;

    public GroupService(GroupRepository repository) {
        this.repository = repository;
    }

    public List<GroupDTO> addNewGroup(GroupDTO groupDTO) throws Exception {
        if (repository.findByNameAndKitaId(groupDTO.getName(), groupDTO.getKitaId()).isPresent()) {
            throw new Exception(String.format("Group with name %s already exist in Kita %s", groupDTO.getName(), groupDTO.getKitaName()));
        }
        groupDTO.setParents(new ArrayList<>());
        groupDTO.setKinder(new ArrayList<>());
        groupDTO.setEducator(new ArrayList<>());
        repository.save(new GroupDBItem(groupDTO));
        return this.getAllGroups(groupDTO.getKitaId());
    }

    public List<GroupDTO> getAllGroups(String kitaId) {
        return repository.findByKitaId(kitaId).stream().map(GroupDTO::new).toList();
    }

    public void deleteGroupById(String groupId) {
        repository.deleteById(groupId);
    }

    public GroupDTO getGroupById(String groupId) throws Exception {
        return new GroupDTO(repository.findById(groupId)
                .orElseThrow(() -> new Exception("Group " + groupId + " not found!")));
    }

    public void addKindToGroup(KindDBItem kind) throws Exception {
        GroupDBItem groupDBItem = repository.findById(kind.getGroupId())
                .orElseThrow(() -> new Exception(String.format("Group with id %s not found", kind.getGroupId())));
        groupDBItem.addKind(kind);
        repository.save(groupDBItem);
    }
}
