package de.bastisdevelopment.mykitaapp.dtos;

import de.bastisdevelopment.mykitaapp.items.KitaDBItem;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertTrue;

class KitaDTOTest {

    private final KitaDBItem kitaDBItem = new KitaDBItem("12345", "Nordlicht", "Heuweg", "2", "21493", "Schwarzenbek", "12345");

    @Test
    void TestKitaDTOIdTrue() {
        KitaDTO kitaDTO = new KitaDTO(kitaDBItem);
        assertTrue(kitaDTO.getId() == kitaDBItem.getId());
    }

    @Test
    void TestKitaDTONameTrue() {
        KitaDTO kitaDTO = new KitaDTO(kitaDBItem);
        assertTrue(kitaDTO.getName() == kitaDBItem.getName());
    }

    @Test
    void TestKitaDTOStreetTrue() {
        KitaDTO kitaDTO = new KitaDTO(kitaDBItem);
        assertTrue(kitaDTO.getStreet() == kitaDBItem.getStreet());
    }

    @Test
    void TestKitaDTOHouseNumberTrue() {
        KitaDTO kitaDTO = new KitaDTO(kitaDBItem);
        assertTrue(kitaDTO.getHouseNumber() == kitaDBItem.getHouseNumber());
    }

    @Test
    void TestKitaDTOPostcodeTrue() {
        KitaDTO kitaDTO = new KitaDTO(kitaDBItem);
        assertTrue(kitaDTO.getPostcode() == kitaDBItem.getPostcode());
    }

    @Test
    void TestKitaDTOCityTrue() {
        KitaDTO kitaDTO = new KitaDTO(kitaDBItem);
        assertTrue(kitaDTO.getCity() == kitaDBItem.getCity());
    }
}