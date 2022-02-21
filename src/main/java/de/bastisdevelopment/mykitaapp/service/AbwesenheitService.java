package de.bastisdevelopment.mykitaapp.service;

import de.bastisdevelopment.mykitaapp.dtos.AbwesenheitDTO;
import de.bastisdevelopment.mykitaapp.items.AbwesenheitDBItem;
import de.bastisdevelopment.mykitaapp.repository.AbwesenheitRepository;
import org.springframework.stereotype.Service;

@Service
public class AbwesenheitService {

    private final AbwesenheitRepository abwesenheitRepository;

    public AbwesenheitService(AbwesenheitRepository abwesenheitRepository) {
        this.abwesenheitRepository = abwesenheitRepository;
    }

    public void add(AbwesenheitDTO abwesenheit) {
        if (this.abwesenheitRepository.findByKitaIdAndKindIdAndAbwesendVonAndAbwesendBis(abwesenheit.getKitaId(), abwesenheit.getKindId(), abwesenheit.getAbwesendVon() , abwesenheit.getAbwesendBis()).isPresent()) {
            throw new IllegalStateException(String.format("Abwesenheit bereits eingetragen"));
        }
        this.abwesenheitRepository.save(new AbwesenheitDBItem(abwesenheit));
    }
}
