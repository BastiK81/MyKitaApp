package de.bastisdevelopment.mykitaapp.service;

import de.bastisdevelopment.mykitaapp.dtos.GroupDTO;
import de.bastisdevelopment.mykitaapp.items.GroupDBItem;
import de.bastisdevelopment.mykitaapp.repository.GroupRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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
        repository.save(new GroupDBItem(groupDTO));
        return this.getAllGroups(groupDTO.getKitaId());
    }

    public List<GroupDTO> getAllGroups(String kitaId) {
        return repository.findByKitaId(kitaId).stream().map(values -> new GroupDTO(values)).collect(Collectors.toList());
    }
}
