import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EleicoesListaComponent } from './pages/eleicoes-lista/eleicoes-lista.component';
import { NavigationType } from '../../app.component';
import { EleicaoNovaComponent } from './pages/eleicao-nova/eleicao-nova.component';
import { SesmtGuard } from 'src/app/core/guards/sesmt.guard';
import { SesmtCanLoadGuard } from 'src/app/core/guards/sesmt.canload.guard';
import { EleicaoConfiguracaoComponent } from './pages/eleicao-configuracao/eleicao-configuracao.component';
import { EleicaoResolverService } from '@core/resolvers/eleicao-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: EleicoesListaComponent,
    data: {
      navigationType: NavigationType.Top
    },
    children: [
      {
        path: ':id/configuracao',
        component: EleicaoConfiguracaoComponent,
        resolve: {
          eleicao: EleicaoResolverService
        }
      }
    ]
  },
  {
    path: 'nova',
    component: EleicaoNovaComponent,
    data: {
      navigationType: NavigationType.Top
    },
    canActivate: [SesmtGuard]
  },
  {
    path: ':id',
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        data: {
          breadcrumb: 'Eleições',
          title: 'Eleições'
        },
        canLoad: [SesmtCanLoadGuard]
      },
      {
        path: 'cronograma',
        loadChildren: () => import('./cronograma/cronograma.module').then(m => m.CronogramaModule),
        data: {
          breadcrumb: 'Eleições',
          title: 'Eleições'
        },
        canLoad: [SesmtCanLoadGuard]
      },
      {
        path: 'eleitores',
        loadChildren: () => import('./eleitores/eleitores.module').then(m => m.EleitoresModule),
        data: {
          breadcrumb: 'Eleições',
          title: 'Eleições'
        },
        canLoad: [SesmtCanLoadGuard]
      },
      {
        path: 'inscricoes',
        loadChildren: () => import('./inscricoes/inscricoes.module').then(m => m.InscricoesModule)
      },
      {
        path: 'votacao',
        loadChildren: () => import('./votacoes/votacoes.module').then(m => m.VotacoesModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EleicoesRoutingModule { }
