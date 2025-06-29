import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';
import { jwtDecode } from 'jwt-decode';

export const authGuard: CanActivateFn = (route, state): boolean | UrlTree => {
  const cookieService = inject(CookieService);
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.getUser();
  const token = cookieService.get('Authorization');

  // If no token or user, redirect to login
  if (!token || !user) {
    authService.logout();
    return createLoginUrlTree(router, state.url);
  }

  try {
    // Process token
    const cleanToken = token.replace('Bearer ', '');
    const decodedToken = jwtDecode<{ exp: number }>(cleanToken);
    const expirationDate = decodedToken.exp * 1000;
    const currentTime = Date.now();

    // Check token expiration
    if (expirationDate < currentTime) {
      authService.logout();
      return createLoginUrlTree(router, state.url);
    }

    // Check user role
    if (user.roles.includes('Writer')) {
      return true;
    }

    // Unauthorized access
    alert('Unauthorized');
    return router.createUrlTree(['/unauthorized']);
  } catch (error) {
    console.error('Token decoding error:', error);
    authService.logout();
    return createLoginUrlTree(router, state.url);
  }
};

// Helper function to create login URL tree
function createLoginUrlTree(router: Router, returnUrl: string): UrlTree {
  return router.createUrlTree(['/login'], {
    queryParams: { returnUrl },
  });
}