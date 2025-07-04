import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

import { UpdateCategoryRequest } from '../models/update-category-request.model';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(
      environment.apiBaseUrl + '/api/categories'
    );
  }

  getCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(
      environment.apiBaseUrl + '/api/categories/' + id
    );
  }

  addCategory(model: AddCategoryRequest): Observable<void> {
    return this.http.post<void>(
      environment.apiBaseUrl + '/api/categories?addAuthor=true',
      model,
      {
        headers: {
          Authorization: this.cookieService.get('Authorization'),
        },
      }
    );
  }

  updateCategory(
    id: string,
    updateCategoryRequest: UpdateCategoryRequest
  ): Observable<Category> {
    return this.http.put<Category>(
      environment.apiBaseUrl + '/api/categories/' + id + '?addAuthor=true',
      updateCategoryRequest,
      {
        headers: {
          Authorization: this.cookieService.get('Authorization'),
        },
      }
    );
  }

  deleteCategory(id: string): Observable<Category> {
    return this.http.delete<Category>(
      environment.apiBaseUrl + '/api/categories/' + id + '?addAuthor=true',
      {
        headers: {
          Authorization: this.cookieService.get('Authorization'),
        },
      }
    );
  }
}
