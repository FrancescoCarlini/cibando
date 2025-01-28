import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiBaseUrl = '/api/users';

  constructor(private http: HttpClient, private userService: UserService) {}

  saveStorage(res: User) {
    const user: User = res;
    localStorage.setItem('user', JSON.stringify(user));
  }

  isLogged(): boolean {
    return JSON.parse(localStorage.getItem('user')) !== null;
  }

  login(email: string, password: string): Observable<User> {
    const user = { email: email, password: password };
    return this.http.post<User>(`${this.apiBaseUrl}/login`, user);
  }

  logout() {
    localStorage.removeItem('user');
  }
}
