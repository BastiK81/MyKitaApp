package de.bastisdevelopment.mykitaapp.service;

import de.bastisdevelopment.mykitaapp.dtos.KitaGroupDTO;
import de.bastisdevelopment.mykitaapp.items.KitaGroupDBItem;
import de.bastisdevelopment.mykitaapp.repository.KitaGroupRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class KitaGroupService {

    private final KitaGroupRepository repository;

    public KitaGroupService(KitaGroupRepository repository) {
        this.repository = repository;
    }

    public List<KitaGroupDTO> addNewGroup(KitaGroupDTO groupDTO) throws Exception {
        if (repository.findByNameAndKitaId(groupDTO.getName(), groupDTO.getKitaId()).isPresent()) {
            throw new Exception(String.format("Group with name %s already exist in Kita %s", groupDTO.getName(), groupDTO.getKitaName()));
        }
        repository.save(new KitaGroupDBItem(groupDTO));
        return this.getAllGroups(groupDTO.getKitaId());
    }

    public List<KitaGroupDTO> getAllGroups(String id) {
        return repository.findByKitaId(id).stream().map(values -> new KitaGroupDTO(values)).collect(Collectors.toList());
    }
}
