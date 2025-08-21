
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AutorService } from '../autor.service';
import { Autor } from '../../models/autor.model';

@Component({
  selector: 'app-criar-autor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './criar-autor.component.html',
  styleUrl: './criar-autor.component.scss'
})
export class CriarAutorComponent {
  novoAutor: Partial<Autor> = {
    nome: '',
    email: '',
    cpf: '',
    telefone: '',
    instituicao: '',
    status: true
  };

  constructor(private autorService: AutorService, private router: Router) { }

  onCriarAutor(): void {
    this.autorService.createAutor(this.novoAutor).subscribe({
      next: (autor) => {
        console.log('Autor criado com sucesso:', autor);
        this.router.navigate(['/autores']);
      },
      error: (err) => {
        console.error('Erro ao criar autor:', err);
        // Handle error (e.g., show error message)
      }
    });
  }

  cancelarCriacao(): void {
    if (confirm('Tem certeza que deseja cancelar a criação do autor? Os dados não salvos serão perdidos.')) {
      this.router.navigate(['/autores']);
    }
  }
}
