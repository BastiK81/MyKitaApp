package de.bastisdevelopment.mykitaapp.repository;

import de.bastisdevelopment.mykitaapp.items.GroupDBItem;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface KitaGroupRepository extends MongoRepository<GroupDBItem, String> {

    Optional<GroupDBItem> findByNameAndKitaId(String name, String kitaId);

    List<GroupDBItem> findByKitaId(String kitaId);


}
