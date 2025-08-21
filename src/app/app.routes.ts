import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { ListarProjetosComponent } from './projetos/listar-projetos/listar-projetos.component';
import { CriarProjetoComponent } from './projetos/criar-projeto/criar-projeto.component';
import { ListarAutorComponent } from './autores/listar-autor/listar-autor.component';
import { CriarAutorComponent } from './autores/criar-autor/criar-autor.component';
import { ListarPremiosComponent } from './premios/listar-premios/listar-premios.component';
import { CriarPremioComponent } from './premios/criar-premio/criar-premio.component';
import { ListarAvaliadorComponent } from './avaliadores/listar-avaliador/listar-avaliador.component';
import { CriarAvaliadorComponent } from './avaliadores/criar-avaliador/criar-avaliador.component';
import { AvaliarProjetoComponent } from './projetos/avaliar-projeto/avaliar-projeto.component';
import { VisualizarProjetoComponent } from './projetos/visualizar-projeto/visualizar-projeto.component';
import { EditarProjetoComponent } from './projetos/editar-projeto/editar-projeto.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'dashboard', component: LoginComponent, canActivate: [AuthGuard] }, // Placeholder protected route
  { path: 'projetos', component: ListarProjetosComponent, canActivate: [AuthGuard] },
  { path: 'projetos/criar', component: CriarProjetoComponent, canActivate: [AuthGuard] },
  { path: 'autores', component: ListarAutorComponent, canActivate: [AuthGuard] },
  { path: 'autores/criar', component: CriarAutorComponent, canActivate: [AuthGuard] },
  { path: 'premios', component: ListarPremiosComponent, canActivate: [AuthGuard] },
  { path: 'premios/criar', component: CriarPremioComponent, canActivate: [AuthGuard] },
  { path: 'avaliadores', component: ListarAvaliadorComponent, canActivate: [AuthGuard] },
  { path: 'avaliadores/criar', component: CriarAvaliadorComponent, canActivate: [AuthGuard] },
  { path: 'projetos/:id/avaliar', component: AvaliarProjetoComponent, canActivate: [AuthGuard] },
  { path: 'projetos/:id', component: VisualizarProjetoComponent, canActivate: [AuthGuard] },
  { path: 'projetos/:id/editar', component: EditarProjetoComponent, canActivate: [AuthGuard] },
  // Add other routes here later
];
