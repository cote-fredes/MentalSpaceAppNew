import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Geolocation, Position } from '@capacitor/geolocation';
import { GoogleMap } from '@capacitor/google-maps';
import { 
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  AlertController,
  LoadingController,
  ToastController
} from '@ionic/angular/standalone'; // Importación standalone
import { ApiService } from '../../services/api.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent
  ]
})
export class MapaPage implements OnInit, OnDestroy {
  map: GoogleMap | null = null;
  currentPosition: Position | null = null;
  currentAddress: string = 'Obteniendo ubicación...';

  constructor(
    private apiService: ApiService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  async ngOnInit() {
    await this.loadMap();
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.destroy();
      this.map = null;
    }
  }

  async loadMap() {
    try {
      const coordinates = await Geolocation.getCurrentPosition({ 
        enableHighAccuracy: true 
      });
      this.currentPosition = coordinates;
      
      this.map = await GoogleMap.create({
        id: 'my-map',
        element: document.getElementById('map')!,
        apiKey: environment.googleMapsApiKey, // Usa variable de entorno
        config: {
          center: {
            lat: coordinates.coords.latitude,
            lng: coordinates.coords.longitude
          },
          zoom: 15
          // Eliminado disableDefaultUI y gestureHandling que no son compatibles
        }
      });

      await this.updateAddress(coordinates.coords.latitude, coordinates.coords.longitude);
    } catch (error) {
      console.error('Error loading map:', error);
      this.showError('No se pudo cargar el mapa. Verifica los permisos de ubicación.');
    }
  }

  private async updateAddress(lat: number, lng: number) {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${environment.googleMapsApiKey}`
      );
      const data = await response.json();
      this.currentAddress = data.results[0]?.formatted_address || 'Dirección no disponible';
    } catch (error) {
      console.error('Error al obtener dirección:', error);
      this.currentAddress = 'Error obteniendo dirección';
    }
  }

  private async showError(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}