import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard = (): boolean => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isAuth()) {
    return true;
  }
  router.navigate(['/fitness/login']);
  return false;
};
