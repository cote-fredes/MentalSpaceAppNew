import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-meditate',
  templateUrl: './meditate.page.html',
  styleUrls: ['./meditate.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class MeditatePage implements OnInit {

  meditations: any[] = [
    { id: 1, title: 'Meditación Guiada de Respiración', duration: '10 min', description: 'Una meditación para enfocar la mente en la respiración y encontrar calma.', audio: 'assets/audio/meditacion_respiracion.mp3' },
    { id: 2, title: 'Sonidos de Lluvia Relajante', duration: '30 min', description: 'Ambiente de lluvia para relajar la mente y conciliar el sueño.', audio: 'assets/audio/sonidos_lluvia.mp3' },
    { id: 3, title: 'Escaneo Corporal Completo', duration: '15 min', description: 'Explora sensaciones en cada parte de tu cuerpo para liberar tensión.', audio: 'assets/audio/escaneo_corporal.mp3' }
  ];

  selectedMeditation: any = null;
  isPlaying: boolean = false;
  audioElement: HTMLAudioElement | null = null;

  constructor() { }

  ngOnInit() {
  }

  playMeditation(meditation: any) {
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.currentTime = 0;
    }

    this.selectedMeditation = meditation;
    this.audioElement = new Audio(this.selectedMeditation.audio);
    this.audioElement.play();
    this.isPlaying = true;

    this.audioElement.onended = () => {
      this.isPlaying = false;
      this.selectedMeditation = null; // Reinicia la selección al terminar
      console.log('Meditación finalizada.');
    };
  }

  pauseMeditation() {
    if (this.audioElement) {
      this.audioElement.pause();
      this.isPlaying = false;
    }
  }

  stopMeditation() {
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.currentTime = 0;
      this.isPlaying = false;
      this.selectedMeditation = null;
    }
  }

  // Asegúrate de limpiar el audio al salir de la página
  ionViewDidLeave() {
    this.stopMeditation();
  }
}