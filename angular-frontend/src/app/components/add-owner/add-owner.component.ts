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
  valid = true;

  constructor(private ownerService: OwnerService) {}

  saveOwner(): void {
    if (this.owner.email && this.isValidEmail(this.owner.email)
      && this.owner.phoneNumber && this.isValidPhoneNumber(this.owner.phoneNumber) && this.owner.name) {
      const data = {
        name: this.owner.name,
        email: this.owner.email,
        phoneNumber: this.owner.phoneNumber
      };

      this.ownerService.create(data).subscribe({
        next: (res) => {
          console.log(res);
          this.valid = true;
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
    }
    else {
      this.valid = false
    }
  }

  newOwner(): void {
    this.submitted = false;
    this.owner = {
      name: '',
      email: '',
      phoneNumber: ''
    };
  }

  isValidEmail(email: string): boolean {
    const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    return emailPattern.test(email);
  }

  isValidPhoneNumber(phoneNumber: string): boolean {
    const phoneNumberPattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return phoneNumberPattern.test(phoneNumber);
  }
}
