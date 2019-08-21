import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavigationType } from '../../app.component';
import { VotacaoComponent } from './pages/votacao/votacao.component';
import { EleicaoResolverService } from 'src/app/core/resolvers/eleicao-resolver.service';
import { VotoDuplicadoGuard } from 'src/app/core/guards/voto-duplicado.guard';
import { EtapaVotacaoGuard } from 'src/app/core/guards/etapa-votacao.guard';

const routes: Routes = [
  {
    path: '',
    component: VotacaoComponent,
    data: {
      navigationType: NavigationType.Top,
    },
    resolve: {
      eleicao: EleicaoResolverService
    },
    canActivate: [EtapaVotacaoGuard, VotoDuplicadoGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VotacoesRoutingModule { }
