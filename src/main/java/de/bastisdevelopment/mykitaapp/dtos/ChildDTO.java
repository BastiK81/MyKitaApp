package de.bastisdevelopment.mykitaapp.dtos;

import de.bastisdevelopment.mykitaapp.items.KindDBItem;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class ChildDTO {

    private String id;
    private String firstName;
    private String lastName;
    private Date dateOfBirth;
    private List<String> parents;
    private String kitaId;
    private String groupId;

    public ChildDTO(KindDBItem child) {
        super();
        this.id = child.getId();
        this.firstName = child.getFirstName();
        this.lastName = child.getLastName();
        this.dateOfBirth = child.getDateOfBirth();
        this.kitaId = child.getKitaId();
        this.groupId = child.getGroupId();
        this.parents = child.getParents();
    }

    public ChildDTO(String firstName, String lastName, Date dateOfBirth, List<String> parents, String kitaId, String groupId) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.parents = parents;
        this.kitaId = kitaId;
        this.groupId = groupId;
    }
}
