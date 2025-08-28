import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AutorService } from '../autor.service';
import { Autor } from '../../models/autor.model';
import { Projeto } from '../../models/projeto.model'; // Importar o modelo Projeto
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-visualizar-autor',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './visualizar-autor.component.html',
  styleUrls: ['./visualizar-autor.component.scss']
})
export class VisualizarAutorComponent implements OnInit {
  autor: Autor | undefined;
  totalProjetos: number | undefined;
  mediaNotas: number | undefined;
  projetosAutor: Projeto[] = []; // Usar o modelo Projeto

  constructor(
    private route: ActivatedRoute,
    private autorService: AutorService,
    private location: Location
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const autorId = +id;
      this.autorService.getAutorById(autorId).subscribe(autor => {
        this.autor = autor;
      });

      this.autorService.countProjetosAutor(autorId).subscribe(count => {
        this.totalProjetos = count;
      });

      this.autorService.mediaNotasAutor(autorId).subscribe(media => {
        this.mediaNotas = media;
      });

      this.autorService.getProjetosByAutor(autorId).subscribe(projetos => {
        this.projetosAutor = projetos;
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
