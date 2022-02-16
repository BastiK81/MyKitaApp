package de.bastisdevelopment.mykitaapp.items;

import de.bastisdevelopment.mykitaapp.dtos.ChildDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document("childItems")
public class KindDBItem {

    @Id
    private String id;
    @Indexed
    private String firstName;
    @Indexed
    private String lastName;
    private Date dateOfBirth;
    private List<String> parents;
    private String kitaId;
    private String groupId;

    public KindDBItem(ChildDTO childDTO) {
        super();
        this.firstName = childDTO.getFirstName();
        this.lastName = childDTO.getLastName();
        this.dateOfBirth = childDTO.getDateOfBirth();
        this.parents = childDTO.getParents();
        this.kitaId = childDTO.getKitaId();
        this.groupId = childDTO.getGroupId();
    }
}
