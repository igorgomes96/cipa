import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavigationType } from '../../app.component';
import { VotacaoComponent } from './pages/votacao/votacao.component';
import { EleicaoResolverService } from 'src/app/core/resolvers/eleicao-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: VotacaoComponent,
    data: {
      navigationType: NavigationType.Top,
      // breadcrumb: 'Votação',
      // title: 'Votação'
    },
    resolve: {
      eleicao: EleicaoResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VotacoesRoutingModule { }
