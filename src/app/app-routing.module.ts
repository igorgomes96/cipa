import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './modules/not-found/pages/not-found/not-found.component';
import { NavigationType } from './app.component';

const routes: Routes = [
  {
    path: 'not-found', component: NotFoundComponent,
    data: {
      navigationType: NavigationType.None
    }
  },
  {
    path: 'autenticacao',
    loadChildren: './modules/autenticacao/autenticacao.module#AutenticacaoModule',
    data: {
      navigationType: NavigationType.None
    }
  },
  {
    path: 'eleicoes',
    loadChildren: './modules/eleicoes/eleicoes.module#EleicoesModule'
  },
  { path: '', redirectTo: 'eleicoes', pathMatch: 'full' },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
