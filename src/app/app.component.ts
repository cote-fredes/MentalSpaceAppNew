import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router'; 
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-root',
 
  template: `<ion-app><ion-router-outlet></ion-router-outlet></ion-app>`,
  standalone: true,
  imports: [CommonModule, RouterOutlet, IonicModule]
})
export class AppComponent {}
