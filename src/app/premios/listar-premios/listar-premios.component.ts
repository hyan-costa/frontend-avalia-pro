
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PremioService } from '../premio.service';
import { Premio } from '../../models/premio.model';

@Component({
  selector: 'app-listar-premios',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './listar-premios.component.html',
  styleUrl: './listar-premios.component.scss'
})
export class ListarPremiosComponent implements OnInit {
  premios: Premio[] = [];
  premiosFiltrados: Premio[] = [];

  // Filters
  filtroNome: string = '';
  filtroAnoEdicao: number | null = null;
  filtroStatus: string = '';
  statusList: string[] = ['Ativo', 'Inativo']; // Simplificado

  // Pagination
  paginaAtual: number = 1;
  itensPorPagina: number = 10;

  constructor(private premioService: PremioService, private router: Router) { }

  ngOnInit(): void {
    this.loadPremios();
  }

  loadPremios(): void {
    this.premioService.getPremios().subscribe({
      next: (data) => {
        this.premios = data;
        this.aplicarFiltros();
      },
      error: (err) => {
        console.error('Error loading premios:', err);
      }
    });
  }

  aplicarFiltros(): void {
    this.premiosFiltrados = this.premios.filter(premio => {
      const matchNome = premio.nome.toLowerCase().includes(this.filtroNome.toLowerCase());
      const matchAnoEdicao = this.filtroAnoEdicao === null || premio.anoEdicao === this.filtroAnoEdicao;

      // Lógica de filtro de status ajustada
      const statusBooleano = this.filtroStatus === 'Ativo' ? true : (this.filtroStatus === 'Inativo' ? false : null);
      const matchStatus = this.filtroStatus === '' || premio.status === statusBooleano;

      return matchNome && matchAnoEdicao && matchStatus;
    });
    this.paginaAtual = 1;
  }

  limparFiltros(): void {
    this.filtroNome = '';
    this.filtroAnoEdicao = null;
    this.filtroStatus = '';
    this.aplicarFiltros();
  }

  get premiosPaginados(): Premio[] {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    return this.premiosFiltrados.slice(inicio, fim);
  }

  get totalPaginas(): number {
    return Math.ceil(this.premiosFiltrados.length / this.itensPorPagina);
  }

  paginaAnterior(): void {
    if (this.paginaAtual > 1) {
      this.paginaAtual--
    }
  }

  proximaPagina(): void {
    if (this.paginaAtual < this.totalPaginas) {
      this.paginaAtual++;
    }
  }

  formatarDataSimples(dataString: Date): string {
    if (!dataString) return 'N/A';
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR');
  }

  // Lógica de status simplificada
  getStatusPremio(premio: Premio): string {
    return premio.status ? 'Ativo' : 'Inativo';
  }

  visualizarDetalhesPremio(premioId: number): void {
    this.router.navigate(['/premios', premioId]);
  }
}
