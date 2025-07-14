import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private localApiUrl = 'http://localhost:3000';
  private jsonPlaceholderUrl = 'https://jsonplaceholder.typicode.com';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  
  getLocations(): Observable<any> {
    return this.http.get(`${this.localApiUrl}/locations`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  addLocation(location: any): Observable<any> {
    return this.http.post(`${this.localApiUrl}/locations`, location, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteLocation(id: number): Observable<any> {
    return this.http.delete(`${this.localApiUrl}/locations/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  
  getPosts(): Observable<any> {
    return this.http.get(`${this.jsonPlaceholderUrl}/posts`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  getPostById(id: number): Observable<any> {
    return this.http.get(`${this.jsonPlaceholderUrl}/posts/${id}`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  createPost(post: { title: string; body: string; userId: number }): Observable<any> {
    return this.http.post(`${this.jsonPlaceholderUrl}/posts`, post, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  updatePost(id: number, post: any): Observable<any> {
    return this.http.put(`${this.jsonPlaceholderUrl}/posts/${id}`, post, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.jsonPlaceholderUrl}/posts/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  
  savePhoto(photo: any): Observable<any> {
    return this.http.post(`${this.localApiUrl}/photos`, photo, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getPhotos(): Observable<any> {
    return this.http.get(`${this.localApiUrl}/photos`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  
  reverseGeocode(latitude: number, longitude: number): Observable<any> {
    
    
    
    
    const geocodingApiUrl = `https://api.ejemplo.com/reverse-geocode?lat=${latitude}&lon=${longitude}`;

    return this.http.get(geocodingApiUrl)
      .pipe(
        retry(2), 
        catchError(this.handleError)
      );
  }

  
  
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Error desconocido';
    if (error.error instanceof ErrorEvent) {
      
      errorMessage = `Error: ${error.error.message}`;
    } else {
      
      errorMessage = `Código: ${error.status}\nMensaje: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}