
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Premio } from '../models/premio.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PremioService {
  private apiUrl = 'http://localhost:3000/api/premios'; // Base URL for premio API

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // CRUD Operations
  getPremios(): Observable<Premio[]> {
    return this.http.get<Premio[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getPremioById(id: number): Observable<Premio> {
    return this.http.get<Premio>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  createPremio(premio: Partial<Premio>): Observable<Premio> {
    return this.http.post<Premio>(this.apiUrl, premio, { headers: this.getHeaders() });
  }

  updatePremio(id: number, premio: Partial<Premio>): Observable<Premio> {
    return this.http.put<Premio>(`${this.apiUrl}/${id}`, premio, { headers: this.getHeaders() });
  }

  deletePremio(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  // Specific Operations
  getPremiosByAno(ano: number): Observable<Premio[]> {
    return this.http.get<Premio[]>(`${this.apiUrl}/ano/${ano}`, { headers: this.getHeaders() });
  }

  getProjetosByPremio(premioId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${premioId}/projetos`, { headers: this.getHeaders() });
  }

  countProjetosByPremio(premioId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${premioId}/projetos/count`, { headers: this.getHeaders() });
  }
}
