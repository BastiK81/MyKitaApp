package de.bastisdevelopment.mykitaapp.items;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;

class UserNotificationDBItemTest {
    @Test
    void testCanEqual() {
        assertFalse((new UserNotificationDBItem()).canEqual("Other"));
    }

    @Test
    void testCanEqual2() {
        UserNotificationDBItem userNotificationDBItem = new UserNotificationDBItem();

        UserNotificationDBItem userNotificationDBItem1 = new UserNotificationDBItem();
        userNotificationDBItem1.setCreatedAt("Jan 1, 2020 8:00am GMT+0100");
        userNotificationDBItem1.setDescription("The characteristics of someone or something");
        userNotificationDBItem1.setId("42");
        userNotificationDBItem1.setTitle("Dr");
        userNotificationDBItem1.setType("Type");
        userNotificationDBItem1.setUnRead(true);
        assertTrue(userNotificationDBItem.canEqual(userNotificationDBItem1));
    }

    @Test
    void testConstructor() {
        UserNotificationDBItem actualUserNotificationDBItem = new UserNotificationDBItem();
        actualUserNotificationDBItem.setCreatedAt("Jan 1, 2020 8:00am GMT+0100");
        actualUserNotificationDBItem.setDescription("The characteristics of someone or something");
        actualUserNotificationDBItem.setId("42");
        actualUserNotificationDBItem.setTitle("Dr");
        actualUserNotificationDBItem.setType("Type");
        actualUserNotificationDBItem.setUnRead(true);
        assertEquals("Jan 1, 2020 8:00am GMT+0100", actualUserNotificationDBItem.getCreatedAt());
        assertEquals("The characteristics of someone or something", actualUserNotificationDBItem.getDescription());
        assertEquals("42", actualUserNotificationDBItem.getId());
        assertEquals("Dr", actualUserNotificationDBItem.getTitle());
        assertEquals("Type", actualUserNotificationDBItem.getType());
        assertTrue(actualUserNotificationDBItem.isUnRead());
        assertEquals(
                "UserNotificationDBItem(id=42, title=Dr, description=The characteristics of someone or something,"
                        + " type=Type, createdAt=Jan 1, 2020 8:00am GMT+0100, isUnRead=true)",
                actualUserNotificationDBItem.toString());
    }

    @Test
    void testEquals() {
        UserNotificationDBItem userNotificationDBItem = new UserNotificationDBItem();
        userNotificationDBItem.setCreatedAt("Jan 1, 2020 8:00am GMT+0100");
        userNotificationDBItem.setDescription("The characteristics of someone or something");
        userNotificationDBItem.setId("42");
        userNotificationDBItem.setTitle("Dr");
        userNotificationDBItem.setType("Type");
        userNotificationDBItem.setUnRead(true);
        assertFalse(userNotificationDBItem.equals(null));
    }

    @Test
    void testEquals2() {
        UserNotificationDBItem userNotificationDBItem = new UserNotificationDBItem();
        userNotificationDBItem.setCreatedAt("Jan 1, 2020 8:00am GMT+0100");
        userNotificationDBItem.setDescription("The characteristics of someone or something");
        userNotificationDBItem.setId("42");
        userNotificationDBItem.setTitle("Dr");
        userNotificationDBItem.setType("Type");
        userNotificationDBItem.setUnRead(true);
        assertFalse(userNotificationDBItem.equals("Different type to UserNotificationDBItem"));
    }

    @Test
    void testEquals3() {
        UserNotificationDBItem userNotificationDBItem = new UserNotificationDBItem();
        userNotificationDBItem.setCreatedAt("Jan 1, 2020 8:00am GMT+0100");
        userNotificationDBItem.setDescription("The characteristics of someone or something");
        userNotificationDBItem.setId("42");
        userNotificationDBItem.setTitle("Dr");
        userNotificationDBItem.setType("Type");
        userNotificationDBItem.setUnRead(true);
        assertTrue(userNotificationDBItem.equals(userNotificationDBItem));
        int expectedHashCodeResult = userNotificationDBItem.hashCode();
        assertEquals(expectedHashCodeResult, userNotificationDBItem.hashCode());
    }

    @Test
    void testEquals4() {
        UserNotificationDBItem userNotificationDBItem = new UserNotificationDBItem();
        userNotificationDBItem.setCreatedAt("Jan 1, 2020 8:00am GMT+0100");
        userNotificationDBItem.setDescription("The characteristics of someone or something");
        userNotificationDBItem.setId("42");
        userNotificationDBItem.setTitle("Dr");
        userNotificationDBItem.setType("Type");
        userNotificationDBItem.setUnRead(true);

        UserNotificationDBItem userNotificationDBItem1 = new UserNotificationDBItem();
        userNotificationDBItem1.setCreatedAt("Jan 1, 2020 8:00am GMT+0100");
        userNotificationDBItem1.setDescription("The characteristics of someone or something");
        userNotificationDBItem1.setId("42");
        userNotificationDBItem1.setTitle("Dr");
        userNotificationDBItem1.setType("Type");
        userNotificationDBItem1.setUnRead(true);
        assertTrue(userNotificationDBItem.equals(userNotificationDBItem1));
        int expectedHashCodeResult = userNotificationDBItem.hashCode();
        assertEquals(expectedHashCodeResult, userNotificationDBItem1.hashCode());
    }

    @Test
    void testEquals5() {
        UserNotificationDBItem userNotificationDBItem = new UserNotificationDBItem();
        userNotificationDBItem.setCreatedAt("42");
        userNotificationDBItem.setDescription("The characteristics of someone or something");
        userNotificationDBItem.setId("42");
        userNotificationDBItem.setTitle("Dr");
        userNotificationDBItem.setType("Type");
        userNotificationDBItem.setUnRead(true);

        UserNotificationDBItem userNotificationDBItem1 = new UserNotificationDBItem();
        userNotificationDBItem1.setCreatedAt("Jan 1, 2020 8:00am GMT+0100");
        userNotificationDBItem1.setDescription("The characteristics of someone or something");
        userNotificationDBItem1.setId("42");
        userNotificationDBItem1.setTitle("Dr");
        userNotificationDBItem1.setType("Type");
        userNotificationDBItem1.setUnRead(true);
        assertFalse(userNotificationDBItem.equals(userNotificationDBItem1));
    }

    @Test
    void testEquals6() {
        UserNotificationDBItem userNotificationDBItem = new UserNotificationDBItem();
        userNotificationDBItem.setCreatedAt(null);
        userNotificationDBItem.setDescription("The characteristics of someone or something");
        userNotificationDBItem.setId("42");
        userNotificationDBItem.setTitle("Dr");
        userNotificationDBItem.setType("Type");
        userNotificationDBItem.setUnRead(true);

        UserNotificationDBItem userNotificationDBItem1 = new UserNotificationDBItem();
        userNotificationDBItem1.setCreatedAt("Jan 1, 2020 8:00am GMT+0100");
        userNotificationDBItem1.setDescription("The characteristics of someone or something");
        userNotificationDBItem1.setId("42");
        userNotificationDBItem1.setTitle("Dr");
        userNotificationDBItem1.setType("Type");
        userNotificationDBItem1.setUnRead(true);
        assertFalse(userNotificationDBItem.equals(userNotificationDBItem1));
    }

    @Test
    void testEquals7() {
        UserNotificationDBItem userNotificationDBItem = new UserNotificationDBItem();
        userNotificationDBItem.setCreatedAt("Jan 1, 2020 8:00am GMT+0100");
        userNotificationDBItem.setDescription("42");
        userNotificationDBItem.setId("42");
        userNotificationDBItem.setTitle("Dr");
        userNotificationDBItem.setType("Type");
        userNotificationDBItem.setUnRead(true);

        UserNotificationDBItem userNotificationDBItem1 = new UserNotificationDBItem();
        userNotificationDBItem1.setCreatedAt("Jan 1, 2020 8:00am GMT+0100");
        userNotificationDBItem1.setDescription("The characteristics of someone or something");
        userNotificationDBItem1.setId("42");
        userNotificationDBItem1.setTitle("Dr");
        userNotificationDBItem1.setType("Type");
        userNotificationDBItem1.setUnRead(true);
        assertFalse(userNotificationDBItem.equals(userNotificationDBItem1));
    }

    @Test
    void testEquals8() {
        UserNotificationDBItem userNotificationDBItem = new UserNotificationDBItem();
        userNotificationDBItem.setCreatedAt("Jan 1, 2020 8:00am GMT+0100");
        userNotificationDBItem.setDescription(null);
        userNotificationDBItem.setId("42");
        userNotificationDBItem.setTitle("Dr");
        userNotificationDBItem.setType("Type");
        userNotificationDBItem.setUnRead(true);

        UserNotificationDBItem userNotificationDBItem1 = new UserNotificationDBItem();
        userNotificationDBItem1.setCreatedAt("Jan 1, 2020 8:00am GMT+0100");
        userNotificationDBItem1.setDescription("The characteristics of someone or something");
        userNotificationDBItem1.setId("42");
        userNotificationDBItem1.setTitle("Dr");
        userNotificationDBItem1.setType("Type");
        userNotificationDBItem1.setUnRead(true);
        assertFalse(userNotificationDBItem.equals(userNotificationDBItem1));
    }

    @Test
    void testEquals9() {
        UserNotificationDBItem userNotificationDBItem = new UserNotificationDBItem();
        userNotificationDBItem.setCreatedAt("Jan 1, 2020 8:00am GMT+0100");
        userNotificationDBItem.setDescription("The characteristics of someone or something");
        userNotificationDBItem.setId("Dr");
        userNotificationDBItem.setTitle("Dr");
        userNotificationDBItem.setType("Type");
        userNotificationDBItem.setUnRead(true);

        UserNotificationDBItem userNotificationDBItem1 = new UserNotificationDBItem();
        userNotificationDBItem1.setCreatedAt("Jan 1, 2020 8:00am GMT+0100");
        userNotificationDBItem1.setDescription("The characteristics of someone or something");
        userNotificationDBItem1.setId("42");
        userNotificationDBItem1.setTitle("Dr");
        userNotificationDBItem1.setType("Type");
        userNotificationDBItem1.setUnRead(true);
        assertFalse(userNotificationDBItem.equals(userNotificationDBItem1));
    }

    @Test
    void testEquals10() {
        UserNotificationDBItem userNotificationDBItem = new UserNotificationDBItem();
        userNotificationDBItem.setCreatedAt("Jan 1, 2020 8:00am GMT+0100");
        userNotificationDBItem.setDescription("The characteristics of someone or something");
        userNotificationDBItem.setId(null);
        userNotificationDBItem.setTitle("Dr");
        userNotificationDBItem.setType("Type");
        userNotificationDBItem.setUnRead(true);

        UserNotificationDBItem userNotificationDBItem1 = new UserNotificationDBItem();
        userNotificationDBItem1.setCreatedAt("Jan 1, 2020 8:00am GMT+0100");
        userNotificationDBItem1.setDescription("The characteristics of someone or something");
        userNotificationDBItem1.setId("42");
        userNotificationDBItem1.setTitle("Dr");
        userNotificationDBItem1.setType("Type");
        userNotificationDBItem1.setUnRead(true);
        assertFalse(userNotificationDBItem.equals(userNotificationDBItem1));
    }

    @Test
    void testEquals11() {
        UserNotificationDBItem userNotificationDBItem = new UserNotificationDBItem();
        userNotificationDBItem.setCreatedAt("Jan 1, 2020 8:00am GMT+0100");
        userNotificationDBItem.setDescription("The characteristics of someone or something");
        userNotificationDBItem.setId("42");
        userNotificationDBItem.setTitle("42");
        userNotificationDBItem.setType("Type");
        userNotificationDBItem.setUnRead(true);

        UserNotificationDBItem userNotificationDBItem1 = new UserNotificationDBItem();
        userNotificationDBItem1.setCreatedAt("Jan 1, 2020 8:00am GMT+0100");
        userNotificationDBItem1.setDescription("The characteristics of someone or something");
        userNotificationDBItem1.setId("42");
        userNotificationDBItem1.setTitle("Dr");
        userNotificationDBItem1.setType("Type");
        userNotificationDBItem1.setUnRead(true);
        assertFalse(userNotificationDBItem.equals(userNotificationDBItem1));
    }

    @Test
    void testEquals12() {
        UserNotificationDBItem userNotificationDBItem = new UserNotificationDBItem();
        userNotificationDBItem.setCreatedAt("Jan 1, 2020 8:00am GMT+0100");
        userNotificationDBItem.setDescription("The characteristics of someone or something");
        userNotificationDBItem.setId("42");
        userNotificationDBItem.setTitle(null);
        userNotificationDBItem.setType("Type");
        userNotificationDBItem.setUnRead(true);

        UserNotificationDBItem userNotificationDBItem1 = new UserNotificationDBItem();
        userNotificationDBItem1.setCreatedAt("Jan 1, 2020 8:00am GMT+0100");
        userNotificationDBItem1.setDescription("The characteristics of someone or something");
        userNotificationDBItem1.setId("42");
        userNotificationDBItem1.setTitle("Dr");
        userNotificationDBItem1.setType("Type");
        userNotificationDBItem1.setUnRead(true);
        assertFalse(userNotificationDBItem.equals(userNotificationDBItem1));
    }

    @Test
    void testEquals13() {
        UserNotificationDBItem userNotificationDBItem = new UserNotificationDBItem();
        userNotificationDBItem.setCreatedAt("Jan 1, 2020 8:00am GMT+0100");
        userNotificationDBItem.setDescription("The characteristics of someone or something");
        userNotificationDBItem.setId("42");
        userNotificationDBItem.setTitle("Dr");
        userNotificationDBItem.setType("42");
        userNotificationDBItem.setUnRead(true);

        UserNotificationDBItem userNotificationDBItem1 = new UserNotificationDBItem();
        userNotificationDBItem1.setCreatedAt("Jan 1, 2020 8:00am GMT+0100");
        userNotificationDBItem1.setDescription("The characteristics of someone or something");
        userNotificationDBItem1.setId("42");
        userNotificationDBItem1.setTitle("Dr");
        userNotificationDBItem1.setType("Type");
        userNotificationDBItem1.setUnRead(true);
        assertFalse(userNotificationDBItem.equals(userNotificationDBItem1));
    }

    @Test
    void testEquals14() {
        UserNotificationDBItem userNotificationDBItem = new UserNotificationDBItem();
        userNotificationDBItem.setCreatedAt("Jan 1, 2020 8:00am GMT+0100");
        userNotificationDBItem.setDescription("The characteristics of someone or something");
        userNotificationDBItem.setId("42");
        userNotificationDBItem.setTitle("Dr");
        userNotificationDBItem.setType(null);
        userNotificationDBItem.setUnRead(true);

        UserNotificationDBItem userNotificationDBItem1 = new UserNotificationDBItem();
        userNotificationDBItem1.setCreatedAt("Jan 1, 2020 8:00am GMT+0100");
        userNotificationDBItem1.setDescription("The characteristics of someone or something");
        userNotificationDBItem1.setId("42");
        userNotificationDBItem1.setTitle("Dr");
        userNotificationDBItem1.setType("Type");
        userNotificationDBItem1.setUnRead(true);
        assertFalse(userNotificationDBItem.equals(userNotificationDBItem1));
    }

    @Test
    void testEquals15() {
        UserNotificationDBItem userNotificationDBItem = new UserNotificationDBItem();
        userNotificationDBItem.setCreatedAt("Jan 1, 2020 8:00am GMT+0100");
        userNotificationDBItem.setDescription("The characteristics of someone or something");
        userNotificationDBItem.setId("42");
        userNotificationDBItem.setTitle("Dr");
        userNotificationDBItem.setType("Type");
        userNotificationDBItem.setUnRead(false);

        UserNotificationDBItem userNotificationDBItem1 = new UserNotificationDBItem();
        userNotificationDBItem1.setCreatedAt("Jan 1, 2020 8:00am GMT+0100");
        userNotificationDBItem1.setDescription("The characteristics of someone or something");
        userNotificationDBItem1.setId("42");
        userNotificationDBItem1.setTitle("Dr");
        userNotificationDBItem1.setType("Type");
        userNotificationDBItem1.setUnRead(true);
        assertFalse(userNotificationDBItem.equals(userNotificationDBItem1));
    }

    @Test
    void testEquals16() {
        UserNotificationDBItem userNotificationDBItem = new UserNotificationDBItem();
        userNotificationDBItem.setCreatedAt(null);
        userNotificationDBItem.setDescription("The characteristics of someone or something");
        userNotificationDBItem.setId("42");
        userNotificationDBItem.setTitle("Dr");
        userNotificationDBItem.setType("Type");
        userNotificationDBItem.setUnRead(true);

        UserNotificationDBItem userNotificationDBItem1 = new UserNotificationDBItem();
        userNotificationDBItem1.setCreatedAt(null);
        userNotificationDBItem1.setDescription("The characteristics of someone or something");
        userNotificationDBItem1.setId("42");
        userNotificationDBItem1.setTitle("Dr");
        userNotificationDBItem1.setType("Type");
        userNotificationDBItem1.setUnRead(true);
        assertTrue(userNotificationDBItem.equals(userNotificationDBItem1));
        int expectedHashCodeResult = userNotificationDBItem.hashCode();
        assertEquals(expectedHashCodeResult, userNotificationDBItem1.hashCode());
    }

    @Test
    void testEquals17() {
        UserNotificationDBItem userNotificationDBItem = new UserNotificationDBItem();
        userNotificationDBItem.setCreatedAt("Jan 1, 2020 8:00am GMT+0100");
        userNotificationDBItem.setDescription(null);
        userNotificationDBItem.setId("42");
        userNotificationDBItem.setTitle("Dr");
        userNotificationDBItem.setType("Type");
        userNotificationDBItem.setUnRead(true);

        UserNotificationDBItem userNotificationDBItem1 = new UserNotificationDBItem();
        userNotificationDBItem1.setCreatedAt("Jan 1, 2020 8:00am GMT+0100");
        userNotificationDBItem1.setDescription(null);
        userNotificationDBItem1.setId("42");
        userNotificationDBItem1.setTitle("Dr");
        userNotificationDBItem1.setType("Type");
        userNotificationDBItem1.setUnRead(true);
        assertTrue(userNotificationDBItem.equals(userNotificationDBItem1));
        int expectedHashCodeResult = userNotificationDBItem.hashCode();
        assertEquals(expectedHashCodeResult, userNotificationDBItem1.hashCode());
    }

    @Test
    void testEquals18() {
        UserNotificationDBItem userNotificationDBItem = new UserNotificationDBItem();
        userNotificationDBItem.setCreatedAt("Jan 1, 2020 8:00am GMT+0100");
        userNotificationDBItem.setDescription("The characteristics of someone or something");
        userNotificationDBItem.setId(null);
        userNotificationDBItem.setTitle("Dr");
        userNotificationDBItem.setType("Type");
        userNotificationDBItem.setUnRead(true);

        UserNotificationDBItem userNotificationDBItem1 = new UserNotificationDBItem();
        userNotificationDBItem1.setCreatedAt("Jan 1, 2020 8:00am GMT+0100");
        userNotificationDBItem1.setDescription("The characteristics of someone or something");
        userNotificationDBItem1.setId(null);
        userNotificationDBItem1.setTitle("Dr");
        userNotificationDBItem1.setType("Type");
        userNotificationDBItem1.setUnRead(true);
        assertTrue(userNotificationDBItem.equals(userNotificationDBItem1));
        int expectedHashCodeResult = userNotificationDBItem.hashCode();
        assertEquals(expectedHashCodeResult, userNotificationDBItem1.hashCode());
    }

    @Test
    void testEquals19() {
        UserNotificationDBItem userNotificationDBItem = new UserNotificationDBItem();
        userNotificationDBItem.setCreatedAt("Jan 1, 2020 8:00am GMT+0100");
        userNotificationDBItem.setDescription("The characteristics of someone or something");
        userNotificationDBItem.setId("42");
        userNotificationDBItem.setTitle(null);
        userNotificationDBItem.setType("Type");
        userNotificationDBItem.setUnRead(true);

        UserNotificationDBItem userNotificationDBItem1 = new UserNotificationDBItem();
        userNotificationDBItem1.setCreatedAt("Jan 1, 2020 8:00am GMT+0100");
        userNotificationDBItem1.setDescription("The characteristics of someone or something");
        userNotificationDBItem1.setId("42");
        userNotificationDBItem1.setTitle(null);
        userNotificationDBItem1.setType("Type");
        userNotificationDBItem1.setUnRead(true);
        assertTrue(userNotificationDBItem.equals(userNotificationDBItem1));
        int expectedHashCodeResult = userNotificationDBItem.hashCode();
        assertEquals(expectedHashCodeResult, userNotificationDBItem1.hashCode());
    }
}

