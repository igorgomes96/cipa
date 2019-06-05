import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CandidaturasAprovadasComponent } from './candidaturas-aprovadas/candidaturas-aprovadas.component';
import { NavigationType } from '../app.component';
import { EleicaoResolverService } from '../core/resolvers/eleicao-resolver.service';
import { CandidaturasReprovadasComponent } from './candidaturas-reprovadas/candidaturas-reprovadas.component';
import { CandidaturasPendentesComponent } from './candidaturas-pendentes/candidaturas-pendentes.component';
import { CandidaturasFormComponent } from './candidaturas-form/candidaturas-form.component';

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'Candidaturas',
      title: 'Nova'
    },
    children: [
      {
        path: 'nova',
        component: CandidaturasFormComponent,
        data: {
          navigationType: NavigationType.Top,
          breadcrumb: 'Incrição',
          title: 'Inscrição'
        }
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
        }
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
        }
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
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidaturasRoutingModule { }
