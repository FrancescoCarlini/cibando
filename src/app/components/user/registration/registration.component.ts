import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-registration',
  standalone: false,

  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent {
  private router = inject(Router);

  private userService = inject(UserService);

  private toastService = inject(ToastService);

  equals = false;

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){6,15}$/
      ),
    ]),
    ripetiPassword: new FormControl('', [Validators.required]),
    amministratore: new FormControl(false),
    accetto: new FormControl(false, [Validators.requiredTrue]),
  });

  checkPassword(event) {
    if (event === this.form.controls.password.value) {
      this.equals = true;
    } else {
      this.equals = false;
    }
  }

  checkValidationForm(): boolean {
    if (this.form.invalid || !this.equals) {
      return true;
    }
    return false;
  }

  onSubmit() {
    const dati = {
      name: this.form.controls.name.value,
      email: this.form.controls.email.value,
      password: this.form.controls.password.value,
      accetto: this.form.controls.accetto.value,
      role: this.form.value.amministratore ? 'admin' : 'user',
    };
    this.userService.signUp(dati).subscribe({
      next: () => {
        this.toastService.toastSuccesso('Registrazione avvenuta con successo');
        this.router.navigateByUrl('home');
      },
      error: (e) => {
        this.toastService.toastErrore(
          'Qualcosa è andato storto durante la registrazione'
        );
        console.error();
      },
    });
  }
}
