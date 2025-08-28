import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PremioService } from '../premio.service';
import { Premio } from '../../models/premio.model';

@Component({
  selector: 'app-editar-premio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-premio.component.html',
  styleUrls: ['./editar-premio.component.scss']
})
export class EditarPremioComponent implements OnInit {
  // Usamos um modelo específico para o formulário para evitar conflitos de tipo com o modelo Premio.
  premioForm: {
    nome?: string;
    descricao?: string;
    dataInicio?: string; // O input de data trabalha com strings no formato YYYY-MM-DD
    dataFim?: string;
    detalheCronograma?: string;
    anoEdicao?: number;
  } = {};
  premioId: number | null = null;

  constructor(
    private premioService: PremioService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.premioId = +id;
        this.premioService.getPremioById(this.premioId).subscribe(data => {
          // Popula o modelo do formulário com os dados do prêmio, formatando as datas para string
          this.premioForm = {
            ...data,
            dataInicio: this.formatDateForInput(data.dataInicio),
            dataFim: this.formatDateForInput(data.dataFim),
          };
        });
      }
    });
  }

  formatDateForInput(date: Date | string): string {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getUTCFullYear();
    const month = ('0' + (d.getUTCMonth() + 1)).slice(-2);
    const day = ('0' + d.getUTCDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  onSalvarPremio(): void {
    if (!this.premioId || !this.premioForm) return;

    // Monta o payload para a API, convertendo as datas de string de volta para objeto Date
    const payload = {
        nome: this.premioForm.nome,
        descricao: this.premioForm.descricao,
        anoEdicao: this.premioForm.anoEdicao,
        detalheCronograma: this.premioForm.detalheCronograma,
        dataInicio: this.premioForm.dataInicio ? new Date(`${this.premioForm.dataInicio}T00:00:00.000Z`) : undefined,
        dataFim: this.premioForm.dataFim ? new Date(`${this.premioForm.dataFim}T23:59:59.999Z`) : undefined,
    };

    this.premioService.updatePremio(this.premioId, payload).subscribe({
      next: (premioAtualizado) => {
        console.log('Prêmio atualizado com sucesso:', premioAtualizado);
        this.router.navigate(['/premios', this.premioId]);
      },
      error: (err) => {
        console.error('Erro ao atualizar prêmio:', err);
      }
    });
  }

  cancelarEdicao(): void {
    if (confirm('Tem certeza que deseja cancelar a edição? As alterações não salvas serão perdidas.')) {
      this.router.navigate(['/premios', this.premioId]);
    }
  }
}
