
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api'; // Replace with your backend API URL
  private tokenKey = 'authToken';

  constructor(private http: HttpClient) { }

  login(email: string, senha: string): Observable<{ token: string, user: Usuario }> {
    return this.http.post<{ token: string, user: Usuario }>(`${this.apiUrl}/login`, { email, senha }).pipe(
      tap(response => {
        this.setToken(response.token);
        // Optionally store user data as well
      }),
      catchError(this.handleError<any>('login'))
    );
  }

  logout(): void {
    this.removeToken();
    // Optionally clear user data
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error);
      // TODO: send the error to remote logging infrastructure

      // Let the app keep running by returning an empty result.
      return throwError(() => error);
    };
  }
}
