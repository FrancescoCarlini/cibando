import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private messageService: MessageService) {}

  toastSuccesso(messaggio: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Operazione eseguita',
      detail: messaggio,
    });
  }

  toastErrore(messaggio: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: messaggio,
    });
  }
}
