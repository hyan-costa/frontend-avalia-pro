
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AutorService } from '../autor.service';
import { Autor } from '../../models/autor.model';

@Component({
  selector: 'app-listar-autor',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './listar-autor.component.html',
  styleUrl: './listar-autor.component.scss'
})
export class ListarAutorComponent implements OnInit {
  autores: Autor[] = [];
  autoresFiltrados: Autor[] = [];
  
  // Filters
  filtroNome: string = '';
  filtroEmail: string = '';
  filtroCPF: string = '';

  // Pagination
  paginaAtual: number = 1;
  itensPorPagina: number = 10;

  constructor(private autorService: AutorService) { }

  ngOnInit(): void {
    this.loadAutores();
  }

  loadAutores(): void {
    this.autorService.getAutores().subscribe({
      next: (data) => {
        this.autores = data;
        this.aplicarFiltros();
      },
      error: (err) => {
        console.error('Error loading autores:', err);
      }
    });
  }

  aplicarFiltros(): void {
    this.autoresFiltrados = this.autores.filter(autor => {
      const matchNome = autor.nome.toLowerCase().includes(this.filtroNome.toLowerCase());
      const matchEmail = autor.email.toLowerCase().includes(this.filtroEmail.toLowerCase());
      const matchCPF = autor.cpf.toLowerCase().includes(this.filtroCPF.toLowerCase());
      
      return matchNome && matchEmail && matchCPF;
    });
    this.paginaAtual = 1;
  }

  limparFiltros(): void {
    this.filtroNome = '';
    this.filtroEmail = '';
    this.filtroCPF = '';
    this.aplicarFiltros();
  }

  get autoresPaginados(): Autor[] {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    return this.autoresFiltrados.slice(inicio, fim);
  }

  get totalPaginas(): number {
    return Math.ceil(this.autoresFiltrados.length / this.itensPorPagina);
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

  visualizarDetalhesAutor(autorId: number): void {
    console.log('View details for autor:', autorId);
  }

  editarAutor(autorId: number): void {
    console.log('Edit autor:', autorId);
  }

  excluirAutor(autorId: number): void {
    if (confirm('Tem certeza que deseja excluir este autor?')) {
      this.autorService.deleteAutor(autorId).subscribe({
        next: () => {
          console.log('Autor excluído com sucesso:', autorId);
          this.loadAutores(); // Reload list after deletion
        },
        error: (err) => {
          console.error('Error deleting autor:', err);
        }
      });
    }
  }
}
