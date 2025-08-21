
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
    this.premioService.createPremio(this.novoPremio).subscribe({
      next: (premio) => {
        console.log('Premio criado com sucesso:', premio);
        this.router.navigate(['/premios']);
      },
      error: (err) => {
        console.error('Erro ao criar premio:', err);
        // Handle error (e.g., show error message)
      }
    });
  }

  cancelarCriacao(): void {
    if (confirm('Tem certeza que deseja cancelar a criação do prêmio? Os dados não salvos serão perdidos.')) {
      this.router.navigate(['/premios']);
    }
  }
}
