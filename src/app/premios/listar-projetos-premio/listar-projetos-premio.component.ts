import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProjetoService } from '../../projetos/projeto.service';
import { Projeto, SituacaoProjeto } from '../../models/projeto.model';
import { PremioService } from '../premio.service';
import { Premio } from '../../models/premio.model';

@Component({
  selector: 'app-listar-projetos-premio',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './listar-projetos-premio.component.html',
  styleUrl: './listar-projetos-premio.component.scss'
})
export class ListarProjetosPremioComponent implements OnInit {
  premioId: number = 0;
  premio: Premio | undefined;
  projetos: Projeto[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projetoService: ProjetoService,
    private premioService: PremioService
  ) { }

  ngOnInit(): void {
    this.premioId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.premioId) {
      this.loadPremio();
      this.loadProjetosDoPremio();
    }
  }

  loadPremio(): void {
    this.premioService.getPremioById(this.premioId).subscribe({
      next: (data) => {
        this.premio = data;
      },
      error: (err) => {
        console.error('Erro ao carregar prêmio:', err);
        // Handle error (e.g., navigate back or show message)
      }
    });
  }

  loadProjetosDoPremio(): void {
    this.projetoService.getProjetosByPremio(this.premioId).subscribe({
      next: (data) => {
        this.projetos = data;
      },
      error: (err) => {
        console.error('Erro ao carregar projetos do prêmio:', err);
        // Handle error
      }
    });
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
    this.router.navigate(['/projetos', projetoId]);
  }

  goBack(): void {
    this.router.navigate(['/premios', this.premioId]);
  }
}
