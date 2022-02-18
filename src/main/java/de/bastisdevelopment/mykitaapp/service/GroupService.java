package de.bastisdevelopment.mykitaapp.service;

import de.bastisdevelopment.mykitaapp.dtos.GroupDTO;
import de.bastisdevelopment.mykitaapp.items.GroupDBItem;
import de.bastisdevelopment.mykitaapp.items.KindDBItem;
import de.bastisdevelopment.mykitaapp.repository.ChildRepository;
import de.bastisdevelopment.mykitaapp.repository.GroupRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class GroupService {

    private final GroupRepository groupRepository;
    private final ChildRepository childRepository;

    public GroupService(GroupRepository groupRepository, ChildRepository childRepository) {
        this.groupRepository = groupRepository;
        this.childRepository = childRepository;
    }

    public List<GroupDTO> addNewGroup(GroupDTO groupDTO) throws Exception {
        if (groupRepository.findByNameAndKitaId(groupDTO.getName(), groupDTO.getKitaId()).isPresent()) {
            throw new Exception(String.format("Group with name %s already exist in Kita %s", groupDTO.getName(), groupDTO.getKitaName()));
        }
        groupDTO.setParents(new ArrayList<>());
        groupDTO.setKinder(new ArrayList<>());
        groupDTO.setEducator(new ArrayList<>());
        groupRepository.save(new GroupDBItem(groupDTO));
        return this.getAllGroups(groupDTO.getKitaId());
    }

    public List<GroupDTO> getAllGroups(String kitaId) {
        return groupRepository.findByKitaId(kitaId).stream().map(GroupDTO::new).toList();
    }

    public void deleteGroupById(String groupId) {
        List<KindDBItem> kinder = childRepository.findAllByGroupId(groupId);
        for (KindDBItem kind:kinder)
        {
            kind.setGroupId("");
            childRepository.save(kind);
        }
        groupRepository.deleteById(groupId);
    }

    public GroupDTO getGroupById(String groupId) throws Exception {
        return new GroupDTO(groupRepository.findById(groupId)
                .orElseThrow(() -> new Exception("Group " + groupId + " not found!")));
    }

    public void addKindToGroup(KindDBItem kind) throws Exception {
        GroupDBItem groupDBItem = groupRepository.findById(kind.getGroupId())
                .orElseThrow(() -> new Exception(String.format("Group with id %s not found", kind.getGroupId())));
        groupDBItem.addKind(kind);
        groupRepository.save(groupDBItem);
    }

    public void deleteChildFromGroup(KindDBItem kind) throws Exception {
        GroupDBItem item = groupRepository.findById(kind.getGroupId()).orElseThrow(() -> new Exception("Group not found"));
        item.removeKind(kind);
        groupRepository.save(item);
    }
}
