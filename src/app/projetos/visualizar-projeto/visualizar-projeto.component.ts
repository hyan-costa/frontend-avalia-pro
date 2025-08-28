import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router'; // Import Router
import { ProjetoService } from '../projeto.service';
import { Projeto, SituacaoProjeto, AreaTematica } from '../../models/projeto.model';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-visualizar-projeto',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './visualizar-projeto.component.html',
  styleUrls: ['./visualizar-projeto.component.scss']
})
export class VisualizarProjetoComponent implements OnInit {
  projeto: Projeto | undefined;

  constructor(
    private route: ActivatedRoute,
    private projetoService: ProjetoService,
    private location: Location,
    private router: Router // Inject Router
  ) { }

  formatAreaTematica(area: AreaTematica): string {
    return area.replace(/_/g, ' ')
               .toLowerCase()
               .split(' ')
               .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
               .join(' ');
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.projetoService.getProjetoById(+id).subscribe(projeto => {
        this.projeto = projeto;
      });
    }
  }

  goBack(): void {
    this.location.back();
  }

  getProjectStatusBadgeClass(status: SituacaoProjeto): string {
    switch (status) {
      case SituacaoProjeto.SUBMETIDO:
        return 'bg-info text-white';
      case SituacaoProjeto.EM_AVALIACAO:
        return 'bg-primary text-white';
      case SituacaoProjeto.AVALIADO_APROVADO:
        return 'bg-success text-white';
      case SituacaoProjeto.AVALIADO_REPROVADO:
        return 'bg-danger text-white';
      case SituacaoProjeto.PENDENTE_AJUSTES:
        return 'bg-warning text-dark';
      case SituacaoProjeto.CONCLUIDO:
        return 'bg-secondary text-white';
      default:
        return 'bg-light text-dark';
    }
  }

  avaliarProjeto(): void {
    if (this.projeto && this.projeto.id) {
      this.router.navigate(['/projetos', this.projeto.id, 'avaliar']);
    }
  }
}