import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'; // <-- Importa ReactiveFormsModule, FormBuilder, FormGroup, Validators
import { IonicModule } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  // Asegúrate de importar ReactiveFormsModule aquí junto a FormsModule
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterLink] // <-- Añade ReactiveFormsModule
})
export class LoginPage implements OnInit {
  // Eliminamos username y password_login si los tenías como propiedades directas
  loginForm!: FormGroup; // Declara una variable para tu FormGroup

  constructor(private router: Router, private fb: FormBuilder) { } // <-- Inyecta FormBuilder

  ngOnInit() {
    // Inicializa tu formulario reactivo en ngOnInit
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Campo email requerido y con formato de email
      password: ['', [Validators.required, Validators.minLength(6)]] // Campo password requerido y con mínimo 6 caracteres
    });
  }

  // Modificamos onLogin para que use el formulario reactivo
  onLogin() {
    if (this.loginForm.valid) { // Si el formulario es válido (campos llenos y cumplen reglas)
      console.log('Formulario de Login Válido:', this.loginForm.value);
      // Aquí iría tu lógica de autenticación real (ej. llamar a un servicio backend)

      // Simulación de login exitoso: Navega a las pestañas
      this.router.navigateByUrl('/tabs/dashboard');
    } else {
      // Si el formulario no es válido, puedes mostrar un mensaje de error o resaltar los campos
      console.log('Formulario de Login Inválido');
      // Opcional: Marcar todos los campos como "touched" para mostrar los mensajes de error
      this.loginForm.markAllAsTouched();
    }
  }

  onRegister() {
    this.router.navigateByUrl('/register');
  }

  // Método para acceder fácilmente a los controles del formulario desde el HTML
  get f() { return this.loginForm.controls; }
}