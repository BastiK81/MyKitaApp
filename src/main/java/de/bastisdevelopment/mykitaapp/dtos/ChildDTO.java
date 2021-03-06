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
    private List<AppUserDTO> eltern;
    private String kitaId;
    private String groupId;

    public ChildDTO() {
    }

    public ChildDTO(KindDBItem child) {
        this.id = child.getId();
        this.firstName = child.getFirstName();
        this.lastName = child.getLastName();
        this.dateOfBirth = child.getDateOfBirth();
        this.kitaId = child.getKitaId();
        this.groupId = child.getGroupId();
        this.eltern = child.getEltern();
    }

    public ChildDTO(String id, String firstName, String lastName, Date dateOfBirth, List<AppUserDTO> parents, String kitaId, String groupId) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.eltern = parents;
        this.kitaId = kitaId;
        this.groupId = groupId;
    }

    public ChildDTO(String firstName, String lastName, Date dateOfBirth, List<AppUserDTO> parents, String kitaId, String groupId) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.eltern = parents;
        this.kitaId = kitaId;
        this.groupId = groupId;
    }
}
