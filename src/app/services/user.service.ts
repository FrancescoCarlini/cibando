import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

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
}
