import { ResultadoApuracaoResolverService } from './../../core/resolvers/resultado-apuracao-resolver.service';
import { ResultadoApuracao } from './../../shared/models/apuracao';
import { ApuracaoResolverService } from './../../core/resolvers/apuracao-resolver.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NavigationType } from '../../app.component';
import { EleicaoResolverService } from '../../core/resolvers/eleicao-resolver.service';
import { DimensionamentoResolverService } from 'src/app/core/resolvers/dimensionamento-resolver.service';
import { VotosResolverService } from 'src/app/core/resolvers/votos-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: {
      navigationType: NavigationType.Left,
      breadcrumb: 'Dashboard',
      title: 'Dashboard'
    },
    resolve: {
      eleicao: EleicaoResolverService,
      apuracao: ApuracaoResolverService,
      dimensionamento: DimensionamentoResolverService,
      resultado: ResultadoApuracaoResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
