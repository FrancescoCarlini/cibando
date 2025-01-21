import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  user: any;
  errorMessage = '';

  onSubmit(formValue) {
    if (formValue.email !== '' && formValue.password !== '') {
      this.authService.login(formValue.email, formValue.password).subscribe({
        next: (res) => {
          this.user = res;
          if (this.user) {
            this.authService.saveStorage(res);
            this.router.navigateByUrl('/home');
          } else {
            this.errorMessage = 'Username/Password errati';
          }
        },
        error: (e) => {
          console.error(e);
          this.errorMessage = 'Username/Password errati';
        },
      });
    }
  }
}
