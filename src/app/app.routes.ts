import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard'; // Importa tu guard

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.page').then(m => m.RegisterPage)
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./forgot-password/forgot-password.page').then(m => m.ForgotPasswordPage)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
    canActivate: [AuthGuard] // Protege todas las rutas bajo 'tabs'
  },
  {
    path: 'mapa',
    loadComponent: () => import('./pages/mapa/mapa.page').then(m => m.MapaPage),
    canActivate: [AuthGuard] // Ruta protegida
  },
  {
    path: 'camara',
    loadComponent: () => import('./pages/camara/camara.page').then(m => m.CamaraPage),
    canActivate: [AuthGuard] // Ruta protegida
  },
  {
    path: 'posts',
    loadComponent: () => import('./pages/posts/posts.page').then(m => m.PostsPage),
    canActivate: [AuthGuard] // Ruta protegida
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
