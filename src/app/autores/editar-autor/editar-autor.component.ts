import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AutorService } from '../autor.service';
import { Autor } from '../../models/autor.model';

@Component({
  selector: 'app-editar-autor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-autor.component.html',
  styleUrls: ['./editar-autor.component.scss']
})
export class EditarAutorComponent implements OnInit {
  autorForm: Partial<Autor> = {};
  autorId: number | null = null;

  constructor(
    private autorService: AutorService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.autorId = +id;
        this.autorService.getAutorById(this.autorId).subscribe(data => {
          this.autorForm = { ...data };
        });
      }
    });
  }

  onSalvarAutor(): void {
    if (!this.autorId) return;

    this.autorService.updateAutor(this.autorId, this.autorForm).subscribe({
      next: () => {
        console.log('Autor atualizado com sucesso');
        this.router.navigate(['/autores', this.autorId]);
      },
      error: (err) => {
        console.error('Erro ao atualizar autor:', err);
      }
    });
  }

  cancelarEdicao(): void {
    if (confirm('Tem certeza que deseja cancelar a edição? As alterações não salvas serão perdidas.')) {
      this.router.navigate(['/autores', this.autorId]);
    }
  }
}
