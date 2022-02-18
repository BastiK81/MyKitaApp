package de.bastisdevelopment.mykitaapp.dtos;

import de.bastisdevelopment.mykitaapp.items.AppUserDBItem;
import de.bastisdevelopment.mykitaapp.items.GroupDBItem;
import de.bastisdevelopment.mykitaapp.items.KindDBItem;
import lombok.Data;

import java.util.List;

@Data
public class GroupDTO {

    private String id;
    private String name;
    private String kitaId;
    private String kitaName;
    private List<KindDBItem> kinder;
    private List<AppUserDBItem> educator;
    private List<AppUserDBItem> parents;

    public GroupDTO(GroupDBItem item) {
        this.id = item.getId();
        this.name = item.getName();
        this.kitaId = item.getKitaId();
        this.kitaName = item.getKitaName();
        this.educator = item.getEducator();
        this.kinder = item.getKinder();
        this.parents = item.getParents();
    }

    public GroupDTO(String name, String kitaId, String kitaName) {
        this.name = name;
        this.kitaId = kitaId;
        this.kitaName = kitaName;
    }
}
