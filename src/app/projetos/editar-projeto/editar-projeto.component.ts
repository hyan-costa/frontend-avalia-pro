
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjetoService } from '../projeto.service';
import { AutorService } from '../../autores/autor.service';
import { PremioService } from '../../premios/premio.service';
import { AvaliadorService } from '../../avaliadores/avaliador.service';
import { Projeto, AreaTematica, SituacaoProjeto } from '../../models/projeto.model';
import { Autor } from '../../models/autor.model';
import { Premio } from '../../models/premio.model';
import { Avaliador } from '../../models/avaliador.model';

@Component({
  selector: 'app-editar-projeto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-projeto.component.html',
  styleUrl: './editar-projeto.component.scss'
})
export class EditarProjetoComponent implements OnInit {
  projetoId: number = 0;
  projetoAtual: Partial<Projeto> = {};

  autoresDisponiveis: Autor[] = [];
  premiosDisponiveis: Premio[] = [];
  avaliadoresDisponiveis: Avaliador[] = [];

  areaTematicaOptions = Object.values(AreaTematica);
  situacaoProjetoOptions = Object.values(SituacaoProjeto);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projetoService: ProjetoService,
    private autorService: AutorService,
    private premioService: PremioService,
    private avaliadorService: AvaliadorService
  ) { }

  ngOnInit(): void {
    this.projetoId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.projetoId) {
      this.loadProjeto();
      this.loadAutores();
      this.loadPremios();
      this.loadAvaliadores();
    }
  }

  loadProjeto(): void {
    this.projetoService.getProjetoById(this.projetoId).subscribe({
      next: (data) => {
        this.projetoAtual = { ...data }; // Copy data to avoid direct mutation
        // Convert Date objects if necessary for date inputs
        if (this.projetoAtual.dataCadastro) {
          this.projetoAtual.dataCadastro = new Date(this.projetoAtual.dataCadastro);
        }
        // Pre-select authors
        if (this.projetoAtual.autores) {
          this.projetoAtual.autores = this.autoresDisponiveis.filter(autor => 
            this.projetoAtual.autores?.some(pa => pa.id === autor.id)
          );
        }
      },
      error: (err) => {
        console.error('Error loading projeto:', err);
        this.router.navigate(['/projetos']);
      }
    });
  }

  loadAutores(): void {
    this.autorService.getAutores().subscribe({
      next: (data) => {
        this.autoresDisponiveis = data;
        // Re-select authors after available authors are loaded
        if (this.projetoAtual.autores) {
          this.projetoAtual.autores = this.autoresDisponiveis.filter(autor => 
            this.projetoAtual.autores?.some(pa => pa.id === autor.id)
          );
        }
      },
      error: (err) => {
        console.error('Error loading autores:', err);
      }
    });
  }

  loadPremios(): void {
    this.premioService.getPremios().subscribe({
      next: (data) => {
        this.premiosDisponiveis = data.filter(premio => premio.status);
      },
      error: (err) => {
        console.error('Error loading premios:', err);
      }
    });
  }

  loadAvaliadores(): void {
    this.avaliadorService.getAvaliadores().subscribe({
      next: (data) => {
        this.avaliadoresDisponiveis = data.filter(av => av.status);
      },
      error: (err) => {
        console.error('Error loading avaliadores:', err);
      }
    });
  }

  onSalvarProjeto(): void {
    if (!this.projetoAtual.titulo || !this.projetoAtual.areaTematica || !this.projetoAtual.resumo || 
        !this.projetoAtual.autores || this.projetoAtual.autores.length === 0 || !this.projetoAtual.premioId || 
        !this.projetoAtual.situacao) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const autorIds = this.projetoAtual.autores?.map(autor => autor.id) || [];

    const projetoToUpdate = {
      ...this.projetoAtual,
      autorIds: autorIds,
      // Ensure dataCadastro is a Date object if needed by backend, or string
      dataCadastro: this.projetoAtual.dataCadastro ? new Date(this.projetoAtual.dataCadastro) : undefined
    };

    this.projetoService.updateProjeto(this.projetoId, projetoToUpdate).subscribe({
      next: (projeto) => {
        console.log('Projeto atualizado com sucesso:', projeto);
        this.router.navigate(['/projetos', this.projetoId]); // Navigate to details page
      },
      error: (err) => {
        console.error('Erro ao atualizar projeto:', err);
        // Handle error
      }
    });
  }

  cancelarEdicao(): void {
    if (confirm('Tem certeza que deseja cancelar a edição? As alterações não salvas serão perdidas.')) {
      this.router.navigate(['/projetos', this.projetoId]); // Navigate back to details page
    }
  }
}
