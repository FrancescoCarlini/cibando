import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user === null) {
    inject(Router).navigateByUrl('/login');
  }
  return user.role === 'admin' ? true : inject(Router).navigateByUrl('home');
};
