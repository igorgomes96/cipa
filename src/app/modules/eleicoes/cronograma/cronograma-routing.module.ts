import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CronogramaComponent } from './pages/cronograma/cronograma.component';
import { NavigationType } from 'src/app/app.component';
import { EleicaoResolverService } from '@core/resolvers/eleicao-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: CronogramaComponent,
    data: {
      navigationType: NavigationType.Left,
      breadcrumb: 'Cronograma',
      title: 'Cronograma'
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
export class CronogramaRoutingModule { }
