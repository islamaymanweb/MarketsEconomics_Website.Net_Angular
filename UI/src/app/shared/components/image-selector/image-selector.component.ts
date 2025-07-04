import { Component, OnInit, ViewChild } from '@angular/core';
import { ImageService } from './image.service';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { BlogImage } from '../../Models/BlogImage';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.css'],
})
export class ImageSelectorComponent implements OnInit {
  private file?: File;
  fileName: string = '';
  title: string = '';
  images$?: Observable<BlogImage[]>;

  @ViewChild('form', { static: false }) imageUploadForm?: NgForm;

  constructor(private imageService: ImageService) {}

  ngOnInit(): void {
    this.getImages();
  }

/*   onFileUploadChange(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
 this.file = element.files[0];
 
  } */
 uploadImage(): void {
  if (this.file && this.fileName !== '' && this.title !== '') {
    this.imageService
      .uploadImage(this.file, this.fileName, this.title)
      .subscribe({
        next: (response) => {
          this.imageUploadForm?.resetForm();
          this.getImages();
        },
      });
  }
}
 onFileUploadChange(event: Event): void {
  const element = event.currentTarget as HTMLInputElement;
  this.file = element.files![0]; // Only use if you're certain files exists
}
 
  selectImage(image: BlogImage): void {
    this.imageService.selectImage(image);
  }

  private getImages() {
    this.images$ = this.imageService.getAllImages();
  }
}
