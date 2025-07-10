import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ProfilePage implements OnInit {

  userProfile = {
    name: 'Marii',
    email: 'marii@example.com',
    age: 28,
    moodToday: 'Feliz',
    profilePicture: 'https://ionicframework.com/docs/img/demos/avatar.svg' // O una URL real
  };

  constructor() { }

  ngOnInit() {
  }

  saveProfile() {
    console.log('Guardando perfil:', this.userProfile);
    // Aquí podrías implementar la lógica para guardar el perfil en un servicio/backend
    alert('Perfil guardado exitosamente!');
  }

  changePassword() {
    console.log('Navegar a cambiar contraseña');
    // Implementar navegación a otra página o modal
  }

  logout() {
    console.log('Cerrando sesión');
    // Implementar lógica de cierre de sesión y redirección al login
  }
}