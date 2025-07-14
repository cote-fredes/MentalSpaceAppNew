import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors, withJsonpSupport } from '@angular/common/http';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { addIcons } from 'ionicons';
import { 
  personOutline, 
  lockClosedOutline, 
  logInOutline,
  cameraOutline,
  mapOutline,
  listOutline,
  homeOutline,
  settingsOutline
} from 'ionicons/icons';
import { IonicStorageModule } from '@ionic/storage-angular';
import { importProvidersFrom } from '@angular/core';
import { authInterceptor } from './app/interceptors/auth.interceptor';
import { ErrorHandler } from '@angular/core';
import { environment } from './environments/environment';


class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any) {
    console.error('Error global:', error);
    
  }
}


addIcons({
  'person-outline': personOutline,
  'lock-closed-outline': lockClosedOutline,
  'log-in-outline': logInOutline,
  'camera-outline': cameraOutline,
  'map-outline': mapOutline,
  'list-outline': listOutline,
  'home-outline': homeOutline,
  'settings-outline': settingsOutline
});

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(
      withInterceptors([authInterceptor]),
      withJsonpSupport()
    ),
    provideIonicAngular({ 
      mode: 'md', 
      backButtonText: 'Volver',
      rippleEffect: true,
      animated: true
    }),
    provideAnimations(),
    importProvidersFrom(
      IonicStorageModule.forRoot({
        name: '__mentalSpaceDB',
        driverOrder: ['indexeddb', 'sqlite', 'websql'],
        storeName: '_ionicstorage'
      })
    ),
    { 
      provide: 'API_BASE_URL', 
      useValue: environment.production 
        ? 'https://api.tudominio.com' 
        : 'https://jsonplaceholder.typicode.com'
    },
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ]
}).catch((err) => console.error(err));