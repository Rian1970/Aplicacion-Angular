import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './service/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  //Inyecta las dependencias de AuthService y router
  const authService = inject(AuthService);
  const router = inject(Router)

    if (authService.isAuthenticated()) {
      return true;
    } else {
      router.navigate(['/login']);
      return false;
    }
};
