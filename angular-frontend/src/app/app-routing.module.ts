import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwnersListComponent } from './components/owners-list/owners-list.component';
import { OwnerDetailsComponent } from './components/owner-details/owner-details.component';
import { AddOwnerComponent } from './components/add-owner/add-owner.component';
import {PetsListComponent} from "./components/pets-list/pets-list.component";

const routes: Routes = [
  { path: '', redirectTo: 'owners', pathMatch: 'full' },
  { path: 'owners', component: OwnersListComponent },
  { path: 'owners/:id', component: OwnerDetailsComponent },
  { path: 'add', component: AddOwnerComponent },
  { path: 'owners/:ownerId/pets', component: PetsListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
