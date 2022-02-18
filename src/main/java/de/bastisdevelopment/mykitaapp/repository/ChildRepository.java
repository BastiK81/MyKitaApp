package de.bastisdevelopment.mykitaapp.repository;

import de.bastisdevelopment.mykitaapp.items.KindDBItem;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface ChildRepository extends MongoRepository<KindDBItem, String> {

    Optional<KindDBItem> findByFirstNameAndLastNameAndDateOfBirth(String firstName, String lastName, Date dateOfBirth);

    List<KindDBItem> findByKitaId(String kitaId);

    List<KindDBItem> findAllByGroupId(String groupId);
}
