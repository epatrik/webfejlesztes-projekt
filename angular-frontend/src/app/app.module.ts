import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddOwnerComponent } from './components/add-owner/add-owner.component';
import { OwnerDetailsComponent } from './components/owner-details/owner-details.component';
import { OwnersListComponent } from './components/owners-list/owners-list.component';
import { PetsListComponent } from './components/pets-list/pets-list.component';
import { PetDetailsComponent } from './components/pet-details/pet-details.component';

@NgModule({
  declarations: [
    AppComponent,
    AddOwnerComponent,
    OwnerDetailsComponent,
    OwnersListComponent,
    PetsListComponent,
    PetDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
