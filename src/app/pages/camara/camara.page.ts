import { Component } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Geolocation, Position } from '@capacitor/geolocation';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  LoadingController,
  ToastController
} from '@ionic/angular/standalone';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.page.html',
  styleUrls: ['./camara.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent
  ],
  providers: [
    DecimalPipe,
    LoadingController, 
    ToastController
  ]
})
export class CamaraPage {
  capturedImage: string | undefined;
  currentLocation: Position | null = null;

  constructor(
    private apiService: ApiService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private decimalPipe: DecimalPipe
  ) {}

  async takePicture() {
    try {
      const loading = await this.loadingCtrl.create({
        message: 'Procesando...'
      });
      await loading.present();

      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64
      });

      const coordinates = await Geolocation.getCurrentPosition();
      this.currentLocation = coordinates;
      
      const photoData = {
        base64: `data:image/jpeg;base64,${image.base64String}`,
        location: {
          lat: coordinates.coords.latitude,
          lng: coordinates.coords.longitude,
          accuracy: coordinates.coords.accuracy
        },
        timestamp: new Date().toISOString()
      };

      this.apiService.savePhoto(photoData).subscribe({
        next: async () => {
          this.capturedImage = photoData.base64;
          await loading.dismiss();
          const toast = await this.toastCtrl.create({
            message: 'Foto guardada correctamente',
            duration: 2000
          });
          await toast.present();
        },
        error: async (err) => {
          console.error('Error:', err);
          await loading.dismiss();
          const toast = await this.toastCtrl.create({
            message: 'Error al guardar foto',
            duration: 2000,
            color: 'danger'
          });
          await toast.present();
        }
      });
    } catch (error) {
      console.error('Error:', error);
      const toast = await this.toastCtrl.create({
        message: 'Error al acceder a la cámara',
        duration: 2000,
        color: 'danger'
      });
      await toast.present();
    }
  }

  formatNumber(value: number | undefined): string {
    return this.decimalPipe.transform(value, '1.4-4') || '';
  }
}