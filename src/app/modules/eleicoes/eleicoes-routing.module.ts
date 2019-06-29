import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EleicoesListaComponent } from './pages/eleicoes-lista/eleicoes-lista.component';
import { EleicoesFormComponent } from './pages/eleicoes-form/eleicoes-form.component';
import { NavigationType } from '../../app.component';
import { EleicaoResolverService } from '../../core/resolvers/eleicao-resolver.service';

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
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule),
        data: {
          breadcrumb: 'Eleições',
          title: 'Eleições'
        }
      },
      {
        path: 'cronograma',
        loadChildren: () => import('../cronograma/cronograma.module').then(m => m.CronogramaModule),
        data: {
          breadcrumb: 'Eleições',
          title: 'Eleições'
        }
      },
      {
        path: 'eleitores',
        loadChildren: () => import('../eleitores/eleitores.module').then(m => m.EleitoresModule),
        data: {
          breadcrumb: 'Eleições',
          title: 'Eleições'
        }
      },
      {
        path: 'candidaturas',
        loadChildren: () => import('../candidaturas/candidaturas.module').then(m => m.CandidaturasModule)
      },
      {
        path: 'votacao',
        loadChildren: () => import('../votacoes/votacoes.module').then(m => m.VotacoesModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EleicoesRoutingModule { }
