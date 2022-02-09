package de.bastisdevelopment.mykitaapp.items;

import de.bastisdevelopment.mykitaapp.dtos.KitaDTO;
import de.bastisdevelopment.mykitaapp.utils.PlaySchoolVisibility;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document("kitaItems")
public class KitaDBItem {

    @Id
    private String id;
    @Indexed
    private String name;
    private String street;
    private String houseNumber;
    private String postcode;
    private String city;
    private String adminId;
    private List<String> memberIds;
    private List<PlaySchoolVisibility> visibility;

    public KitaDBItem(KitaDTO kitaDTO) {
        super();
        this.name = kitaDTO.getName();
        this.street = kitaDTO.getStreet();
        this.houseNumber = kitaDTO.getHouseNumber();
        this.postcode = kitaDTO.getPostcode();
        this.city = kitaDTO.getCity();
    }

    public KitaDBItem(String id, String name, String street, String houseNumber, String postcode, String city, String adminId) {
        this.id = id;
        this.name = name;
        this.street = street;
        this.houseNumber = houseNumber;
        this.postcode = postcode;
        this.city = city;
        this.adminId = adminId;
    }

    public void addMember(String userId) {
        this.memberIds.add(userId);
    }

    public void removeMember(String userId) {
        this.memberIds.remove(userId);
    }

    public void addVisibility(PlaySchoolVisibility visibility) {
        this.visibility.add(visibility);
    }

    public void removeVisibility(PlaySchoolVisibility visibility) {
        this.visibility.remove(visibility);
    }

    public void changeVisibility(PlaySchoolVisibility visibility) {
        if (this.visibility.contains(visibility)) {
            this.visibility.remove(visibility);
        } else {
            this.visibility.add(visibility);
        }
    }
}
