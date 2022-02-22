package de.bastisdevelopment.mykitaapp.model;

import de.bastisdevelopment.mykitaapp.dtos.AbwesenheitDTO;
import de.bastisdevelopment.mykitaapp.dtos.AppUserDTO;
import de.bastisdevelopment.mykitaapp.dtos.ChildDTO;
import de.bastisdevelopment.mykitaapp.items.AbwesenheitDBItem;
import de.bastisdevelopment.mykitaapp.items.AppUserDBItem;
import de.bastisdevelopment.mykitaapp.items.KindDBItem;

import java.util.ArrayList;
import java.util.Date;

public class TestDataProvider {

    public static AppUserDBItem testUserDBItem(String email, String password) {
        AppUserDBItem userDBItem = new AppUserDBItem();
        userDBItem.setEmail(email);
        userDBItem.setPassword(password);
        return userDBItem;
    }

    public static KindDBItem testKindDBItem() {
        return new KindDBItem(new ChildDTO("firstName", "lastName", new Date(), new ArrayList<>(), "kitaId", "groupId"));
    }


}
