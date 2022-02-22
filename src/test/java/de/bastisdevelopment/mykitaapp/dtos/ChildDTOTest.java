package de.bastisdevelopment.mykitaapp.dtos;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertTrue;

import de.bastisdevelopment.mykitaapp.items.KindDBItem;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.junit.jupiter.api.Test;

class ChildDTOTest {
    @Test
    void testConstructor() {
        ChildDTO actualChildDTO = new ChildDTO();
        assertNull(actualChildDTO.getDateOfBirth());
        assertEquals("ChildDTO(id=null, firstName=null, lastName=null, dateOfBirth=null, eltern=null, kitaId=null,"
                + " groupId=null)", actualChildDTO.toString());
        assertNull(actualChildDTO.getLastName());
        assertNull(actualChildDTO.getKitaId());
        assertNull(actualChildDTO.getId());
        assertNull(actualChildDTO.getGroupId());
        assertNull(actualChildDTO.getFirstName());
        assertNull(actualChildDTO.getEltern());
    }

    @Test
    void testConstructor2() {
        LocalDateTime atStartOfDayResult = LocalDate.of(1970, 1, 1).atStartOfDay();
        Date fromResult = Date.from(atStartOfDayResult.atZone(ZoneId.of("UTC")).toInstant());
        ArrayList<AppUserDTO> appUserDTOList = new ArrayList<>();
        ChildDTO actualChildDTO = new ChildDTO("42", "Jane", "Doe", fromResult, appUserDTOList, "42", "42");

        assertSame(fromResult, actualChildDTO.getDateOfBirth());
        assertEquals("Doe", actualChildDTO.getLastName());
        assertEquals("42", actualChildDTO.getKitaId());
        assertEquals("42", actualChildDTO.getId());
        assertEquals("42", actualChildDTO.getGroupId());
        assertEquals("Jane", actualChildDTO.getFirstName());
        List<AppUserDTO> eltern = actualChildDTO.getEltern();
        assertSame(appUserDTOList, eltern);
        assertTrue(eltern.isEmpty());
        assertSame(eltern, appUserDTOList);
    }

    @Test
    void testConstructor3() {
        LocalDateTime atStartOfDayResult = LocalDate.of(1970, 1, 1).atStartOfDay();
        Date fromResult = Date.from(atStartOfDayResult.atZone(ZoneId.of("UTC")).toInstant());
        ArrayList<AppUserDTO> appUserDTOList = new ArrayList<>();
        ChildDTO actualChildDTO = new ChildDTO("Jane", "Doe", fromResult, appUserDTOList, "42", "42");

        assertSame(fromResult, actualChildDTO.getDateOfBirth());
        assertEquals("Doe", actualChildDTO.getLastName());
        assertEquals("42", actualChildDTO.getKitaId());
        assertNull(actualChildDTO.getId());
        assertEquals("42", actualChildDTO.getGroupId());
        assertEquals("Jane", actualChildDTO.getFirstName());
        List<AppUserDTO> eltern = actualChildDTO.getEltern();
        assertSame(appUserDTOList, eltern);
        assertTrue(eltern.isEmpty());
        assertSame(eltern, appUserDTOList);
    }

    @Test
    void testConstructor4() {
        KindDBItem kindDBItem = new KindDBItem();
        LocalDateTime atStartOfDayResult = LocalDate.of(1970, 1, 1).atStartOfDay();
        Date fromResult = Date.from(atStartOfDayResult.atZone(ZoneId.of("UTC")).toInstant());
        kindDBItem.setDateOfBirth(fromResult);
        kindDBItem.setEltern(new ArrayList<>());
        kindDBItem.setFirstName("Jane");
        kindDBItem.setGroupId("42");
        kindDBItem.setId("42");
        kindDBItem.setKitaId("42");
        kindDBItem.setLastName("Doe");
        ChildDTO actualChildDTO = new ChildDTO(kindDBItem);
        assertSame(fromResult, actualChildDTO.getDateOfBirth());
        assertEquals("Doe", actualChildDTO.getLastName());
        assertEquals("42", actualChildDTO.getKitaId());
        assertEquals("42", actualChildDTO.getId());
        assertEquals("42", actualChildDTO.getGroupId());
        assertEquals("Jane", actualChildDTO.getFirstName());
        assertTrue(actualChildDTO.getEltern().isEmpty());
    }
}

