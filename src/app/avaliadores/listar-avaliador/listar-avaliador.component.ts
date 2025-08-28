
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AvaliadorService } from '../avaliador.service';
import { Avaliador, AreaEspecializacao } from '../../models/avaliador.model';

@Component({
  selector: 'app-listar-avaliador',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './listar-avaliador.component.html',
  styleUrl: './listar-avaliador.component.scss'
})
export class ListarAvaliadorComponent implements OnInit {
  avaliadores: Avaliador[] = [];
  avaliadoresFiltrados: Avaliador[] = [];
  
  // Filters
  filtroNome: string = '';
  filtroEmail: string = '';
  filtroCPF: string = '';
  filtroAreaEspecializacao: string = '';

  // Pagination
  paginaAtual: number = 1;
  itensPorPagina: number = 10;

  areaEspecializacaoOptions = Object.values(AreaEspecializacao);

  constructor(private avaliadorService: AvaliadorService, private router: Router) { }

  ngOnInit(): void {
    this.loadAvaliadores();
  }

  loadAvaliadores(): void {
    this.avaliadorService.getAvaliadores().subscribe({
      next: (data) => {
        this.avaliadores = data;
        this.aplicarFiltros();
      },
      error: (err) => {
        console.error('Error loading avaliadores:', err);
      }
    });
  }

  aplicarFiltros(): void {
    this.avaliadoresFiltrados = this.avaliadores.filter(avaliador => {
      const matchNome = avaliador.nome.toLowerCase().includes(this.filtroNome.toLowerCase());
      const matchEmail = avaliador.email.toLowerCase().includes(this.filtroEmail.toLowerCase());
      const matchCPF = avaliador.cpf.toLowerCase().includes(this.filtroCPF.toLowerCase());
      const matchAreaEspecializacao = !this.filtroAreaEspecializacao || avaliador.areaEspecializacao === this.filtroAreaEspecializacao as AreaEspecializacao;
      
      return matchNome && matchEmail && matchCPF && matchAreaEspecializacao;
    });
    this.paginaAtual = 1;
  }

  limparFiltros(): void {
    this.filtroNome = '';
    this.filtroEmail = '';
    this.filtroCPF = '';
    this.filtroAreaEspecializacao = '';
    this.aplicarFiltros();
  }

  get avaliadoresPaginados(): Avaliador[] {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    return this.avaliadoresFiltrados.slice(inicio, fim);
  }

  get totalPaginas(): number {
    return Math.ceil(this.avaliadoresFiltrados.length / this.itensPorPagina);
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

  visualizarDetalhesAvaliador(avaliadorId: number): void {
    this.router.navigate(['/avaliadores', avaliadorId]);
  }

  
}
