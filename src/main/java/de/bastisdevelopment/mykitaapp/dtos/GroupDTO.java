package de.bastisdevelopment.mykitaapp.dtos;

import de.bastisdevelopment.mykitaapp.items.GroupDBItem;
import lombok.Data;

@Data
public class GroupDTO {

    private String id;
    private String name;
    private String kitaId;
    private String kitaName;

    public GroupDTO(GroupDBItem item) {
        this.id = item.getId();
        this.name = item.getName();
        this.kitaId = item.getKitaId();
        this.kitaName = item.getKitaName();
    }

    public GroupDTO(String name, String kitaId, String kitaName) {
        super();
        this.name = name;
        this.kitaId = kitaId;
        this.kitaName = kitaName;
    }
}
