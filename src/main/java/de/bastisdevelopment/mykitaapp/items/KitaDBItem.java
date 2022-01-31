package de.bastisdevelopment.mykitaapp.items;

import de.bastisdevelopment.mykitaapp.dtos.KitaDTO;

import lombok.Data;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
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

    public KitaDBItem(KitaDTO kitaDTO) {
        super();
        this.name = kitaDTO.getName();
        this.street = kitaDTO.getStreet();
        this.houseNumber = kitaDTO.getHouseNumber();
        this.postcode = kitaDTO.getPostcode();
        this.city = kitaDTO.getCity();
    }

}
