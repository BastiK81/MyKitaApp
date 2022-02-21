package de.bastisdevelopment.mykitaapp.dtos;

import lombok.Data;

import java.util.Date;

@Data
public class AbwesenheitDTO {

    private String id;
    private String kindId;
    private String kitaId;
    private Date abwesendVon;
    private Date abwesendBis;

}
