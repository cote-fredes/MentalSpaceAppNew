import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Geolocation, Position } from '@capacitor/geolocation';
import { GoogleMap } from '@capacitor/google-maps';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  AlertController,
  LoadingController,
  ToastController
} from '@ionic/angular/standalone';
import { ApiService } from '../../services/api.service';
import { environment } from '../../../environments/environment';
import { firstValueFrom } from 'rxjs'; 

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
    this.cleanupMap();
  }

  private async loadMap() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando mapa y ubicación...'
    });
    await loading.present();

    try {
      await this.requestLocationPermission();
      const coordinates = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true
      });
      this.currentPosition = coordinates;

      await this.initializeMap(coordinates);
      await this.updateAddress(coordinates.coords.latitude, coordinates.coords.longitude);
      await this.showToast('Mapa y ubicación cargados correctamente.');

    } catch (error) {
      console.error('Error loading map:', error);
      this.showError('No se pudo cargar el mapa. Verifica los permisos de ubicación o tu conexión a internet.');
      this.currentAddress = 'Error al cargar mapa/ubicación';
    } finally {
      await loading.dismiss();
    }
  }

  private async requestLocationPermission() {
    const permissionStatus = await Geolocation.checkPermissions();
    if (permissionStatus.location !== 'granted') {
      const requestResult = await Geolocation.requestPermissions();
      if (requestResult.location !== 'granted') {
        throw new Error('Permiso de ubicación denegado.');
      }
    }
  }

  private async initializeMap(coordinates: Position) {
    const mapElement = document.getElementById('map');
    if (!mapElement) {
      throw new Error('Elemento del mapa no encontrado en el DOM.');
    }

    this.map = await GoogleMap.create({
      id: 'my-map',
      element: mapElement,
      apiKey: environment.googleMapsApiKey,
      config: {
        center: {
          lat: coordinates.coords.latitude,
          lng: coordinates.coords.longitude
        },
        zoom: 15,
        zoomControl: true,
        mapTypeControl: true,
        streetViewControl: true
      }
    });

    
    await this.map.addMarker({
      coordinate: {
        lat: coordinates.coords.latitude,
        lng: coordinates.coords.longitude,
      },
      title: 'Tu ubicación actual',
      snippet: this.currentAddress, 
    });
  }

  private async updateAddress(lat: number, lng: number) {
    try {
      
      const response = await firstValueFrom(this.apiService.reverseGeocode(lat, lng));

      
      if (response && response.results && response.results.length > 0) {
        this.currentAddress = response.results[0]?.formatted_address || 'Dirección no disponible';
      } else {
        this.currentAddress = 'Dirección no disponible';
        console.warn('No se encontraron resultados de geocodificación inversa.');
      }
    } catch (error) {
      console.error('Error al obtener dirección:', error);
      this.currentAddress = 'Error obteniendo dirección';
      this.showToast('No se pudo obtener la dirección exacta');
    }
  }

  private cleanupMap() {
    if (this.map) {
      this.map.destroy();
      this.map = null;
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

  private async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      position: 'bottom'
    });
    await toast.present();
  }
}