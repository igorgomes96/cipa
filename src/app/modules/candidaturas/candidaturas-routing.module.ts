import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CandidaturasAprovadasComponent } from './pages/candidaturas-aprovadas/candidaturas-aprovadas.component';
import { NavigationType } from '../../app.component';
import { EleicaoResolverService } from '../../core/resolvers/eleicao-resolver.service';
import { CandidaturasReprovadasComponent } from './pages/candidaturas-reprovadas/candidaturas-reprovadas.component';
import { CandidaturasPendentesComponent } from './pages/candidaturas-pendentes/candidaturas-pendentes.component';
import { CandidaturasFormComponent } from './pages/candidaturas-form/candidaturas-form.component';
import { EleitorGuard } from 'src/app/core/guards/eleitor.guard';
import { EtapaCandidaturaGuard } from 'src/app/core/guards/etapa-candidatura.guard';
import { SesmtGuard } from 'src/app/core/guards/sesmt.guard';

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'Candidaturas',
    },
    children: [
      {
        path: 'nova',
        component: CandidaturasFormComponent,
        data: {
          navigationType: NavigationType.Top
        },
        resolve: {
          eleicao: EleicaoResolverService
        },
        canActivate: [EleitorGuard, EtapaCandidaturaGuard]
      },
      {
        path: 'aprovadas',
        component: CandidaturasAprovadasComponent,
        data: {
          navigationType: NavigationType.Left,
          breadcrumb: 'Aprovações',
          title: 'Aprovações'
        },
        resolve: {
          eleicao: EleicaoResolverService
        },
        canActivate: [SesmtGuard]
      },
      {
        path: 'reprovadas',
        component: CandidaturasReprovadasComponent,
        data: {
          navigationType: NavigationType.Left,
          breadcrumb: 'Reprovações',
          title: 'Reprovações'
        },
        resolve: {
          eleicao: EleicaoResolverService
        },
        canActivate: [SesmtGuard]
      },
      {
        path: 'pendentes',
        component: CandidaturasPendentesComponent,
        data: {
          navigationType: NavigationType.Left,
          breadcrumb: 'Pendências',
          title: 'Pendências'
        },
        resolve: {
          eleicao: EleicaoResolverService
        },
        canActivate: [SesmtGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidaturasRoutingModule { }
