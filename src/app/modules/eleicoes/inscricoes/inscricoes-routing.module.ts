import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InscricoesAprovadasComponent } from './pages/inscricoes-aprovadas/inscricoes-aprovadas.component';
import { NavigationType } from 'src/app/app.component';
import { EleicaoResolverService } from '@core/resolvers/eleicao-resolver.service';
import { InscricoesReprovadasComponent } from './pages/inscricoes-reprovadas/inscricoes-reprovadas.component';
import { InscricoesPendentesComponent } from './pages/inscricoes-pendentes/inscricoes-pendentes.component';
import { InscricoesFormComponent } from './pages/inscricoes-form/inscricoes-form.component';
import { EleitorGuard } from 'src/app/core/guards/eleitor.guard';
import { EtapaInscricaoGuard } from '@core/guards/etapa-inscricao.guard';
import { SesmtGuard } from 'src/app/core/guards/sesmt.guard';

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'Inscrições',
    },
    children: [
      {
        path: 'nova',
        component: InscricoesFormComponent,
        data: {
          navigationType: NavigationType.Top
        },
        resolve: {
          eleicao: EleicaoResolverService
        },
        canActivate: [EleitorGuard, EtapaInscricaoGuard]
      },
      {
        path: 'aprovadas',
        component: InscricoesAprovadasComponent,
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
        component: InscricoesReprovadasComponent,
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
        component: InscricoesPendentesComponent,
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
export class InscricoesRoutingModule { }
