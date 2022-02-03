package de.bastisdevelopment.mykitaapp.dtos;

import de.bastisdevelopment.mykitaapp.items.AppUser;
import lombok.Data;
import org.springframework.data.mongodb.core.index.Indexed;

@Data
public class AppUserDTO {

    private String id;
    private String email;
    private String lastName;
    private String firstName;

    public AppUserDTO(AppUser user) {
        this.id = user.getId();
        this.email = user.getEmail();
        this.lastName = user.getLastName();
        this.firstName = user.getFirstName();
    }
}
