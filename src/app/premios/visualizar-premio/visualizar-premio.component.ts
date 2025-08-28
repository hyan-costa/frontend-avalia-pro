import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PremioService } from '../premio.service';
import { Premio } from '../../models/premio.model';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-visualizar-premio',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './visualizar-premio.component.html',
  styleUrls: ['./visualizar-premio.component.scss']
})
export class VisualizarPremioComponent implements OnInit {
  premio: Premio | undefined;

  constructor(
    private route: ActivatedRoute,
    private premioService: PremioService,
    private location: Location
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.premioService.getPremioById(+id).subscribe(premio => {
        this.premio = premio;
      });
    }
  }

  goBack(): void {
    this.location.back();
  }

  getStatus(premio: Premio): string {
    return premio.status ? 'Ativo' : 'Inativo';
  }

  getStatusClass(premio: Premio): string {
    return premio.status ? 'bg-success' : 'bg-danger';
  }
}
