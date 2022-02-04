package de.bastisdevelopment.mykitaapp.repository;

import de.bastisdevelopment.mykitaapp.items.KitaUserConnectorDBItem;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface KitaUserConnectorRepository extends MongoRepository<KitaUserConnectorDBItem, String> {

    Optional<KitaUserConnectorDBItem> findByKitaIdAndUserId(String kitaId, String userId);

    List<KitaUserConnectorDBItem> findByKitaId(String kitaId);

}
