import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon,
  IonContent, IonSpinner, IonList, IonItem, IonLabel, IonItemSliding,
  IonItemOptions, IonItemOption, IonFab, IonFabButton,
  LoadingController, ToastController
} from '@ionic/angular/standalone';
import { ApiService } from '../../services/api.service';

interface Post {
  id: number;
  title: string;
  body: string;
}

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon,
    IonContent, IonSpinner, IonList, IonItem, IonLabel, IonItemSliding,
    IonItemOptions, IonItemOption, IonFab, IonFabButton
  ],
  providers: [LoadingController, ToastController]
})
export class PostsPage {
  posts: Post[] = [];
  isLoading = false;

  constructor(
    private apiService: ApiService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  async ionViewWillEnter() {
    await this.loadPosts();
    this.logPostData();
  }

  async loadPosts() {
    this.isLoading = true;
    const loading = await this.loadingCtrl.create({
      message: 'Cargando posts...'
    });
    await loading.present();

    this.apiService.getPosts().subscribe({
      next: (data: any) => {
        this.posts = data.map((post: any) => ({
          ...post,
          id: Number(post.id)
        }));
        this.isLoading = false;
        loading.dismiss();
        this.verifyIdType();
      },
      error: async (err) => {
        this.isLoading = false;
        await loading.dismiss();
        this.showToast('Error al cargar posts', 'danger');
      }
    });
  }

  async deletePost(id: number) {
    const loading = await this.loadingCtrl.create({
      message: 'Eliminando post...'
    });
    await loading.present();

    this.apiService.deletePost(id).subscribe({
      next: async () => {
        this.posts = this.posts.filter(post => post.id !== id);
        await loading.dismiss();
        this.showToast('Post eliminado');
      },
      error: async (err) => {
        await loading.dismiss();
        this.showToast('Error al eliminar', 'danger');
        console.error('Error eliminando post:', err);
      }
    });
  }

  async createNewPost() {
    console.log('Se hizo clic en el botón para crear un nuevo post.');
  }

  private logPostData() {
    if (this.posts.length > 0) {
      console.log('=== VERIFICACIÓN DE TIPOS ===');
      console.log('Primer post:', this.posts[0]);
      console.log('Tipo del ID:', typeof this.posts[0].id);

      if (typeof this.posts[0].id === 'number') {
        console.log('✅ El ID es un number como se esperaba');
      } else {
        console.warn('⚠️ El ID no es un number como se esperaba');
      }
    }
  }

  private verifyIdType() {
    const invalidPosts = this.posts.filter(post =>
      typeof post.id !== 'number' || isNaN(post.id)
    );

    if (invalidPosts.length > 0) {
      console.error('⚠️ Posts con IDs inválidos:', invalidPosts);
      this.showToast('Algunos posts tienen IDs inválidos', 'warning');
    }
  }

  private async showToast(message: string, color: string = 'success'): Promise<void> {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color
    });
    await toast.present();
  }
}
