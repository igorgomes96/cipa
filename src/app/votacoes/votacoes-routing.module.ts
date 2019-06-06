import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VotacaoComponent } from './votacao/votacao.component';
import { NavigationType } from '../app.component';

const routes: Routes = [
  {
    path: '',
    component: VotacaoComponent,
    data: {
      navigationType: NavigationType.Top,
      // breadcrumb: 'Votação',
      // title: 'Votação'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VotacoesRoutingModule { }
