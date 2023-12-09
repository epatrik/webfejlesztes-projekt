import {Component, Input} from '@angular/core';
import { Pet } from 'src/app/models/pet.model';
import { PetService } from 'src/app/services/pet.service';
import {ActivatedRoute, Router} from "@angular/router";
import {OwnerService} from "../../services/owner.service";

@Component({
  selector: 'app-pets-list',
  templateUrl: './pets-list.component.html',
  styleUrls: ['./pets-list.component.css']
})
export class PetsListComponent {
  pets?: Pet[];
  currentPet: Pet = {};
  currentIndex = -1;
  currentOwnerId = this.route.snapshot.params['ownerId'];
  name = '';

  constructor(
    private petService: PetService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.retrievePetsOfOwner(this.currentOwnerId)
  }

  retrievePetsOfOwner(ownerId: string): void {
    this.petService.getAllOfOwner(ownerId).subscribe({
      next: (data) => {
        this.pets = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  refreshList(): void {
    this.retrievePetsOfOwner(this.currentOwnerId);
    this.currentPet = {};
    this.currentIndex = -1;
  }

  setActivePet(pet: Pet, index: number): void {
    this.currentPet = pet;
    this.currentIndex = index;
  }

  removeAllPetsOfOwner(): void {
    this.petService.deleteAllOfOwner(this.currentOwnerId).subscribe({
      next: (res) => {
        console.log(res);
        this.refreshList();
      },
      error: (e) => console.error(e)
    });
  }
}
