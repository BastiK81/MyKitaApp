package de.bastisdevelopment.mykitaapp.items;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertSame;

import de.bastisdevelopment.mykitaapp.dtos.AbwesenheitDTO;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

import org.junit.jupiter.api.Test;

class AbwesenheitDBItemTest {
    @Test
    void testConstructor() {
        AbwesenheitDTO abwesenheitDTO = new AbwesenheitDTO();
        LocalDateTime atStartOfDayResult = LocalDate.of(1970, 1, 1).atStartOfDay();
        Date fromResult = Date.from(atStartOfDayResult.atZone(ZoneId.of("UTC")).toInstant());
        abwesenheitDTO.setAbwesendBis(fromResult);
        LocalDateTime atStartOfDayResult1 = LocalDate.of(1970, 1, 1).atStartOfDay();
        Date fromResult1 = Date.from(atStartOfDayResult1.atZone(ZoneId.of("UTC")).toInstant());
        abwesenheitDTO.setAbwesendVon(fromResult1);
        abwesenheitDTO.setId("42");
        abwesenheitDTO.setKindId("42");
        abwesenheitDTO.setKitaId("42");
        AbwesenheitDBItem actualAbwesenheitDBItem = new AbwesenheitDBItem(abwesenheitDTO);
        assertSame(fromResult, actualAbwesenheitDBItem.getAbwesendBis());
        assertEquals("42", actualAbwesenheitDBItem.getKitaId());
        assertEquals("42", actualAbwesenheitDBItem.getKindId());
        assertSame(fromResult1, actualAbwesenheitDBItem.getAbwesendVon());
    }
}

