package de.bastisdevelopment.mykitaapp.service;

import de.bastisdevelopment.mykitaapp.dtos.AppUserDTO;
import de.bastisdevelopment.mykitaapp.dtos.KitaDTO;
import de.bastisdevelopment.mykitaapp.dtos.KitaUserConnectorDTO;
import de.bastisdevelopment.mykitaapp.dtos.UserNotificationDTO;
import de.bastisdevelopment.mykitaapp.items.KitaDBItem;
import de.bastisdevelopment.mykitaapp.items.KitaUserConnectorDBItem;
import de.bastisdevelopment.mykitaapp.repository.KitaUserConnectorRepository;
import de.bastisdevelopment.mykitaapp.utils.ConnectionStatus;
import de.bastisdevelopment.mykitaapp.utils.PlaySchoolVisibility;
import de.bastisdevelopment.mykitaapp.utils.UserVisibility;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class KitaUserConnectorService {

    private final KitaService kitaService;
    private final AppUserService userService;
    private final KitaUserConnectorRepository repository;

    public KitaUserConnectorService(KitaService kitaService, AppUserService userService, KitaUserConnectorRepository repository) {
        this.kitaService = kitaService;
        this.userService = userService;
        this.repository = repository;
    }

    public void addNew(KitaUserConnectorDTO connectorDTO) throws Exception {
        if (repository.findByKitaIdAndUserId(connectorDTO.getKitaId(), connectorDTO.getUserId()).isPresent()) {
            throw new Exception(String.format("Connection Kita ID: %s and User ID: %s already exist", connectorDTO.getKitaId(), connectorDTO.getUserId()));
        }
        repository.save(new KitaUserConnectorDBItem(connectorDTO));
    }

    public List<KitaUserConnectorDTO> getAllAccepted(String playSchoolId) {
        return repository.findByKitaId(playSchoolId).stream()
                .filter(dbItem -> dbItem.getKitaStatus().equals(ConnectionStatus.CONFIRMED) && dbItem.getUserStatus().equals(ConnectionStatus.CONFIRMED))
                .map(KitaUserConnectorDTO::new).toList();
    }

    public List<KitaUserConnectorDTO> getAllInProgress(String playSchoolId) {
        return repository.findByKitaId(playSchoolId).stream()
                .filter(dbItem -> dbItem.getKitaStatus().equals(ConnectionStatus.OPEN))
                .map(KitaUserConnectorDTO::new).toList();
    }


    public List<KitaUserConnectorDTO> getAllPending(String playSchoolId) {
        return repository.findByKitaId(playSchoolId).stream()
                .filter(dbItem -> dbItem.getUserStatus().equals(ConnectionStatus.OPEN)).toList().stream()
                .map(KitaUserConnectorDTO::new).toList();
    }

    public List<AppUserDTO> getAllConnectableUser(String playSchoolId) {
        List<KitaUserConnectorDBItem> connections = repository.findByKitaId(playSchoolId);
        Collection<UserVisibility> allowedVisibility = new ArrayList<>();
        allowedVisibility.add(UserVisibility.VISIBLE);
        allowedVisibility.add(UserVisibility.PLAYSCHOOLADMIN);
        allowedVisibility.add(UserVisibility.PLAYSCHOOL);
        allowedVisibility.add(UserVisibility.GROUP);
        return userService.getAllUser(allowedVisibility).stream().filter(appUserDTO -> connections.stream()
                .filter(kitaUserConnectorDTO -> kitaUserConnectorDTO.getUserId().equals(appUserDTO.getId())).toList().isEmpty()).toList();
    }

    public List<UserNotificationDTO> getAllOpenUserConnections(String id) {
        return repository.findByUserId(id).stream()
                .filter(dbItem -> dbItem.getUserStatus().equals(ConnectionStatus.OPEN)).toList()
                .stream().map(UserNotificationDTO::new).toList();
    }

    public List<KitaUserConnectorDTO> getAllAcceptedUser() {
        return repository.findByUserId(userService.getActualUser().getId()).stream()
                .filter(dbItem -> dbItem.getKitaStatus().equals(ConnectionStatus.CONFIRMED) && dbItem.getUserStatus().equals(ConnectionStatus.CONFIRMED))
                .map(KitaUserConnectorDTO::new).toList();
    }

    public List<KitaUserConnectorDTO> getAllInProgressUser() {
        return repository.findByUserId(userService.getActualUser().getId()).stream()
                .filter(dbItem -> dbItem.getUserStatus().equals(ConnectionStatus.OPEN))
                .map(KitaUserConnectorDTO::new).toList();
    }

    public List<KitaUserConnectorDTO> getAllPendingUser() {
        return repository.findByUserId(userService.getActualUser().getId()).stream()
                .filter(dbItem -> dbItem.getKitaStatus().equals(ConnectionStatus.OPEN))
                .map(KitaUserConnectorDTO::new).toList();
    }


    public List<KitaDTO> getAllKitas() {
        List<KitaUserConnectorDBItem> connections = repository.findByUserId(userService.getActualUser().getId()).stream().toList();
        return kitaService.getAllKitas(PlaySchoolVisibility.PUBLIC).stream()
                .filter(kitaDTO ->  connections.stream()
                        .filter(dbItem -> dbItem.getKitaId().equals(kitaDTO.getId())).toList().isEmpty()).toList();

    }
}
