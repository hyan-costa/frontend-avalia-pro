
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProjetoService } from '../projeto.service';
import { Projeto, AreaTematica, SituacaoProjeto } from '../../models/projeto.model';

@Component({
  selector: 'app-listar-projetos',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './listar-projetos.component.html',
  styleUrl: './listar-projetos.component.scss'
})
export class ListarProjetosComponent implements OnInit {
  projetos: Projeto[] = [];
  projetosFiltrados: Projeto[] = [];
  
  // Filters
  filtroTitulo: string = '';
  filtroAreaTematica: string = '';
  filtroAutor: string = '';
  filtroStatusProjeto: string = '';
  filtroPremio: string = '';

  // Pagination
  paginaAtual: number = 1;
  itensPorPagina: number = 5;

  constructor(private projetoService: ProjetoService) { }

  ngOnInit(): void {
    this.loadProjetos();
  }

  loadProjetos(): void {
    this.projetoService.getProjetos().subscribe({
      next: (data) => {
        this.projetos = data;
        this.aplicarFiltros(); // Apply filters after loading
      },
      error: (err) => {
        console.error('Error loading projetos:', err);
        // Handle error (e.g., show a message to the user)
      }
    });
  }

  aplicarFiltros(): void {
    this.projetosFiltrados = this.projetos.filter(projeto => {
      const matchTitulo = projeto.titulo.toLowerCase().includes(this.filtroTitulo.toLowerCase());
      const matchArea = projeto.areaTematica.toLowerCase().includes(this.filtroAreaTematica.toLowerCase());
      const matchAutor = projeto.autores.some(autor => autor.nome.toLowerCase().includes(this.filtroAutor.toLowerCase()));
      const matchStatus = !this.filtroStatusProjeto || projeto.situacao === this.filtroStatusProjeto as SituacaoProjeto;
      const matchPremio = !this.filtroPremio || (projeto.premio && projeto.premio.nome.toLowerCase().includes(this.filtroPremio.toLowerCase()));
      
      return matchTitulo && matchArea && matchAutor && matchStatus && matchPremio;
    });
    this.paginaAtual = 1; // Reset pagination on filter change
  }

  limparFiltros(): void {
    this.filtroTitulo = '';
    this.filtroAreaTematica = '';
    this.filtroAutor = '';
    this.filtroStatusProjeto = '';
    this.filtroPremio = '';
    this.aplicarFiltros();
  }

  // Pagination methods
  get projetosPaginados(): Projeto[] {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    return this.projetosFiltrados.slice(inicio, fim);
  }

  get totalPaginas(): number {
    return Math.ceil(this.projetosFiltrados.length / this.itensPorPagina);
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

  // Helper functions for template
  formatarDataSimples(dataString: Date): string {
    if (!dataString) return 'N/A';
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR');
  }

  formatarListaAutores(autoresArray: any[]): string {
    if (!autoresArray || autoresArray.length === 0) return 'N/A';
    return autoresArray.map(autor => autor.nome).join(', ');
  }

  getProjectStatusBadge(status: SituacaoProjeto): string {
    let statusClass = '';
    switch(status) {
        case SituacaoProjeto.EM_AVALIACAO: statusClass = 'bg-purple-100 text-purple-700'; break;
        case SituacaoProjeto.SUBMETIDO: statusClass = 'bg-blue-100 text-blue-700'; break;
        case SituacaoProjeto.AVALIADO_APROVADO: statusClass = 'bg-green-100 text-green-700'; break;
        case SituacaoProjeto.AVALIADO_REPROVADO: statusClass = 'bg-red-100 text-red-700'; break;
        case SituacaoProjeto.PENDENTE_AJUSTES: statusClass = 'bg-yellow-100 text-yellow-700'; break;
        case SituacaoProjeto.CONCLUIDO: statusClass = 'bg-gray-100 text-gray-700'; break;
        default: statusClass = 'bg-gray-200 text-gray-600';
    }
    return `<span class="${statusClass} px-2 py-1 rounded-full text-xs font-medium">${status || 'N/Definido'}</span>`;
  }

  visualizarDetalhesProjeto(projetoId: number): void {
    // Implement navigation to project details page
    console.log('View details for project:', projetoId);
  }

  editarProjeto(projetoId: number): void {
    // Implement navigation to edit project page
    console.log('Edit project:', projetoId);
  }
}
