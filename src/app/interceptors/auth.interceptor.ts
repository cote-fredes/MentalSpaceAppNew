import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { from, switchMap } from 'rxjs';

// Exportación ES Muy IMPORTANTE
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const storage = inject(Storage);
  
  return from(storage.get('authToken')).pipe(
    switchMap(token => {
      const authReq = token ? req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      }) : req;
      return next(authReq);
    })
  );
};