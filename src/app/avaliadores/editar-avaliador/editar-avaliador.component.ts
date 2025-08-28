import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AvaliadorService } from '../avaliador.service';
import { Avaliador, AreaEspecializacao } from '../../models/avaliador.model';

@Component({
  selector: 'app-editar-avaliador',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-avaliador.component.html',
  styleUrls: ['./editar-avaliador.component.scss']
})
export class EditarAvaliadorComponent implements OnInit {
  avaliadorForm: any = {};
  avaliadorId: number | null = null;
  areaEspecializacaoOptions: { value: AreaEspecializacao, label: string }[];

  constructor(
    private avaliadorService: AvaliadorService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.areaEspecializacaoOptions = Object.values(AreaEspecializacao).map(area => ({
      value: area,
      label: this.formatAreaEspecializacao(area)
    }));
  }

  private formatAreaEspecializacao(area: AreaEspecializacao): string {
    return area.replace(/_/g, ' ')
               .toLowerCase()
               .split(' ')
               .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
               .join(' ');
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.avaliadorId = +id;
        this.avaliadorService.getAvaliadorById(this.avaliadorId).subscribe(data => {
          this.avaliadorForm = {
            ...data,
            dataNascimento: this.formatDateForInput(data.dataNascimento),
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

  onSalvarAvaliador(): void {
    if (!this.avaliadorId) return;

    const payload = {
      ...this.avaliadorForm,
      dataNascimento: this.avaliadorForm.dataNascimento ? new Date(`${this.avaliadorForm.dataNascimento}T00:00:00.000Z`) : undefined,
    };

    this.avaliadorService.updateAvaliador(this.avaliadorId, payload).subscribe({
      next: () => {
        console.log('Avaliador atualizado com sucesso');
        this.router.navigate(['/avaliadores', this.avaliadorId]);
      },
      error: (err) => {
        console.error('Erro ao atualizar avaliador:', err);
      }
    });
  }

  cancelarEdicao(): void {
    if (confirm('Tem certeza que deseja cancelar a edição? As alterações não salvas serão perdidas.')) {
      this.router.navigate(['/avaliadores', this.avaliadorId]);
    }
  }
}
