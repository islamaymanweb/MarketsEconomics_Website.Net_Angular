import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/login-response.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  $user = new BehaviorSubject<User | undefined>(undefined);

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      environment.apiBaseUrl + '/api/auth/login',
      {
        email: request.email,
        password: request.password,
      }
    );
  }

  setUser(user: User): void {
    this.$user.next(user);
    localStorage.setItem('user-email', user.email);
    localStorage.setItem('user-roles', user.roles.join(','));
  }

  user(): Observable<User | undefined> {
    return this.$user.asObservable();
  }
/* 
  getUser(): User | undefined {
    const email = localStorage.getItem('user-email');
    const roles = localStorage.getItem('user-roles');

    if (email) {
      const user: User = {
        email: email,
        roles: roles?.split(','),
      };
    }

    return undefined;
  } */
    getUser(): User | undefined {
      const email = localStorage.getItem('user-email');
      const roles = localStorage.getItem('user-roles');
    
      if (email) {
        const user: User = {
          email: email,
          roles: roles?.split(',') || [], // القيمة الافتراضية []
        };
        return user;
      }
      return undefined;
    }
  logout(): void {
    localStorage.clear();
    this.cookieService.delete('Authorization', '/');
    this.$user.next(undefined);
  }
}
