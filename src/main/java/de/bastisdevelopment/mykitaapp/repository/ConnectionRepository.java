package de.bastisdevelopment.mykitaapp.repository;

import de.bastisdevelopment.mykitaapp.items.ConnectionDBItem;
import de.bastisdevelopment.mykitaapp.utils.ConnectionStatus;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ConnectionRepository extends MongoRepository<ConnectionDBItem, String> {

    Optional<ConnectionDBItem> findByKitaIdAndUserId(String kitaId, String userId);

    List<ConnectionDBItem> findByKitaId(String kitaId);

    List<ConnectionDBItem> findByUserId(String id);

    List<ConnectionDBItem> findByUserIdAndKitaStatusAndUserStatus(String userId, ConnectionStatus kitaStatus, ConnectionStatus userStatus);

    List<ConnectionDBItem> findByUserIdAndUserStatus(String id, ConnectionStatus userStatus);

    List<ConnectionDBItem> findByUserIdAndKitaStatus(String id, ConnectionStatus kitaStatus);

    List<ConnectionDBItem> findByKitaIdAndUserStatus(String playSchoolId, ConnectionStatus userStatus);

    List<ConnectionDBItem> findByKitaIdAndKitaStatus(String playSchoolId, ConnectionStatus kitaStatus);

    List<ConnectionDBItem> findByKitaIdAndKitaStatusAndUserStatus(String playSchoolId, ConnectionStatus kitaStatus, ConnectionStatus userStatus);

}

