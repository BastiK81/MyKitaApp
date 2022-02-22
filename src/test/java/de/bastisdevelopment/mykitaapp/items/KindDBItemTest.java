package de.bastisdevelopment.mykitaapp.items;

import static org.junit.jupiter.api.Assertions.assertNull;

import de.bastisdevelopment.mykitaapp.dtos.ChildDTO;
import org.junit.jupiter.api.Test;

class KindDBItemTest {
    @Test
    void testConstructor() {
        KindDBItem actualKindDBItem = new KindDBItem(new ChildDTO());
        assertNull(actualKindDBItem.getDateOfBirth());
        assertNull(actualKindDBItem.getLastName());
        assertNull(actualKindDBItem.getKitaId());
        assertNull(actualKindDBItem.getGroupId());
        assertNull(actualKindDBItem.getFirstName());
        assertNull(actualKindDBItem.getEltern());
    }

    @Test
    void testUpdate() {
        KindDBItem kindDBItem = new KindDBItem();
        kindDBItem.update(new ChildDTO());
        assertNull(kindDBItem.getDateOfBirth());
        assertNull(kindDBItem.getLastName());
        assertNull(kindDBItem.getGroupId());
        assertNull(kindDBItem.getFirstName());
        assertNull(kindDBItem.getEltern());
    }
}

