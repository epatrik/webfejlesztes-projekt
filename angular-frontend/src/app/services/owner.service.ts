import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Owner } from '../models/owner.model';

const baseUrl = 'http://localhost:9090/api/owners';

@Injectable({
  providedIn: 'root',
})
export class OwnerService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Owner[]> {
    return this.http.get<Owner[]>(baseUrl);
  }

  get(id: any): Observable<Owner> {
    return this.http.get<Owner>(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByName(name: any): Observable<Owner[]> {
    return this.http.get<Owner[]>(`${baseUrl}?name=${name}`);
  }
}
