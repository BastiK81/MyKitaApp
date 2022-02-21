package de.bastisdevelopment.mykitaapp.repository;

import de.bastisdevelopment.mykitaapp.items.AbwesenheitDBItem;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Date;
import java.util.Optional;

public interface AbwesenheitRepository extends MongoRepository<AbwesenheitDBItem, String> {

    Optional <AbwesenheitDBItem> findByKitaIdAndKindIdAndAbwesendVonAndAbwesendBis(String kitaId, String kindId, Date abwesendVon, Date abwesendBis);
}
