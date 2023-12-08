import { Component } from '@angular/core';
import { Owner } from 'src/app/models/owner.model';
import { OwnerService } from 'src/app/services/owner.service';

@Component({
  selector: 'app-add-owner',
  templateUrl: './add-owner.component.html',
  styleUrls: ['./add-owner.component.css'],
})
export class AddOwnerComponent {
  owner: Owner = {
    name: '',
    email: '',
    phoneNumber: ''
  };
  submitted = false;

  constructor(private ownerService: OwnerService) {}

  saveOwner(): void {
    const data = {
      name: this.owner.name,
      email: this.owner.email,
      phoneNumber : this.owner.phoneNumber
    };

    this.ownerService.create(data).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => console.error(e)
    });
  }

  newOwner(): void {
    this.submitted = false;
    this.owner = {
      name: '',
      email: '',
      phoneNumber: ''
    };
  }
}
