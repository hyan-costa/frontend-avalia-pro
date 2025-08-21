
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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

  // Pagination
  paginaAtual: number = 1;
  itensPorPagina: number = 10;

  constructor(private premioService: PremioService) { }

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
      
      return matchNome && matchAnoEdicao;
    });
    this.paginaAtual = 1;
  }

  limparFiltros(): void {
    this.filtroNome = '';
    this.filtroAnoEdicao = null;
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
      this.paginaAtual--;
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

  getStatusPremio(premio: Premio): string {
    const hoje = new Date();
    const inicio = new Date(premio.dataInicio);
    const fim = new Date(premio.dataFim);

    if (!premio.status) return 'Inativo';
    if (hoje < inicio) return 'Futuro';
    if (hoje >= inicio && hoje <= fim) return 'Em Andamento';
    return 'Encerrado';
  }

  visualizarDetalhesPremio(premioId: number): void {
    console.log('View details for premio:', premioId);
  }

  editarPremio(premioId: number): void {
    console.log('Edit premio:', premioId);
  }

  excluirPremio(premioId: number): void {
    if (confirm('Tem certeza que deseja excluir este prêmio? Isso também inativará todos os projetos vinculados.')) {
      this.premioService.deletePremio(premioId).subscribe({
        next: () => {
          console.log('Premio excluído com sucesso:', premioId);
          this.loadPremios();
        },
        error: (err) => {
          console.error('Error deleting premio:', err);
        }
      });
    }
  }
}
