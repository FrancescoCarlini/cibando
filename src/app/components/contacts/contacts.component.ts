import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contacts',
  standalone: false,

  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
})
export class ContactsComponent {
  form = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    oggetto: new FormControl('', [Validators.required]),
    messaggio: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    alert(
      'Riepilogo dati: \n - Nome: ' +
        this.form.value.nome +
        '\n - Email: ' +
        this.form.value.email +
        '\n - Oggetto: ' +
        this.form.value.oggetto +
        '\n - Messaggio: ' +
        this.form.value.messaggio
    );
  }
}
