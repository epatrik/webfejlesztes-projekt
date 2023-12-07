package hu.unideb.inf.repository;

import hu.unideb.inf.model.Owner;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OwnerRepository extends JpaRepository<Owner, Long> {
    List<Owner> findByNameContaining(String name);
}
