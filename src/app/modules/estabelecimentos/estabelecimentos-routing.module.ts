import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstabelecimentosComponent } from './pages/estabelecimentos/estabelecimentos.component';
import { NavigationType } from 'src/app/app.component';
import { EstabelecimentosResolverService } from 'src/app/core/resolvers/estabelecimentos-resolver.service';
import { EstabelecimentoNovoComponent } from './pages/estabelecimento-novo/estabelecimento-novo.component';
import { EstabelecimentoEdicaoComponent } from './pages/estabelecimento-edicao/estabelecimento-edicao.component';
import { EstabelecimentoResolverService } from 'src/app/core/resolvers/estabelecimento-resolver.service';
import { EmpresasResolverService } from 'src/app/core/resolvers/empresas-resolver.service';


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
          estabelecimentos: EstabelecimentosResolverService
        },
        component: EstabelecimentosComponent
      },
      {
        path: 'novo',
        component: EstabelecimentoNovoComponent,
        resolve: {
          empresas: EmpresasResolverService
        }
      },
      {
        path: ':id',
        component: EstabelecimentoEdicaoComponent,
        resolve: {
          estabelecimento: EstabelecimentoResolverService,
          empresas: EmpresasResolverService
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstabelecimentosRoutingModule { }
