import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
 
    currentYear: number = new Date().getFullYear();
email:string="marketsconomics@gmail.com"
  
}
