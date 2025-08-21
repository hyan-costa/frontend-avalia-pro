
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Autor } from '../models/autor.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AutorService {
  private apiUrl = 'http://localhost:3000/autores'; // Base URL for author API

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // CRUD Operations
  getAutores(): Observable<Autor[]> {
    return this.http.get<Autor[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getAutorById(id: number): Observable<Autor> {
    return this.http.get<Autor>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  createAutor(autor: Partial<Autor>): Observable<Autor> {
    return this.http.post<Autor>(this.apiUrl, autor, { headers: this.getHeaders() });
  }

  updateAutor(id: number, autor: Partial<Autor>): Observable<Autor> {
    return this.http.put<Autor>(`${this.apiUrl}/${id}`, autor, { headers: this.getHeaders() });
  }

  deleteAutor(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  // Specific Operations
  getProjetosByAutor(autorId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${autorId}/projetos`, { headers: this.getHeaders() });
  }

  mediaNotasAutor(autorId: number): Observable<number> {
    return this.http.post<number>(`${this.apiUrl}/${autorId}/projetos/media`, {}, { headers: this.getHeaders() });
  }
}
