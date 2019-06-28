import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NavigationType } from '../../app.component';
import { EleicaoResolverService } from '../../core/resolvers/eleicao-resolver.service';

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
      eleicao: EleicaoResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
