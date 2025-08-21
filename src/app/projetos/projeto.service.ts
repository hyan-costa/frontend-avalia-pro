
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Projeto, AreaTematica, SituacaoProjeto } from '../models/projeto.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProjetoService {
  private apiUrl = 'http://localhost:3000/projetos'; // Base URL for project API

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // CRUD Operations
  getProjetos(): Observable<Projeto[]> {
    return this.http.get<Projeto[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getProjetoById(id: number): Observable<Projeto> {
    return this.http.get<Projeto>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  createProjeto(projeto: Partial<Projeto>): Observable<Projeto> {
    return this.http.post<Projeto>(this.apiUrl, projeto, { headers: this.getHeaders() });
  }

  updateProjeto(id: number, projeto: Partial<Projeto>): Observable<Projeto> {
    return this.http.put<Projeto>(`${this.apiUrl}/${id}`, projeto, { headers: this.getHeaders() });
  }

  deleteProjeto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  // Specific Operations
  evaluateProjeto(id: number, nota: number, parecerDescritivo: string, situacao: SituacaoProjeto): Observable<Projeto> {
    return this.http.patch<Projeto>(
      `${this.apiUrl}/${id}/avaliar`,
      { nota, parecerDescritivo, situacao },
      { headers: this.getHeaders() }
    );
  }

  addAutorToProjeto(projetoId: number, autorId: number): Observable<Projeto> {
    return this.http.post<Projeto>(
      `${this.apiUrl}/${projetoId}/autores`,
      { autorId },
      { headers: this.getHeaders() }
    );
  }

  removeAutorFromProjeto(projetoId: number, autorId: number): Observable<Projeto> {
    return this.http.delete<Projeto>(
      `${this.apiUrl}/${projetoId}/autores/${autorId}`,
      { headers: this.getHeaders() }
    );
  }

  // Filter Operations
  getProjetosByAreaTematica(area: AreaTematica): Observable<Projeto[]> {
    return this.http.get<Projeto[]>(`${this.apiUrl}/filtro/area/${area}`, { headers: this.getHeaders() });
  }

  getProjetosBySituacao(situacao: SituacaoProjeto): Observable<Projeto[]> {
    return this.http.get<Projeto[]>(`${this.apiUrl}/filtro/situacao/${situacao}`, { headers: this.getHeaders() });
  }

  getProjetosByAutor(autorId: number): Observable<Projeto[]> {
    return this.http.get<Projeto[]>(`${this.apiUrl}/filtro/autor/${autorId}`, { headers: this.getHeaders() });
  }

  getProjetosByPremio(premioId: number): Observable<Projeto[]> {
    return this.http.get<Projeto[]>(`${this.apiUrl}/filtro/premio/${premioId}`, { headers: this.getHeaders() });
  }

  getProjetosByAvaliador(avaliadorId: number): Observable<Projeto[]> {
    return this.http.get<Projeto[]>(`${this.apiUrl}/filtro/avaliador/${avaliadorId}`, { headers: this.getHeaders() });
  }

  countProjetosBySituacaoAndPremio(premioId: number, situacao: SituacaoProjeto): Observable<number> {
    return this.http.get<number>(
      `${this.apiUrl}/contagem/premio/${premioId}/situacao/${situacao}`,
      { headers: this.getHeaders() }
    );
  }
}
