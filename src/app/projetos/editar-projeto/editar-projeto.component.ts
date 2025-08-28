import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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
  styleUrls: ['./editar-projeto.component.scss']
})
export class EditarProjetoComponent implements OnInit {
  projetoForm: any = {}; // Usaremos 'any' para flexibilidade com autorIds e outros campos
  projetoId: number | null = null;

  autoresDisponiveis: Autor[] = [];
  premiosDisponiveis: Premio[] = [];
  avaliadoresDisponiveis: Avaliador[] = [];

  areaTematicaOptions: { value: AreaTematica, label: string }[];
  situacaoProjetoOptions = Object.values(SituacaoProjeto);

  constructor(
    private projetoService: ProjetoService,
    private autorService: AutorService,
    private premioService: PremioService,
    private avaliadorService: AvaliadorService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.areaTematicaOptions = Object.values(AreaTematica).map(area => ({
      value: area,
      label: this.formatAreaTematica(area)
    }));
  }

  private formatAreaTematica(area: AreaTematica): string {
    return area.replace(/_/g, ' ')
               .toLowerCase()
               .split(' ')
               .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
               .join(' ');
  }

  ngOnInit(): void {
    this.loadAutores();
    this.loadPremios();
    this.loadAvaliadores();

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.projetoId = +id;
        this.projetoService.getProjetoById(this.projetoId).subscribe(data => {
          this.projetoForm = {
            ...data,
            // Mapeia os objetos Autor para apenas seus IDs para o formulário
            autorIds: data.autores ? data.autores.map(autor => autor.id) : [],
            // Garante que premioId e avaliadorId sejam números ou null
            premioId: data.premioId || null,
            avaliadorId: data.avaliadorId || null,
          };
        });
      }
    });
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
        this.premiosDisponiveis = data.filter(premio => premio.status); // Apenas prêmios ativos
      },
      error: (err) => {
        console.error('Error loading premios:', err);
      }
    });
  }

  loadAvaliadores(): void {
    this.avaliadorService.getAvaliadores().subscribe({
      next: (data) => {
        this.avaliadoresDisponiveis = data.filter(avaliador => avaliador.status); // Apenas avaliadores ativos
      },
      error: (err) => {
        console.error('Error loading avaliadores:', err);
      }
    });
  }

  onSalvarProjeto(): void {
    if (!this.projetoId) return;

    // O payload deve corresponder ao UpdateProjetoDTO
    const payload = {
      ...this.projetoForm,
      // Garante que autorIds seja um array de números
      autorIds: this.projetoForm.autorIds || [],
      // Garante que premioId e avaliadorId sejam números ou null/undefined
      premioId: this.projetoForm.premioId === null ? undefined : this.projetoForm.premioId,
      avaliadorId: this.projetoForm.avaliadorId === null ? undefined : this.projetoForm.avaliadorId,
    };

    this.projetoService.updateProjeto(this.projetoId, payload).subscribe({
      next: (projetoAtualizado) => {
        console.log('Projeto atualizado com sucesso:', projetoAtualizado);
        this.router.navigate(['/projetos', this.projetoId]);
      },
      error: (err) => {
        console.error('Erro ao atualizar projeto:', err);
      }
    });
  }

  cancelarEdicao(): void {
    if (confirm('Tem certeza que deseja cancelar a edição? As alterações não salvas serão perdidas.')) {
      this.router.navigate(['/projetos', this.projetoId]);
    }
  }
}