import { EmpresaResolverService } from '@core/resolvers/empresa-resolver.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpresasComponent } from './pages/empresas/empresas.component';
import { NavigationType } from 'src/app/app.component';
import { EmpresasResolverService } from 'src/app/core/resolvers/empresas-resolver.service';
import { EmpresaNovaComponent } from './pages/empresa-nova/empresa-nova.component';
import { EmpresaEdicaoComponent } from './pages/empresa-edicao/empresa-edicao.component';

const routes: Routes = [
  {
    path: '',
    data: {
      navigationType: NavigationType.Top
    },
    children: [
      {
        path: '',
        resolve: {
          empresas: EmpresasResolverService
        },
        component: EmpresasComponent
      },
      {
        path: 'nova',
        component: EmpresaNovaComponent
      },
      {
        path: ':id',
        component: EmpresaEdicaoComponent,
        resolve: {
          empresa: EmpresaResolverService
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpresasRoutingModule { }
