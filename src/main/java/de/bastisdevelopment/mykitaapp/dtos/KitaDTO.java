package de.bastisdevelopment.mykitaapp.dtos;

import de.bastisdevelopment.mykitaapp.items.KitaDBItem;
import lombok.Data;

@Data
public class KitaDTO {

    private String id;
    private String name;
    private String street;
    private String houseNumber;
    private String postcode;
    private String city;
    private String adminId;

    public KitaDTO(KitaDBItem kitaDBItem) {
        this.id = kitaDBItem.getId();
        this.name = kitaDBItem.getName();
        this.street = kitaDBItem.getStreet();
        this.houseNumber = kitaDBItem.getHouseNumber();
        this.postcode = kitaDBItem.getPostcode();
        this.city = kitaDBItem.getCity();
    }

    public KitaDTO(String name, String street, String houseNumber, String postcode, String city) {
        super();
        this.name = name;
        this.street = street;
        this.houseNumber = houseNumber;
        this.postcode = postcode;
        this.city = city;
    }


}
