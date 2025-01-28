import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ToastService } from '../../../services/toast.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  user: any;
  errorMessage = '';

  onSubmit(formValue) {
    if (formValue.email !== '' && formValue.password !== '') {
      this.authService.login(formValue.email, formValue.password).subscribe({
        next: (res: User) => {
          this.user = res;
          if (this.user) {
            this.toastService.toastSuccesso('Login effettuato');
            this.authService.saveStorage(res);
            this.router.navigateByUrl('/home');
          } else {
            this.toastService.toastErrore('Qualcosa è andato storto');
            this.errorMessage = 'Username/Password errati';
          }
        },
        error: (e) => {
          console.error(e);
          this.toastService.toastErrore('Qualcosa è andato storto');
          this.errorMessage = 'Username/Password errati';
        },
      });
    }
  }
}
