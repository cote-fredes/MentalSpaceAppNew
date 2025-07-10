import { Routes } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { IonicModule } from '@ionic/angular';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage),
    providers: [importProvidersFrom(IonicModule)]
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.page').then(m => m.RegisterPage),
    providers: [importProvidersFrom(IonicModule)]
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./forgot-password/forgot-password.page').then(m => m.ForgotPasswordPage),
    providers: [importProvidersFrom(IonicModule)]
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
    providers: [importProvidersFrom(IonicModule)]
  },
  {
    path: 'mapa',
    loadComponent: () => import('./pages/mapa/mapa.page').then(m => m.MapaPage),
    providers: [importProvidersFrom(IonicModule)]
  },
  {
    path: 'camara',
    loadComponent: () => import('./pages/camara/camara.page').then(m => m.CamaraPage),
    providers: [importProvidersFrom(IonicModule)]
  },
  {
    path: 'posts',
    loadComponent: () => import('./pages/posts/posts.page').then(m => m.PostsPage),
    providers: [importProvidersFrom(IonicModule)]
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];