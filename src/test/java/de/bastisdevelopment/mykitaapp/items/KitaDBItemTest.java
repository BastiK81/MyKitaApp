package de.bastisdevelopment.mykitaapp.items;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import de.bastisdevelopment.mykitaapp.dtos.KitaDTO;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;

class KitaDBItemTest {
    @Test
    void testConstructor() {
        KitaDBItem actualKitaDBItem = new KitaDBItem("42", "Name", "Street", "42", "OX1 1PT", "Oxford", "42");

        assertEquals("42", actualKitaDBItem.getAdminId());
        assertEquals(
                "KitaDBItem(id=42, name=Name, street=Street, houseNumber=42, postcode=OX1 1PT, city=Oxford, adminId=42,"
                        + " memberIds=null, visibility=null)",
                actualKitaDBItem.toString());
        assertNull(actualKitaDBItem.getVisibility());
        assertEquals("Street", actualKitaDBItem.getStreet());
        assertEquals("OX1 1PT", actualKitaDBItem.getPostcode());
        assertEquals("Name", actualKitaDBItem.getName());
        assertNull(actualKitaDBItem.getMemberIds());
        assertEquals("42", actualKitaDBItem.getId());
        assertEquals("42", actualKitaDBItem.getHouseNumber());
        assertEquals("Oxford", actualKitaDBItem.getCity());
    }

    @Test
    void testConstructor2() {
        KitaDBItem actualKitaDBItem = new KitaDBItem(new KitaDTO("Name", "Street", "42", "OX1 1PT", "Oxford"));
        assertEquals("Street", actualKitaDBItem.getStreet());
        assertEquals("OX1 1PT", actualKitaDBItem.getPostcode());
        assertEquals("Name", actualKitaDBItem.getName());
        assertEquals("42", actualKitaDBItem.getHouseNumber());
        assertEquals("Oxford", actualKitaDBItem.getCity());
    }

    @Test
    void testAddMember() {
        KitaDBItem kitaDBItem = new KitaDBItem();
        kitaDBItem.setMemberIds(new ArrayList<>());
        kitaDBItem.addMember("42");
        List<String> memberIds = kitaDBItem.getMemberIds();
        assertEquals(1, memberIds.size());
        assertEquals("42", memberIds.get(0));
    }

    @Test
    void testRemoveMember() {
        KitaDBItem kitaDBItem = new KitaDBItem();
        kitaDBItem.setMemberIds(new ArrayList<>());
        kitaDBItem.removeMember("42");
        assertTrue(kitaDBItem.getMemberIds().isEmpty());
    }
}

