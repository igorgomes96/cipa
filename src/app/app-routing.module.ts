import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './modules/not-found/pages/not-found/not-found.component';
import { NavigationType } from './app.component';
import { ForbiddenComponent } from './modules/forbidden/pages/forbidden/forbidden.component';
import { SesmtCanLoadGuard } from './core/guards/sesmt.canload.guard';
import { AuthCanLoadGuard } from './core/guards/auth.canload.guard';

const routes: Routes = [
  {
    path: 'not-found', component: NotFoundComponent,
    data: {
      navigationType: NavigationType.None
    }
  },
  {
    path: 'forbidden', component: ForbiddenComponent,
    data: {
      navigationType: NavigationType.None
    }
  },
  {
    path: 'autenticacao',
    loadChildren: () => import('./modules/autenticacao/autenticacao.module').then(m => m.AutenticacaoModule),
    data: {
      navigationType: NavigationType.None
    }
  },
  {
    path: 'eleicoes',
    loadChildren: () => import('./modules/eleicoes/eleicoes.module').then(m => m.EleicoesModule),
    canLoad: [AuthCanLoadGuard]
  },
  {
    path: 'empresas',
    loadChildren: () => import('./modules/empresas/empresas.module').then(m => m.EmpresasModule),
    canLoad: [AuthCanLoadGuard, SesmtCanLoadGuard]
  },
  {
    path: 'estabelecimentos',
    loadChildren: () => import('./modules/estabelecimentos/estabelecimentos.module').then(m => m.EstabelecimentosModule),
    canLoad: [AuthCanLoadGuard, SesmtCanLoadGuard]
  },
  {
    path: 'contas',
    loadChildren: () => import('./modules/contas/contas.module').then(m => m.ContasModule),
    canLoad: [AuthCanLoadGuard, SesmtCanLoadGuard]
  },
  { path: '', redirectTo: 'eleicoes', pathMatch: 'full' },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
