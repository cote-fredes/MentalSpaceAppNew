import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.page.html',
  styleUrls: ['./journal.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class JournalPage implements OnInit {

  journalEntries: any[] = [
    { id: 1, date: new Date('2025-06-04T17:30:00'), mood: 'Ansioso', text: 'Hoy me sentí un poco ansioso, pero la meditación de lluvia me ayudó a relajarme. Luego hice algunos estiramientos ligeros.' },
    { id: 2, date: new Date('2025-06-03T10:00:00'), mood: 'Feliz', text: 'Tuve un día muy productivo y me sentí lleno de energía. Compartí un momento agradable con amigos.' },
    { id: 3, date: new Date('2025-06-02T21:15:00'), mood: 'Triste', text: 'Me sentí un poco melancólico al recordar viejos tiempos. Escribir en el diario siempre me ayuda a procesar mis emociones.' }
  ];

  constructor() { }

  ngOnInit() {
  }

  openNewEntryModal() {
    console.log('Abrir modal para nueva entrada de diario');
    // TODO: Implementar un modal para añadir nuevas entradas
  }

  viewEntry(entry: any) {
    console.log('Ver entrada:', entry);
    // TODO: Implementar la navegación a una página de detalle o un modal para ver la entrada completa
  }
}
