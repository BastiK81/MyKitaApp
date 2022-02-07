package de.bastisdevelopment.mykitaapp.dtos;

import de.bastisdevelopment.mykitaapp.items.ChildDBItem;

import java.util.Date;
import java.util.List;

public class ChildDTO {

    private String id;
    private final String firstName;
    private final String lastName;
    private final Date dateOfBirth;
    private final List<String> parents;
    private final String kitaId;
    private final String groupId;

    public ChildDTO(ChildDBItem child) {
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

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public List<String> getParents() {
        return parents;
    }

    public String getKitaId() {
        return kitaId;
    }

    public String getGroupId() {
        return groupId;
    }
}
