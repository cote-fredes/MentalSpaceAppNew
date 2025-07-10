import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// Importa ReactiveFormsModule, FormBuilder, FormGroup, Validators para formularios reactivos
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  // Asegúrate de importar ReactiveFormsModule aquí
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterLink]
})
export class RegisterPage implements OnInit {
  registerForm!: FormGroup; // Variable para el FormGroup

  constructor(private router: Router, private fb: FormBuilder) { } // Inyecta FormBuilder

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.passwordMatchValidator // Añade la validación personalizada para que las contraseñas coincidan
    });
  }

  // Getter para facilitar el acceso a los controles del formulario en el HTML
  get f() { return this.registerForm.controls; }

  // Validador personalizado para confirmar que las contraseñas coincidan
  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ mustMatch: true });
    } else {
      confirmPassword?.setErrors(null); // Borra el error si coinciden
    }
    return null;
  }

  onRegister() {
    if (this.registerForm.valid) {
      console.log('Formulario de Registro Válido:', this.registerForm.value);
      // Aquí iría tu lógica de registro de usuario (ej. llamar a un servicio backend)
      // Por ahora, solo navegaremos de vuelta al login o mostraremos un mensaje
      alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
      this.router.navigateByUrl('/login'); // Navega de vuelta al login
    } else {
      console.log('Formulario de Registro Inválido');
      this.registerForm.markAllAsTouched(); // Marca todos los campos como tocados para mostrar los errores
    }
  }
}