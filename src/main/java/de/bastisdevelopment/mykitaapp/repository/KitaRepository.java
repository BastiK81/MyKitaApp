package de.bastisdevelopment.mykitaapp.repository;

import de.bastisdevelopment.mykitaapp.items.KitaDBItem;
import de.bastisdevelopment.mykitaapp.utils.KitaVisibility;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface KitaRepository extends MongoRepository<KitaDBItem, String> {

    Optional<KitaDBItem> findByAdminId(String adminId);

    Optional<KitaDBItem> findByName(String name);

    List<KitaDBItem> findByVisibility(KitaVisibility visibility);
}
