import {Component, Input} from '@angular/core';
import {PetService} from "../../services/pet.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Pet} from "../../models/pet.model";
import {OwnerService} from "../../services/owner.service";
import {Owner} from "../../models/owner.model";

@Component({
  selector: 'app-pet-details',
  templateUrl: './pet-details.component.html',
  styleUrls: ['./pet-details.component.css']
})
export class PetDetailsComponent {
  @Input() viewMode = false;

  @Input() currentPet: Pet = {
    name: '',
    species: ''
  };

  @Input() currentOwner: Owner = {
    name: '',
    email: '',
    phoneNumber: ''
  };

  message = '';
  currentOwnerId: string | undefined;

  constructor(
    private petService: PetService,
    private ownerService: OwnerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getOwnerId(this.route.snapshot.params['id'])
      this.getOwner(this.currentOwnerId)
      this.getPet(this.route.snapshot.params['id']);
    }
  }

  getPet(id: string): void {
    this.petService.get(id).subscribe({
      next: (data) => {
        this.currentPet = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  getOwner(ownerId: string | undefined): void {
    this.ownerService.get(ownerId).subscribe({
      next: (data) => {
        this.currentOwner = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  getOwnerId(id: string): string {
    this.petService.getOwnerIdById(id).subscribe({
      next: (data) => {
        this.currentOwnerId = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
    return <string>this.currentOwnerId;
  }

  updatePet(): void {
    this.message = '';

    this.petService
      .update(this.currentPet.id, this.currentPet)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message
            ? res.message
            : 'Pet details updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deletePet(): void {
    this.petService.delete(this.currentPet.id).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate([`/owners/${this.currentOwnerId}/pets`]);
      },
      error: (e) => console.error(e)
    });
  }
}
