import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable()
/*  export class AuthInterceptor implements HttpInterceptor {
  constructor(private cookieService: CookieService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.shouldInterceptRequest(request)) {
      const authRequest = request.clone({
        setHeaders: {
          Authorization: this.cookieService.get('Authorization'),
        },
      });

      return next.handle(authRequest);
    } else {
      return next.handle(request);
    }
  }

  private shouldInterceptRequest(request: HttpRequest<any>): boolean {
    return request.urlWithParams.indexOf('AddAuth=true', 0) > -1 ? true : false;
  }
}

 */

export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private cookieService: CookieService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    
    const token = this.cookieService.get('Authorization');
    
    // أضف التوكن لجميع الطلبات إلى API الخاص بك
    if (token && request.url.startsWith(environment.apiBaseUrl)) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token.replace('Bearer ', '')}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.handleUnauthorizedError();
        }
        return throwError(() => error);
      })
    );
  }

  private handleUnauthorizedError() {
    // أزل التوكن المنتهي
    this.cookieService.delete('Authorization');
    // أعد التوجيه لصفحة تسجيل الدخول
    this.router.navigate(['/login']);
  }
}