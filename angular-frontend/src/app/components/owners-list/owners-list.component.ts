import { Component, OnInit } from '@angular/core';
import { Owner } from 'src/app/models/owner.model';
import { OwnerService } from 'src/app/services/owner.service';

@Component({
  selector: 'app-owners-list',
  templateUrl: './owners-list.component.html',
  styleUrls: ['./owners-list.component.css'],
})
export class OwnersListComponent {
  owners?: Owner[];
  currentOwner: Owner = {};
  currentIndex = -1;
  name = '';

  constructor(private ownerService: OwnerService) {}

  ngOnInit(): void {
    this.retrieveOwners();
  }

  retrieveOwners(): void {
    this.ownerService.getAll().subscribe({
      next: (data) => {
        this.owners = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  refreshList(): void {
    this.retrieveOwners();
    this.currentOwner = {};
    this.currentIndex = -1;
  }

  setActiveOwner(owner: Owner, index: number): void {
    this.currentOwner = owner;
    this.currentIndex = index;
  }

  removeAllOwners(): void {
    this.ownerService.deleteAll().subscribe({
      next: (res) => {
        console.log(res);
        this.refreshList();
      },
      error: (e) => console.error(e)
    });
  }

  searchName(): void {
    this.currentOwner = {};
    this.currentIndex = -1;

    this.ownerService.findByName(this.name).subscribe({
      next: (data) => {
        this.owners = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }
}
