import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router'; // Para enlaces de navegación

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink] // Añade RouterLink si lo usas en el HTML
})
export class DashboardPage implements OnInit {

  userName: string = 'Usuario MentalSpace';
  lastJournalEntry: string = 'Hoy me sentí un poco ansioso, pero la meditación de lluvia me ayudó a relajarme.';
  affirmation: string = 'Eres fuerte y capaz de superar cualquier desafío.';

  constructor() { }

  ngOnInit() {
    // Aquí podrías cargar datos reales del usuario o del diario.
  }

  // Puedes añadir funciones para navegar o manejar eventos aquí
}

