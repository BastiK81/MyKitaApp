package de.bastisdevelopment.mykitaapp.items;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document("kitGroupItems")
public class KitaGroupDBItem {

    @Id
    private String id;
    @Indexed
    private String name;

}
