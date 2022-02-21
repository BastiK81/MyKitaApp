package de.bastisdevelopment.mykitaapp.items;

import de.bastisdevelopment.mykitaapp.dtos.AbwesenheitDTO;
import lombok.Data;

import java.util.Date;

@Data
public class AbwesenheitDBItem {

    private String id;
    private String kindId;
    private String kitaId;
    private Date abwesendVon;
    private Date abwesendBis;

    public AbwesenheitDBItem(AbwesenheitDTO abwesenheit) {
        this.kindId = abwesenheit.getKindId();
        this.kitaId = abwesenheit.getKitaId();
        this.abwesendVon = abwesenheit.getAbwesendVon();
        this.abwesendBis = abwesenheit.getAbwesendBis();
    }
}
