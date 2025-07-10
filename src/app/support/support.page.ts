import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-support',
  templateUrl: './support.page.html',
  styleUrls: ['./support.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SupportPage implements OnInit {

  subject: string = '';
  message: string = '';

  constructor() { }

  ngOnInit() {
  }

  submitSupportRequest() {
    console.log('Solicitud de soporte enviada:', {
      subject: this.subject,
      message: this.message
    });
    // Aquí implementarías la lógica para enviar la solicitud (ej. a un servicio o backend)
    alert('Tu solicitud de soporte ha sido enviada. Te contactaremos pronto.');
    this.subject = '';
    this.message = '';
  }

  openFAQ() {
    console.log('Abrir sección de preguntas frecuentes');
    // Aquí puedes navegar a una página de FAQ o abrir un modal
  }

  callSupport() {
    console.log('Llamar a soporte');
    // En una aplicación nativa, podrías usar Capacitor para abrir el marcador de teléfono
    // window.open('tel:+1234567890');
    alert('Función de llamada no implementada en la web. Intenta el formulario.');
  }
}