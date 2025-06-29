import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './features/auth/login/login.component';
import { RouterModule } from '@angular/router';
import { EditCategoryComponent } from './features/category/edit-category/edit-category.component';
import { CategoryListComponent } from './features/category/category-list/category-list.component';
import { AddCategoryComponent } from './features/category/add-category/add-category.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { BlogpostListComponent } from './features/blog-post/blogpost-list/blogpost-list.component';
import { EditBlogpostComponent } from './features/blog-post/edit-blogpost/edit-blogpost.component';
import { ImageSelectorComponent } from './shared/components/image-selector/image-selector.component';
import { CommonModule } from '@angular/common';
import { BlogDetailsComponent } from './features/public/blog-details/blog-details.component';

import { HomeComponent } from './features/public/home/home.component';
import { AddBlogpostComponent } from './features/blog-post/add-blogpost/add-blogpost.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { AboutComponent } from './core/components/about/about.component';
import { ContactComponent } from './core/components/contact/contact.component';
import { SliderComponent } from './core/components/slider/slider.component';
import { MarkdownModule } from 'ngx-markdown';


@NgModule({
  declarations: [

    AppComponent,
    NavbarComponent,
    CategoryListComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    BlogpostListComponent,
    AddBlogpostComponent,
    EditBlogpostComponent,
    ImageSelectorComponent,
    HomeComponent,
    BlogDetailsComponent,
    LoginComponent,
    FooterComponent,
 FooterComponent,
 AboutComponent,
ContactComponent,
SliderComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
  MarkdownModule.forRoot(), 
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
   
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
