
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PremioService } from '../premio.service';
import { Premio } from '../../models/premio.model';

@Component({
  selector: 'app-criar-premio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './criar-premio.component.html',
  styleUrl: './criar-premio.component.scss'
})
export class CriarPremioComponent {
  novoPremio: Partial<Premio> = {
    nome: '',
    descricao: '',
    dataInicio: new Date(),
    dataFim: new Date(),
    detalheCronograma: '',
    anoEdicao: new Date().getFullYear(),
    status: true
  };

  constructor(private premioService: PremioService, private router: Router) { }

  onCriarPremio(): void {
    const payload = { ...this.novoPremio };

    // Garante que a dataInicio seja um objeto Date no formato correto (UTC)
    if (payload.dataInicio) {
      // new Date() aceita tanto strings 'YYYY-MM-DD' quanto objetos Date
      const startDate = new Date(payload.dataInicio);
      startDate.setUTCHours(0, 0, 0, 0); // Zera o tempo para o início do dia em UTC
      payload.dataInicio = startDate;
    }

    // Garante que a dataFim seja um objeto Date no formato correto (UTC)
    if (payload.dataFim) {
      const endDate = new Date(payload.dataFim);
      endDate.setUTCHours(23, 59, 59, 999); // Define o tempo para o final do dia em UTC
      payload.dataFim = endDate;
    }

    this.premioService.createPremio(payload).subscribe({
      next: (premio) => {
        console.log('Premio criado com sucesso:', premio);
        this.router.navigate(['/premios']);
      },
      error: (err) => {
        console.error('Erro ao criar premio:', err);
        // Adicionar tratamento de erro para o usuário, se necessário
      }
    });
  }

  cancelarCriacao(): void {
    if (confirm('Tem certeza que deseja cancelar a criação do prêmio? Os dados não salvos serão perdidos.')) {
      this.router.navigate(['/premios']);
    }
  }
}
