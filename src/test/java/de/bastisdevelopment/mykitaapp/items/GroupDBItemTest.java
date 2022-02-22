package de.bastisdevelopment.mykitaapp.items;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import de.bastisdevelopment.mykitaapp.dtos.GroupDTO;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;

import org.junit.jupiter.api.Test;

class GroupDBItemTest {
    @Test
    void testConstructor() {
        GroupDBItem actualGroupDBItem = new GroupDBItem(new GroupDTO("Name", "42", "Kita Name"));
        assertNull(actualGroupDBItem.getEducator());
        assertNull(actualGroupDBItem.getParents());
        assertEquals("Name", actualGroupDBItem.getName());
        assertEquals("Kita Name", actualGroupDBItem.getKitaName());
        assertEquals("42", actualGroupDBItem.getKitaId());
        assertNull(actualGroupDBItem.getKinder());
    }

    @Test
    void testAddKind() {
        ArrayList<KindDBItem> kinder = new ArrayList<>();
        ArrayList<AppUserDBItem> educator = new ArrayList<>();
        GroupDBItem groupDBItem = new GroupDBItem("42", "Name", "42", "Kita Name", kinder, educator, new ArrayList<>());

        KindDBItem kindDBItem = new KindDBItem();
        LocalDateTime atStartOfDayResult = LocalDate.of(1970, 1, 1).atStartOfDay();
        kindDBItem.setDateOfBirth(Date.from(atStartOfDayResult.atZone(ZoneId.of("UTC")).toInstant()));
        kindDBItem.setEltern(new ArrayList<>());
        kindDBItem.setFirstName("Jane");
        kindDBItem.setGroupId("42");
        kindDBItem.setId("42");
        kindDBItem.setKitaId("42");
        kindDBItem.setLastName("Doe");
        groupDBItem.addKind(kindDBItem);
        assertEquals(1, groupDBItem.getKinder().size());
    }

    @Test
    void testRemoveKind() {
        GroupDBItem groupDBItem = new GroupDBItem();
        groupDBItem.setKinder(new ArrayList<>());

        KindDBItem kindDBItem = new KindDBItem();
        LocalDateTime atStartOfDayResult = LocalDate.of(1970, 1, 1).atStartOfDay();
        kindDBItem.setDateOfBirth(Date.from(atStartOfDayResult.atZone(ZoneId.of("UTC")).toInstant()));
        kindDBItem.setEltern(new ArrayList<>());
        kindDBItem.setFirstName("Jane");
        kindDBItem.setGroupId("42");
        kindDBItem.setId("42");
        kindDBItem.setKitaId("42");
        kindDBItem.setLastName("Doe");
        groupDBItem.removeKind(kindDBItem);
        assertTrue(groupDBItem.getKinder().isEmpty());
    }

    @Test
    void testRemoveKind2() {
        KindDBItem kindDBItem = new KindDBItem();
        LocalDateTime atStartOfDayResult = LocalDate.of(1970, 1, 1).atStartOfDay();
        kindDBItem.setDateOfBirth(Date.from(atStartOfDayResult.atZone(ZoneId.of("UTC")).toInstant()));
        kindDBItem.setEltern(new ArrayList<>());
        kindDBItem.setFirstName("Jane");
        kindDBItem.setGroupId("42");
        kindDBItem.setId("42");
        kindDBItem.setKitaId("42");
        kindDBItem.setLastName("Doe");

        ArrayList<KindDBItem> kindDBItemList = new ArrayList<>();
        kindDBItemList.add(kindDBItem);

        GroupDBItem groupDBItem = new GroupDBItem();
        groupDBItem.setKinder(kindDBItemList);

        KindDBItem kindDBItem1 = new KindDBItem();
        LocalDateTime atStartOfDayResult1 = LocalDate.of(1970, 1, 1).atStartOfDay();
        kindDBItem1.setDateOfBirth(Date.from(atStartOfDayResult1.atZone(ZoneId.of("UTC")).toInstant()));
        kindDBItem1.setEltern(new ArrayList<>());
        kindDBItem1.setFirstName("Jane");
        kindDBItem1.setGroupId("42");
        kindDBItem1.setId("42");
        kindDBItem1.setKitaId("42");
        kindDBItem1.setLastName("Doe");
        groupDBItem.removeKind(kindDBItem1);
        assertTrue(groupDBItem.getKinder().isEmpty());
    }

    @Test
    void testRemoveKind3() {
        KindDBItem kindDBItem = new KindDBItem();
        LocalDateTime atStartOfDayResult = LocalDate.of(1970, 1, 1).atStartOfDay();
        kindDBItem.setDateOfBirth(Date.from(atStartOfDayResult.atZone(ZoneId.of("UTC")).toInstant()));
        kindDBItem.setEltern(new ArrayList<>());
        kindDBItem.setFirstName("Jane");
        kindDBItem.setGroupId("42");
        kindDBItem.setId("42");
        kindDBItem.setKitaId("42");
        kindDBItem.setLastName("Doe");

        KindDBItem kindDBItem1 = new KindDBItem();
        LocalDateTime atStartOfDayResult1 = LocalDate.of(1970, 1, 1).atStartOfDay();
        kindDBItem1.setDateOfBirth(Date.from(atStartOfDayResult1.atZone(ZoneId.of("UTC")).toInstant()));
        kindDBItem1.setEltern(new ArrayList<>());
        kindDBItem1.setFirstName("Jane");
        kindDBItem1.setGroupId("42");
        kindDBItem1.setId("42");
        kindDBItem1.setKitaId("42");
        kindDBItem1.setLastName("Doe");

        ArrayList<KindDBItem> kindDBItemList = new ArrayList<>();
        kindDBItemList.add(kindDBItem1);
        kindDBItemList.add(kindDBItem);

        GroupDBItem groupDBItem = new GroupDBItem();
        groupDBItem.setKinder(kindDBItemList);

        KindDBItem kindDBItem2 = new KindDBItem();
        LocalDateTime atStartOfDayResult2 = LocalDate.of(1970, 1, 1).atStartOfDay();
        kindDBItem2.setDateOfBirth(Date.from(atStartOfDayResult2.atZone(ZoneId.of("UTC")).toInstant()));
        kindDBItem2.setEltern(new ArrayList<>());
        kindDBItem2.setFirstName("Jane");
        kindDBItem2.setGroupId("42");
        kindDBItem2.setId("42");
        kindDBItem2.setKitaId("42");
        kindDBItem2.setLastName("Doe");
        groupDBItem.removeKind(kindDBItem2);
        assertTrue(groupDBItem.getKinder().isEmpty());
    }

    @Test
    void testRemoveKind4() {
        KindDBItem kindDBItem = new KindDBItem();
        LocalDateTime atStartOfDayResult = LocalDate.of(1970, 1, 1).atStartOfDay();
        kindDBItem.setDateOfBirth(Date.from(atStartOfDayResult.atZone(ZoneId.of("UTC")).toInstant()));
        kindDBItem.setEltern(new ArrayList<>());
        kindDBItem.setFirstName("Jane");
        kindDBItem.setGroupId("42");
        kindDBItem.setId("Id");
        kindDBItem.setKitaId("42");
        kindDBItem.setLastName("Doe");

        ArrayList<KindDBItem> kindDBItemList = new ArrayList<>();
        kindDBItemList.add(kindDBItem);

        GroupDBItem groupDBItem = new GroupDBItem();
        groupDBItem.setKinder(kindDBItemList);

        KindDBItem kindDBItem1 = new KindDBItem();
        LocalDateTime atStartOfDayResult1 = LocalDate.of(1970, 1, 1).atStartOfDay();
        kindDBItem1.setDateOfBirth(Date.from(atStartOfDayResult1.atZone(ZoneId.of("UTC")).toInstant()));
        kindDBItem1.setEltern(new ArrayList<>());
        kindDBItem1.setFirstName("Jane");
        kindDBItem1.setGroupId("42");
        kindDBItem1.setId("42");
        kindDBItem1.setKitaId("42");
        kindDBItem1.setLastName("Doe");
        groupDBItem.removeKind(kindDBItem1);
        assertEquals(1, groupDBItem.getKinder().size());
    }
}

