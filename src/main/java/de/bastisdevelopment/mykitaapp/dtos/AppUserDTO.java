package de.bastisdevelopment.mykitaapp.dtos;

import de.bastisdevelopment.mykitaapp.items.AppUserDBItem;
import lombok.Data;

@Data
public class AppUserDTO {

    private String id;
    private String email;
    private String lastName;
    private String firstName;

    public AppUserDTO(AppUserDBItem user) {
        this.id = user.getId();
        this.email = user.getEmail();
        this.lastName = user.getLastName();
        this.firstName = user.getFirstName();
    }

    public AppUserDTO(String id, String email, String lastName, String firstName) {
        this.id = id;
        this.email = email;
        this.lastName = lastName;
        this.firstName = firstName;
    }
}
