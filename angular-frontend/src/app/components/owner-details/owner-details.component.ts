import { Component, Input, OnInit } from '@angular/core';
import { OwnerService } from 'src/app/services/owner.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Owner } from 'src/app/models/owner.model';

@Component({
  selector: 'app-owner-details',
  templateUrl: './owner-details.component.html',
  styleUrls: ['./owner-details.component.css'],
})
export class OwnerDetailsComponent {
  @Input() viewMode = false;

  @Input() currentOwner: Owner = {
    name: '',
    email: '',
    phoneNumber: ''
  };

  message = '';

  constructor(
    private ownerService: OwnerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getOwner(this.route.snapshot.params['id']);
    }
  }

  getOwner(id: string): void {
    this.ownerService.get(id).subscribe({
      next: (data) => {
        this.currentOwner = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  /*updatePublished(status: boolean): void {
    const data = {
      name: this.currentOwner.name,
      email: this.currentOwner.email,
      published: status
    };

    this.message = '';

    this.ownerService.update(this.currentOwner.id, data).subscribe({
      next: (res) => {
        console.log(res);
        this.currentOwner.published = status;
        this.message = res.message
          ? res.message
          : 'The status was updated successfully!';
      },
      error: (e) => console.error(e)
    });
  }*/

  updateOwner(): void {
    this.message = '';

    this.ownerService
      .update(this.currentOwner.id, this.currentOwner)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message
            ? res.message
            : 'This owner was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteOwner(): void {
    this.ownerService.delete(this.currentOwner.id).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/owners']);
      },
      error: (e) => console.error(e)
    });
  }
}
