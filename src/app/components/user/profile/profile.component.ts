import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-profile',
  standalone: false,

  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  user: User | undefined;

  constructor(private userService: UserService) {
    this.getUser();
  }

  getUser() {
    const userStored = JSON.parse(localStorage.getItem('user'));
    this.userService.getUser({ email: userStored.email }).subscribe({
      next: (res) => (this.user = res),
      error: (e) => console.error(e),
    });
  }
}
