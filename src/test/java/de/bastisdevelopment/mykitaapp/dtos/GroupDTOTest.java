package de.bastisdevelopment.mykitaapp.dtos;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

import de.bastisdevelopment.mykitaapp.items.AppUserDBItem;
import de.bastisdevelopment.mykitaapp.items.GroupDBItem;
import de.bastisdevelopment.mykitaapp.items.KindDBItem;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;

class GroupDTOTest {
    @Test
    void testConstructor() {
        GroupDTO actualGroupDTO = new GroupDTO("Name", "42", "Kita Name");

        assertNull(actualGroupDTO.getEducator());
        assertEquals(
                "GroupDTO(id=null, name=Name, kitaId=42, kitaName=Kita Name, kinder=null, educator=null," + " parents=null)",
                actualGroupDTO.toString());
        assertNull(actualGroupDTO.getParents());
        assertEquals("Name", actualGroupDTO.getName());
        assertEquals("Kita Name", actualGroupDTO.getKitaName());
        assertEquals("42", actualGroupDTO.getKitaId());
        assertNull(actualGroupDTO.getKinder());
        assertNull(actualGroupDTO.getId());
    }

    @Test
    void testConstructor2() {
        GroupDBItem groupDBItem = new GroupDBItem();
        groupDBItem.setEducator(new ArrayList<>());
        groupDBItem.setId("42");
        ArrayList<KindDBItem> kindDBItemList = new ArrayList<>();
        groupDBItem.setKinder(kindDBItemList);
        groupDBItem.setKitaId("42");
        groupDBItem.setKitaName("Kita Name");
        groupDBItem.setName("Name");
        groupDBItem.setParents(new ArrayList<>());
        GroupDTO actualGroupDTO = new GroupDTO(groupDBItem);
        List<AppUserDBItem> educator = actualGroupDTO.getEducator();
        assertEquals(kindDBItemList, educator);
        assertEquals(kindDBItemList, actualGroupDTO.getParents());
        assertEquals("Name", actualGroupDTO.getName());
        assertEquals("Kita Name", actualGroupDTO.getKitaName());
        assertEquals("42", actualGroupDTO.getKitaId());
        assertEquals(educator, actualGroupDTO.getKinder());
        assertEquals("42", actualGroupDTO.getId());
    }
}

