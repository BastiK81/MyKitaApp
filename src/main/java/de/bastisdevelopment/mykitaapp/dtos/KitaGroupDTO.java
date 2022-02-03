package de.bastisdevelopment.mykitaapp.dtos;

import de.bastisdevelopment.mykitaapp.items.KitaGroupDBItem;
import lombok.Data;

@Data
public class KitaGroupDTO {

    private String id;
    private String name;
    private String kitaId;
    private String kitaName;

    public KitaGroupDTO(KitaGroupDBItem item) {
        this.id = item.getId();
        this.name = item.getName();
        this.kitaId = item.getKitaId();
        this.kitaName = item.getKitaName();
    }

    public KitaGroupDTO(String name, String kitaId, String kitaName) {
        super();
        this.name = name;
        this.kitaId = kitaId;
        this.kitaName = kitaName;
    }
}
