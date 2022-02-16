package de.bastisdevelopment.mykitaapp.service;

import de.bastisdevelopment.mykitaapp.dtos.AppUserDTO;
import de.bastisdevelopment.mykitaapp.dtos.ConnectionDTO;
import de.bastisdevelopment.mykitaapp.dtos.KitaDTO;
import de.bastisdevelopment.mykitaapp.dtos.UserNotificationDTO;
import de.bastisdevelopment.mykitaapp.items.ConnectionDBItem;
import de.bastisdevelopment.mykitaapp.repository.ConnectionRepository;
import de.bastisdevelopment.mykitaapp.utils.ConnectionStatus;
import de.bastisdevelopment.mykitaapp.utils.KitaVisibility;
import de.bastisdevelopment.mykitaapp.utils.UserRole;
import de.bastisdevelopment.mykitaapp.utils.UserVisibility;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class ConnectionService {

    private final KitaService kitaService;
    private final AppUserService userService;
    private final ConnectionRepository repository;

    public ConnectionService(KitaService kitaService, AppUserService userService, ConnectionRepository repository) {
        this.kitaService = kitaService;
        this.userService = userService;
        this.repository = repository;
    }

    public void addNewKitaSide(ConnectionDTO dto) throws Exception {
        if (repository.findByKitaIdAndUserId(dto.getKitaId(), dto.getUserId()).isPresent()) {
            throw new Exception(String.format("Connection Kita ID: %s and User ID: %s already exist", dto.getKitaId(), dto.getUserId()));
        }
        repository.save(new ConnectionDBItem(dto));
    }

    public void addNewUserSide(ConnectionDTO dto) throws Exception {
        if (repository.findByKitaIdAndUserId(dto.getKitaId(), dto.getUserId()).isPresent()) {
            throw new Exception(String.format("Connection Kita ID: %s and User ID: %s already exist", dto.getKitaId(), dto.getUserId()));
        }
        ConnectionDBItem connectorDBItem = new ConnectionDBItem(dto);
        connectorDBItem.setUserStatus(ConnectionStatus.CONFIRMED);
        connectorDBItem.setKitaStatus(ConnectionStatus.OPEN);
        repository.save(connectorDBItem);
    }

    public List<ConnectionDTO> getAllAccepted(String playSchoolId) {
        return repository.findByKitaIdAndKitaStatusAndUserStatus(playSchoolId, ConnectionStatus.CONFIRMED, ConnectionStatus.CONFIRMED)
                .stream().map(ConnectionDTO::new).toList();
    }

    public List<ConnectionDTO> getAllInProgress(String playSchoolId) {
        return repository.findByKitaIdAndKitaStatus(playSchoolId, ConnectionStatus.OPEN).stream()
                .map(ConnectionDTO::new).toList();
    }


    public List<ConnectionDTO> getAllPending(String playSchoolId) {
        return repository.findByKitaIdAndUserStatus(playSchoolId, ConnectionStatus.OPEN).stream()
                .map(ConnectionDTO::new).toList();
    }

    public List<AppUserDTO> getAllConnectableUser(String playSchoolId) {
        List<ConnectionDBItem> connections = repository.findByKitaId(playSchoolId);
        Collection<UserVisibility> allowedVisibility = new ArrayList<>();
        allowedVisibility.add(UserVisibility.VISIBLE);
        allowedVisibility.add(UserVisibility.PLAYSCHOOLADMIN);
        allowedVisibility.add(UserVisibility.PLAYSCHOOL);
        allowedVisibility.add(UserVisibility.GROUP);
        return userService.getAllUser(allowedVisibility).stream().filter(appUserDTO -> connections.stream()
                .filter(kitaUserConnectorDTO -> kitaUserConnectorDTO.getUserId().equals(appUserDTO.getId())).toList().isEmpty()).toList();
    }

    public List<UserNotificationDTO> getAllOpenUserConnections(String id) {
        return repository.findByUserIdAndUserStatus(id, ConnectionStatus.OPEN).stream().map(UserNotificationDTO::new).toList();
    }

    public List<ConnectionDTO> getAllAcceptedUser() {
        return repository.findByUserIdAndKitaStatusAndUserStatus(userService.getActualUser().getId(), ConnectionStatus.CONFIRMED, ConnectionStatus.CONFIRMED)
                .stream().map(ConnectionDTO::new).toList();
    }

    public List<ConnectionDTO> getAllInProgressUser() {
        return repository.findByUserIdAndUserStatus(userService.getActualUser().getId(), ConnectionStatus.OPEN)
                .stream().map(ConnectionDTO::new).toList();
    }

    public List<ConnectionDTO> getAllPendingUser() {
        return repository.findByUserIdAndKitaStatus(userService.getActualUser().getId(), ConnectionStatus.OPEN)
                .stream().map(ConnectionDTO::new).toList();
    }

    public List<KitaDTO> getAllKitas() {
        List<ConnectionDBItem> connections = repository.findByUserId(userService.getActualUser().getId()).stream().toList();
        return kitaService.getAllKitas(KitaVisibility.PUBLIC).stream()
                .filter(kitaDTO -> connections.stream()
                        .filter(dbItem -> dbItem.getKitaId().equals(kitaDTO.getId())).toList().isEmpty()).toList().stream().toList();
    }

    public void changeConnection(String id, UserRole role) throws Exception {
        ConnectionDBItem item = repository.findById(id)
                .orElseThrow(() -> new Exception("Connection not found"));
        item.setUserRole(role);
        repository.save(item);
    }

    public void confirmConnection(String id) throws Exception {
        ConnectionDBItem item = repository.findById(id)
                .orElseThrow(() -> new Exception("Connection not found"));
        item.setKitaStatus(ConnectionStatus.CONFIRMED);
        item.setUserStatus(ConnectionStatus.CONFIRMED);
        repository.save(item);
    }

    public void deleteConnection(String id) {
        repository.deleteById(id);
    }
}
