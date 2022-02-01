package de.bastisdevelopment.mykitaapp.repository;

import de.bastisdevelopment.mykitaapp.items.KitaGroupDBItem;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface KitaGroupRepository extends MongoRepository<KitaGroupDBItem, String> {

    Optional<KitaGroupDBItem> findByNameAndKitaId(String name, String kitaId);

    List<KitaGroupDBItem> findByKitaId(String kitaId);


}
