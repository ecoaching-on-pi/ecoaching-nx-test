import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@ecoaching-on-pi/shared/service';

export const authGuard = (): boolean => {
  const authService = inject<AuthService>(AuthService);
  const router = inject(Router);
  if (authService.isLoggedIn) {
    return true;
  }
  router.navigate(['/fitness/login']);
  return false;
};
