import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pet } from '../models/pet.model';
import {Owner} from "../models/owner.model";

const basePetUrl = 'http://localhost:9090/api/pets';
const baseOwnerUrl = 'http://localhost:9090/api/owners'

@Injectable({
  providedIn: 'root',
})
export class PetService {
  constructor(private http: HttpClient) {}

  getAllOfOwner(ownerId: any): Observable<Pet[]> {
    return this.http.get<Pet[]>(`${baseOwnerUrl}/${ownerId}/pets`);
  }

  get(id: any): Observable<Pet> {
    return this.http.get<Pet>(`${basePetUrl}/${id}`);
  }

  create(ownerId: any,data: any): Observable<any> {
    return this.http.post(`${baseOwnerUrl}/${ownerId}/pets`, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${basePetUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${basePetUrl}/${id}`);
  }

  deleteAllOfOwner(ownerId: any): Observable<any> {
    return this.http.delete(`${baseOwnerUrl}/${ownerId}/pets`);
  }

  getOwnerIdById(id: any): Observable<string> {
    return this.http.get<string>(`${basePetUrl}/${id}/ownerId`)
  }
}
