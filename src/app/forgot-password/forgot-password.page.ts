import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router'; 
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  standalone: true,
  
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterLink]
})
export class ForgotPasswordPage implements OnInit {
  forgotPasswordForm!: FormGroup; 

  constructor(private router: Router, private fb: FormBuilder) { } 

  ngOnInit() {
    
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]] 
    });
  }

  
  get f() { return this.forgotPasswordForm.controls; }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      console.log('Solicitud de recuperación para:', this.forgotPasswordForm.value.email);
      
      
      alert('Si el email está registrado, recibirás instrucciones de recuperación.');
      this.router.navigateByUrl('/login'); 
    } else {
      console.log('Formulario de recuperación inválido.');
      this.forgotPasswordForm.markAllAsTouched(); 
    }
  }
}
