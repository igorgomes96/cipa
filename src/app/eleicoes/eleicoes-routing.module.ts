import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EleicoesListaComponent } from './eleicoes-lista/eleicoes-lista.component';
import { EleicoesFormComponent } from './eleicoes-form/eleicoes-form.component';
import { NavigationType } from '../app.component';
import { EleicaoResolverService } from '../core/resolvers/eleicao-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: EleicoesListaComponent,
    data: {
      navigationType: NavigationType.Top
    }
  },
  {
    path: 'nova',
    component: EleicoesFormComponent,
    data: {
      navigationType: NavigationType.Top
    }
  },
  {
    path: ':id',
    data: {
      breadcrumb: 'Eleições',
      title: 'Eleições'
    },
    children: [
      {
        path: '',
        component: EleicoesFormComponent,
        resolve: {
          eleicao: EleicaoResolverService
        },
        data: {
          navigationType: NavigationType.Top
        }
      },
      {
        path: 'dashboard',
        loadChildren: '../dashboard/dashboard.module#DashboardModule',
      },
      {
        path: 'cronograma',
        loadChildren: '../cronograma/cronograma.module#CronogramaModule'
      },
      {
        path: 'eleitores',
        loadChildren: '../eleitores/eleitores.module#EleitoresModule'
      },
      {
        path: 'candidaturas',
        loadChildren: '../candidaturas/candidaturas.module#CandidaturasModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EleicoesRoutingModule { }
