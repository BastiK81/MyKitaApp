package de.bastisdevelopment.mykitaapp.items;

import de.bastisdevelopment.mykitaapp.utils.UserRole;
import de.bastisdevelopment.mykitaapp.utils.UserVisibility;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Data
@Document("appUser")
public class AppUserDBItem implements UserDetails {

    @Id
    private String id;
    @Indexed
    private String email;
    private String password;
    private String lastName;
    private String firstName;
    private UserVisibility visibility;
    private List<UserRole> userRoles;

    public void initialiseVisibility() {
        this.visibility = UserVisibility.INVISIBLE;
    }

    public void initialiseUserRole() {
        this.userRoles = new ArrayList<>();
        this.userRoles.add(UserRole.NONE);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
