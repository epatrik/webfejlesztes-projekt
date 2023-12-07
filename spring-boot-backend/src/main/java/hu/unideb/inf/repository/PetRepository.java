package hu.unideb.inf.repository;

import hu.unideb.inf.model.Pet;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PetRepository extends JpaRepository<Pet, Long> {
    List<Pet> findByOwnerId(Long ownerId);

    @Transactional
    void deleteAllByOwnerId(Long ownerId);
}
