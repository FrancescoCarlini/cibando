import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiBaseUrl = '/api/users';
  datiUtente = new ReplaySubject();

  constructor(private http: HttpClient) {}

  signUp(user: any) {
    return this.http.post(`${this.apiBaseUrl}/signup`, user);
  }

  getUser(body: any) {
    return this.http.post<User>(`${this.apiBaseUrl}/user`, body);
  }

  updateUser(body: any) {
    return this.http.put(`${this.apiBaseUrl}/${body._id}`, body);
  }
}
