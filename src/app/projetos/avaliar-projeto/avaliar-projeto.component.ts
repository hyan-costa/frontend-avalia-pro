
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjetoService } from '../projeto.service';
import { AvaliadorService } from '../../avaliadores/avaliador.service';
import { Projeto, SituacaoProjeto, AreaTematica } from '../../models/projeto.model';
import { Avaliador } from '../../models/avaliador.model';

@Component({
  selector: 'app-avaliar-projeto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './avaliar-projeto.component.html',
  styleUrl: './avaliar-projeto.component.scss'
})
export class AvaliarProjetoComponent implements OnInit {
  projetoId: number = 0;
  projeto: Projeto | undefined;
  avaliadoresDisponiveis: Avaliador[] = [];

  nota: number = 0;
  parecerDescritivo: string = '';
  situacao: SituacaoProjeto | '' = ''; // Changed to allow empty string for initial selection
  avaliadorSelecionadoId: number = 0;

  // Only include relevant SituacaoProjeto values for evaluation recommendations
  situacaoOptions: SituacaoProjeto[] = [
    SituacaoProjeto.AVALIADO_APROVADO,
    SituacaoProjeto.AVALIADO_REPROVADO,
    SituacaoProjeto.PENDENTE_AJUSTES,
  ];

  SituacaoProjetoEnum = SituacaoProjeto;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projetoService: ProjetoService,
    private avaliadorService: AvaliadorService
  ) { }

  formatAreaTematica(area: AreaTematica): string {
    return area.replace(/_/g, ' ')
               .toLowerCase()
               .split(' ')
               .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
               .join(' ');
  }

  ngOnInit(): void {
    this.projetoId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.projetoId) {
      this.loadProjeto();
      this.loadAvaliadores();
    }
  }

  loadProjeto(): void {
    this.projetoService.getProjetoById(this.projetoId).subscribe({
      next: (data) => {
        this.projeto = data;
        // Pre-fill form if project already has evaluation data
        if (this.projeto.nota) this.nota = this.projeto.nota;
        if (this.projeto.parecerDescritivo) this.parecerDescritivo = this.projeto.parecerDescritivo;
        if (this.projeto.situacao) this.situacao = this.projeto.situacao;
        if (this.projeto.avaliadorId) this.avaliadorSelecionadoId = this.projeto.avaliadorId;
      },
      error: (err) => {
        console.error('Error loading projeto:', err);
        // Handle error (e.g., navigate away or show message)
      }
    });
  }

  loadAvaliadores(): void {
    this.avaliadorService.getAvaliadores().subscribe({
      next: (data) => {
        this.avaliadoresDisponiveis = data.filter(av => av.status); // Only active evaluators
      },
      error: (err) => {
        console.error('Error loading avaliadores:', err);
      }
    });
  }

  onAvaliarProjeto(): void {
    if (!this.projetoId || !this.avaliadorSelecionadoId || !this.nota || !this.parecerDescritivo || !this.situacao) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    this.projetoService.evaluateProjeto(
      this.projetoId,
      this.nota,
      this.parecerDescritivo,
      this.situacao as SituacaoProjeto, // Cast to SituacaoProjeto
      this.avaliadorSelecionadoId
    ).subscribe({
      next: (projetoAtualizado) => {
        console.log('Projeto avaliado com sucesso:', projetoAtualizado);
        this.router.navigate(['/projetos']); // Navigate back to projects list
      },
      error: (err) => {
        console.error('Erro ao avaliar projeto:', err);
        // Handle error
      }
    });
  }

  cancelarAvaliacao(): void {
    if (confirm('Tem certeza que deseja cancelar a avaliação? Os dados não salvos serão perdidos.')) {
      this.router.navigate(['/projetos']);
    }
  }

  formatarListaNomes(arrayDeObjetos: any[] | undefined): string {
    if (!arrayDeObjetos || arrayDeObjetos.length === 0) return 'N/A';
    return arrayDeObjetos.map(item => item.nome).join(', ');
  }
}
