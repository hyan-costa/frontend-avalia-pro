
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AvaliadorService } from '../avaliador.service';
import { Avaliador, AreaEspecializacao } from '../../models/avaliador.model';

@Component({
  selector: 'app-criar-avaliador',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './criar-avaliador.component.html',
  styleUrl: './criar-avaliador.component.scss'
})
export class CriarAvaliadorComponent {
  novoAvaliador: Partial<Avaliador> = {
    nome: '',
    email: '',
    cpf: '',
    telefone: '',
    dataNascimento: new Date(),
    genero: '',
    instituicao: '',
    areaAtuacao: '',
    areaEspecializacao: AreaEspecializacao.DESENVOLVIMENTO_WEB, // Default value
    status: true
  };

  areaEspecializacaoOptions = Object.values(AreaEspecializacao);

  constructor(private avaliadorService: AvaliadorService, private router: Router) { }

  onCriarAvaliador(): void {
    this.avaliadorService.createAvaliador(this.novoAvaliador).subscribe({
      next: (avaliador) => {
        console.log('Avaliador criado com sucesso:', avaliador);
        this.router.navigate(['/avaliadores']);
      },
      error: (err) => {
        console.error('Erro ao criar avaliador:', err);
        // Handle error (e.g., show error message)
      }
    });
  }

  cancelarCriacao(): void {
    if (confirm('Tem certeza que deseja cancelar a criação do avaliador? Os dados não salvos serão perdidos.')) {
      this.router.navigate(['/avaliadores']);
    }
  }
}
