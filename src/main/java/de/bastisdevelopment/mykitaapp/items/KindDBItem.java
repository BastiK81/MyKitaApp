package de.bastisdevelopment.mykitaapp.items;

import de.bastisdevelopment.mykitaapp.dtos.AppUserDTO;
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
    private List<AppUserDTO> eltern;
    private String kitaId;
    private String groupId;

    public KindDBItem(ChildDTO child) {
        this.firstName = child.getFirstName();
        this.lastName = child.getLastName();
        this.dateOfBirth = child.getDateOfBirth();
        this.eltern = child.getEltern();
        this.kitaId = child.getKitaId();
        this.groupId = child.getGroupId();
    }

    public void update(ChildDTO child) {
        this.firstName = child.getFirstName();
        this.lastName = child.getLastName();
        this.dateOfBirth = child.getDateOfBirth();
        this.eltern = child.getEltern();
        this.groupId = child.getGroupId();
    }
}
