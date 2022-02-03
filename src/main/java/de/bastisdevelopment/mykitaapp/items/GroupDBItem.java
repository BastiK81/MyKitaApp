package de.bastisdevelopment.mykitaapp.items;

import de.bastisdevelopment.mykitaapp.dtos.GroupDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document("groupItems")
public class GroupDBItem {

    @Id
    private String id;
    @Indexed
    private String name;
    private String kitaId;
    private String kitaName;


    public GroupDBItem(GroupDTO groupDTO) {
        this.name = groupDTO.getName();
        this.kitaId = groupDTO.getKitaId();
        this.kitaName = groupDTO.getKitaName();
    }
}