import { Routes } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TabsPage } from './tabs.page'; 

export const routes: Routes = [
  {
    path: '',
    component: TabsPage, 
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('../dashboard/dashboard.page').then(m => m.DashboardPage),
        providers: [importProvidersFrom(IonicModule)]
      },
      {
        path: 'journal',
        loadComponent: () => import('../journal/journal.page').then(m => m.JournalPage),
        providers: [importProvidersFrom(IonicModule)]
      },
      {
        path: 'meditate',
        loadComponent: () => import('../meditate/meditate.page').then(m => m.MeditatePage),
        providers: [importProvidersFrom(IonicModule)]
      },
      {
        path: 'profile',
        loadComponent: () => import('../profile/profile.page').then(m => m.ProfilePage),
        providers: [importProvidersFrom(IonicModule)]
      },
      {
        path: 'support',
        loadComponent: () => import('../support/support.page').then(m => m.SupportPage),
        providers: [importProvidersFrom(IonicModule)]
      },
      {
        path: 'mapa',
        loadComponent: () => import('../pages/mapa/mapa.page').then(m => m.MapaPage),
        providers: [importProvidersFrom(IonicModule)]
      },
      {
        path: 'camara',
        loadComponent: () => import('../pages/camara/camara.page').then(m => m.CamaraPage),
        providers: [importProvidersFrom(IonicModule)]
      },
      {
        path: '',
        redirectTo: '/tabs/dashboard',
        pathMatch: 'full'
      }
    ],
    providers: [importProvidersFrom(IonicModule.forRoot())]
  }
];