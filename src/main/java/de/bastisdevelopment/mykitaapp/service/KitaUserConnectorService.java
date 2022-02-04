package de.bastisdevelopment.mykitaapp.service;

import de.bastisdevelopment.mykitaapp.dtos.KitaUserConnectorDTO;
import de.bastisdevelopment.mykitaapp.items.KitaUserConnectorDBItem;
import de.bastisdevelopment.mykitaapp.repository.KitaUserConnectorRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class KitaUserConnectorService {

    private final KitaUserConnectorRepository repository;

    public KitaUserConnectorService(KitaUserConnectorRepository repository) {
        this.repository = repository;
    }

    public void addNewKitaUserConnection(KitaUserConnectorDTO connectorDTO) throws Exception {
        if (repository.findByKitaIdAndUserId(connectorDTO.getKitaId(), connectorDTO.getUserId()).isPresent()) {
            throw new Exception(String.format("Connection Kita ID: %s and User ID: %s already exist", connectorDTO.getKitaId(), connectorDTO.getUserId()));
        }
        repository.save(new KitaUserConnectorDBItem(connectorDTO));
    }

    public List<KitaUserConnectorDTO> getAllKitaUserConnections(String kitaId) {
        return repository.findByKitaId(kitaId).stream().map(dbItem -> new KitaUserConnectorDTO(dbItem)).collect(Collectors.toList());
    }
}
