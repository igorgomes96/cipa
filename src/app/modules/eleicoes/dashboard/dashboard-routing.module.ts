import { ResultadoApuracaoResolverService } from '@core/resolvers/resultado-apuracao-resolver.service';
import { ResultadoApuracao } from '@shared/models/apuracao';
import { ApuracaoResolverService } from '@core/resolvers/apuracao-resolver.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NavigationType } from 'src/app/app.component';
import { EleicaoResolverService } from '@core/resolvers/eleicao-resolver.service';
import { EtapaAnteriorVotacaoGuard } from 'src/app/core/guards/etapa-anterior-votacao.guard';

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
      // dimensionamento: DimensionamentoResolverService,
      resultado: ResultadoApuracaoResolverService
    },
    canActivate: [EtapaAnteriorVotacaoGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
