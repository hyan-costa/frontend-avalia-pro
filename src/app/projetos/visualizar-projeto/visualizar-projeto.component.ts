
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjetoService } from '../projeto.service';
import { Projeto } from '../../models/projeto.model';

@Component({
  selector: 'app-visualizar-projeto',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './visualizar-projeto.component.html',
  styleUrl: './visualizar-projeto.component.scss'
})
export class VisualizarProjetoComponent implements OnInit {
  projeto: Projeto | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projetoService: ProjetoService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.projetoService.getProjetoById(id).subscribe({
        next: (data) => {
          this.projeto = data;
        },
        error: (err) => {
          console.error('Error loading projeto:', err);
          // Handle error (e.g., navigate back or show message)
          this.router.navigate(['/projetos']);
        }
      });
    }
  }

  formatarDataSimples(dataString: Date): string {
    if (!dataString) return 'N/A';
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR');
  }

  formatarListaNomes(arrayDeObjetos: any[] | undefined): string {
    if (!arrayDeObjetos || arrayDeObjetos.length === 0) return 'N/A';
    return arrayDeObjetos.map(item => item.nome).join(', ');
  }

  voltar(): void {
    this.router.navigate(['/projetos']);
  }
}
