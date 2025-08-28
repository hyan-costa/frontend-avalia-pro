
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Importar o operador map
import { Avaliador } from '../models/avaliador.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AvaliadorService {
  private apiUrl = 'http://localhost:3000/api/avaliadores'; // Base URL for avaliador API

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // CRUD Operations
  getAvaliadores(): Observable<Avaliador[]> {
    return this.http.get<Avaliador[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getAvaliadorById(id: number): Observable<Avaliador> {
    return this.http.get<Avaliador>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  createAvaliador(avaliador: Partial<Avaliador>): Observable<Avaliador> {
    return this.http.post<Avaliador>(this.apiUrl, avaliador, { headers: this.getHeaders() });
  }

  updateAvaliador(id: number, avaliador: Partial<Avaliador>): Observable<Avaliador> {
    return this.http.put<Avaliador>(`${this.apiUrl}/${id}`, avaliador, { headers: this.getHeaders() });
  }

  deleteAvaliador(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  // Specific Operations
  countProjetosAvaliador(avaliadorId: number): Observable<number> {
    return this.http.get<{ count: number }>(`${this.apiUrl}/${avaliadorId}/projetos/count`, { headers: this.getHeaders() }).pipe(
      map(response => response.count)
    );
  }

  getProjetosAvaliador(avaliadorId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${avaliadorId}/projetos`, { headers: this.getHeaders() });
  }

  mediaNotasAvaliador(avaliadorId: number): Observable<number> {
    return this.http.get<{ media: number }>(`${this.apiUrl}/${avaliadorId}/projetos/media`, { headers: this.getHeaders() }).pipe(
      map(response => response.media)
    );
  }
}
