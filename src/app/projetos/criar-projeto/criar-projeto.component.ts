
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjetoService } from '../projeto.service';
import { AutorService } from '../../autores/autor.service'; // Will create this service later
import { PremioService } from '../../premios/premio.service'; // Will create this service later
import { Projeto, AreaTematica, SituacaoProjeto } from '../../models/projeto.model';
import { Autor } from '../../models/autor.model';
import { Premio } from '../../models/premio.model';

@Component({
  selector: 'app-criar-projeto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './criar-projeto.component.html',
  styleUrl: './criar-projeto.component.scss'
})
export class CriarProjetoComponent implements OnInit {
  novoProjeto: Partial<Projeto> = {
    titulo: '',
    areaTematica: AreaTematica.CIENCIAS_EXATAS_E_TERRA, // Default value
    resumo: '',
    autores: [],
    premioId: 0,
    situacao: SituacaoProjeto.SUBMETIDO // Default value
  };

  autoresDisponiveis: Autor[] = [];
  premiosDisponiveis: Premio[] = [];
  areaTematicaOptions = Object.values(AreaTematica);
  situacaoProjetoOptions = Object.values(SituacaoProjeto);

  constructor(
    private projetoService: ProjetoService,
    private autorService: AutorService, // Inject AutorService
    private premioService: PremioService, // Inject PremioService
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadAutores();
    this.loadPremios();
  }

  loadAutores(): void {
    this.autorService.getAutores().subscribe({
      next: (data) => {
        this.autoresDisponiveis = data;
      },
      error: (err) => {
        console.error('Error loading autores:', err);
      }
    });
  }

  loadPremios(): void {
    this.premioService.getPremios().subscribe({
      next: (data) => {
        // Filter for active/future prizes if needed, similar to prototype
        this.premiosDisponiveis = data.filter(premio => premio.status); // Example filter
      },
      error: (err) => {
        console.error('Error loading premios:', err);
      }
    });
  }

  onCriarProjeto(): void {
    // Map selected author IDs to the format expected by the backend
    const autorIds = this.novoProjeto.autores?.map(autor => autor.id) || [];

    const projetoToCreate = {
      ...this.novoProjeto,
      autorIds: autorIds, // Backend expects autorIds array
      dataCadastro: new Date(), // Set current date
      status: true // Set default status
    };

    this.projetoService.createProjeto(projetoToCreate).subscribe({
      next: (projeto) => {
        console.log('Projeto criado com sucesso:', projeto);
        this.router.navigate(['/projetos']); // Navigate back to list
      },
      error: (err) => {
        console.error('Erro ao criar projeto:', err);
        // Handle error (e.g., show error message)
      }
    });
  }

  cancelarCriacao(): void {
    if (confirm('Tem certeza que deseja cancelar a criação do projeto? Os dados não salvos serão perdidos.')) {
      this.router.navigate(['/projetos']);
    }
  }
}
