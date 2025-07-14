import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

export const AuthGuard: CanActivateFn = async () => {
  const storage = inject(Storage);
  const router = inject(Router);

  try {
    const token = await storage.get('authToken');
    if (!token) {
      await router.navigate(['/login']); // 'await' para redirección segura
      return false;
    }
    return true;
  } catch (error) {
    console.error('AuthGuard Error:', error);
    await router.navigate(['/error']); // Página de error alternativa
    return false;
  }
};