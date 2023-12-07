package hu.unideb.inf.controller;

import hu.unideb.inf.model.Owner;
import hu.unideb.inf.repository.OwnerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class OwnerController {

    @Autowired
    OwnerRepository ownerRepository;

    @GetMapping("/owners")
    public ResponseEntity<List<Owner>> getAllOwners(@RequestParam(required = false) String name) {
        List<Owner> owners = new ArrayList<>();

        if (name == null)
            ownerRepository.findAll().forEach(owners::add);
        else
            ownerRepository.findByNameContaining(name).forEach(owners::add);

        if (owners.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(owners, HttpStatus.OK);
    }

    @GetMapping("/owners/{id}")
    public ResponseEntity<Owner> getOwnerById(@PathVariable("id") long id) {
        Optional<Owner> ownerData = ownerRepository.findById(id);

        if (ownerData.isPresent()) {
            return new ResponseEntity<>(ownerData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/owners")
    public ResponseEntity<Owner> createOwner(@RequestBody Owner owner) {
        Owner _owner = ownerRepository.save(new Owner(owner.getName(), owner.getEmail(), owner.getPhoneNumber()));
        return new ResponseEntity<>(_owner, HttpStatus.CREATED);
    }

    @PutMapping("/owners/{id}")
    public ResponseEntity<Owner> updateOwner(@PathVariable("id") long id, @RequestBody Owner owner) {
        Optional<Owner> ownerData = ownerRepository.findById(id);

        if (ownerData.isPresent()) {
            Owner _owner = ownerData.get();
            _owner.setName(owner.getName());
            _owner.setEmail(owner.getEmail());
            _owner.setPhoneNumber(owner.getPhoneNumber());
            return new ResponseEntity<>(ownerRepository.save(_owner), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/owners/{id}")
    public ResponseEntity<HttpStatus> deleteOwner(@PathVariable("id") long id) {
        ownerRepository.deleteById(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/owners")
    public ResponseEntity<HttpStatus> deleteAllOwners() {
        ownerRepository.deleteAll();

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
