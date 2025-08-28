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
import { VisualizarAvaliadorComponent } from './avaliadores/visualizar-avaliador/visualizar-avaliador.component';
import { VisualizarAutorComponent } from './autores/visualizar-autor/visualizar-autor.component';
import { VisualizarPremioComponent } from './premios/visualizar-premio/visualizar-premio.component';
import { EditarPremioComponent } from './premios/editar-premio/editar-premio.component';
import { EditarAvaliadorComponent } from './avaliadores/editar-avaliador/editar-avaliador.component';
import { EditarAutorComponent } from './autores/editar-autor/editar-autor.component';
import { ListarProjetosPremioComponent } from './premios/listar-projetos-premio/listar-projetos-premio.component';
import { RegisterComponent } from './auth/register/register.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/projetos', pathMatch: 'full' },
  { path: 'projetos', component: ListarProjetosComponent, canActivate: [AuthGuard] },
  { path: 'projetos/criar', component: CriarProjetoComponent, canActivate: [AuthGuard] },
  { path: 'autores', component: ListarAutorComponent, canActivate: [AuthGuard] },
  { path: 'autores/criar', component: CriarAutorComponent, canActivate: [AuthGuard] },
  { path: 'autores/:id', component: VisualizarAutorComponent, canActivate: [AuthGuard] },
  { path: 'autores/:id/editar', component: EditarAutorComponent, canActivate: [AuthGuard] },
  { path: 'premios', component: ListarPremiosComponent, canActivate: [AuthGuard] },
  { path: 'premios/criar', component: CriarPremioComponent, canActivate: [AuthGuard] },
  { path: 'premios/:id', component: VisualizarPremioComponent, canActivate: [AuthGuard] },
  { path: 'premios/:id/editar', component: EditarPremioComponent, canActivate: [AuthGuard] },
  { path: 'premios/:id/projetos', component: ListarProjetosPremioComponent, canActivate: [AuthGuard] },
  { path: 'avaliadores', component: ListarAvaliadorComponent, canActivate: [AuthGuard] },
  { path: 'avaliadores/criar', component: CriarAvaliadorComponent, canActivate: [AuthGuard] },
  { path: 'avaliadores/:id', component: VisualizarAvaliadorComponent, canActivate: [AuthGuard] },
  { path: 'avaliadores/:id/editar', component: EditarAvaliadorComponent, canActivate: [AuthGuard] },
  { path: 'projetos/:id/avaliar', component: AvaliarProjetoComponent, canActivate: [AuthGuard] },
  { path: 'projetos/:id', component: VisualizarProjetoComponent, canActivate: [AuthGuard] },
  { path: 'projetos/:id/editar', component: EditarProjetoComponent, canActivate: [AuthGuard] },
  // Add other routes here later
];
