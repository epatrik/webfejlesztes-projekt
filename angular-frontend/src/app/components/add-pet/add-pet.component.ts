import { Component } from '@angular/core';
import {Pet} from "../../models/pet.model";
import {PetService} from "../../services/pet.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.css']
})
export class AddPetComponent {
  pet: Pet = {
    name: '',
    species: ''
  };
  submitted = false;
  ownerId = this.route.snapshot.params['ownerId'];

  constructor(
    private petService: PetService,
    private route: ActivatedRoute
  ) {}

  savePet(): void {
    const data = {
      name: this.pet.name,
      species: this.pet.species
    };

    this.petService.create(this.ownerId, data).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => console.error(e)
    });
  }

  newPet(): void {
    this.submitted = false;
    this.pet = {
      name: '',
      species: ''
    };
  }
}
