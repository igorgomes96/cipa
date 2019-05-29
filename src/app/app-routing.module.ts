import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NavigationType } from './app.component';

const routes: Routes = [
  {
    path: 'home',
    component: LandingComponent,
    data: {
      navigationType: NavigationType.None
    }
  },
  {
    path: 'not-found', component: NotFoundComponent,
    data: {
      navigationType: NavigationType.None
    }
  },
  {
    path: 'autenticacao',
    loadChildren: './autenticacao/autenticacao.module#AutenticacaoModule',
    data: {
      navigationType: NavigationType.None
    }
  },
  {
    path: 'eleicoes',
    loadChildren: './eleicoes/eleicoes.module#EleicoesModule'
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
