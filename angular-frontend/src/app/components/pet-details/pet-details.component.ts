import {Component, Input} from '@angular/core';
import {PetService} from "../../services/pet.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Pet} from "../../models/pet.model";

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

  message = '';
  currentOwnerId: number | undefined;

  constructor(
    private petService: PetService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getOwnerId(this.route.snapshot.params['id'])
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

  getOwnerId(id: string): number {
    this.petService.getOwnerIdById(id).subscribe({
      next: (data) => {
        this.currentOwnerId = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
    return <number>this.currentOwnerId;
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
        this.router.navigate([`/owners/${this.getOwnerId(this.currentPet.id)}/pets`]);
      },
      error: (e) => console.error(e)
    });
  }
}
