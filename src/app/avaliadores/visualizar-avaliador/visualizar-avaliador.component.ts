import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AvaliadorService } from '../avaliador.service';
import { Avaliador } from '../../models/avaliador.model';
import { Projeto } from '../../models/projeto.model'; // Importar o modelo Projeto
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-visualizar-avaliador',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './visualizar-avaliador.component.html',
  styleUrls: ['./visualizar-avaliador.component.scss']
})
export class VisualizarAvaliadorComponent implements OnInit {
  avaliador: Avaliador | undefined;
  totalProjetos: number | undefined;
  mediaNotas: number | undefined;
  projetosAvaliados: Projeto[] = []; // Usar o modelo Projeto

  constructor(
    private route: ActivatedRoute,
    private avaliadorService: AvaliadorService,
    private location: Location
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const avaliadorId = +id;
      this.avaliadorService.getAvaliadorById(avaliadorId).subscribe(avaliador => {
        this.avaliador = avaliador;
      });

      this.avaliadorService.countProjetosAvaliador(avaliadorId).subscribe(count => {
        this.totalProjetos = count;
      });

      this.avaliadorService.mediaNotasAvaliador(avaliadorId).subscribe(media => {
        this.mediaNotas = media;
      });

      this.avaliadorService.getProjetosAvaliador(avaliadorId).subscribe(projetos => {
        this.projetosAvaliados = projetos;
      });
    }
  }

  getInitials(name: string): string {
    if (!name) {
      return '';
    }
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return `${names[0][0]}`.toUpperCase();
  }

  goBack(): void {
    this.location.back();
  }
}
