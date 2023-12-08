package hu.unideb.inf.controller;

import hu.unideb.inf.model.Owner;
import hu.unideb.inf.model.Pet;
import hu.unideb.inf.repository.OwnerRepository;
import hu.unideb.inf.repository.PetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class PetController {

    @Autowired
    private OwnerRepository ownerRepository;

    @Autowired
    private PetRepository petRepository;

    @GetMapping("/owners/{ownerId}/pets")
    public ResponseEntity<List<Pet>> getAllPetsByOwnerId(@PathVariable("ownerId") long ownerId) {
        List<Pet> pets = petRepository.findByOwnerId(ownerId);

        if (ownerRepository.existsById(ownerId)) {
            return new ResponseEntity<>(pets, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/pets/{id}")
    public ResponseEntity<Pet> getPetById(@PathVariable("id") long id) {
        Optional<Pet> petData = petRepository.findById(id);

        if (petData.isPresent()) {
            return new ResponseEntity<>(petData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("pets/{id}/ownerId")
    public ResponseEntity<Long> getOwnerIdById(@PathVariable("id") long id) {
        Optional<Pet> petData = petRepository.findById(id);

        if (petData.isPresent()) {
            return new ResponseEntity<>(petData.get().getOwner().getId(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/owners/{ownerId}/pets")
    public ResponseEntity<Pet> createPet(@PathVariable("ownerId") long ownerId, @RequestBody Pet pet) {
        Optional<Owner> ownerData = ownerRepository.findById(ownerId);

        if (ownerData.isPresent()) {
            Optional<Pet> _pet = ownerData.map(owner -> {
                pet.setOwner(owner);
                return petRepository.save(pet);
            });
            return new ResponseEntity<>(_pet.get(), HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/pets/{id}")
    public ResponseEntity<Pet> updatePet(@PathVariable("id") long id, @RequestBody Pet pet) {
        Optional<Pet> petData = petRepository.findById(id);

        if (petData.isPresent()) {
            Pet _pet = petData.get();
            _pet.setName(pet.getName());
            _pet.setSpecies(pet.getSpecies());
            return new ResponseEntity<>(petRepository.save(_pet), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/pets/{id}")
    public ResponseEntity<Pet> deletePet(@PathVariable("id") long id) {
        petRepository.deleteById(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/owners/{ownerId}/pets")
    public ResponseEntity<Pet> deleteAllPetsOfOwner(@PathVariable("ownerId") long ownerId) {
        Optional<Owner> ownerData = ownerRepository.findById(ownerId);

        if (ownerData.isPresent()) {
            petRepository.deleteAllByOwnerId(ownerId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
