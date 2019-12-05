import { UsuarioResolverService } from '@core/resolvers/usuario-resolver.service';
import { ContaResolverService } from '@core/resolvers/conta-resolver.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContaUsuarioComponent } from './pages/conta-usuario/conta-usuario.component';
import { NavigationType } from 'src/app/app.component';
import { UsuarioNovoComponent } from './pages/usuario-novo/usuario-novo.component';
import { UsuarioEdicaoComponent } from './pages/usuario-edicao/usuario-edicao.component';

const routes: Routes = [
  {
    path: '',
    data: {
      navigationType: NavigationType.Top
    },
    children: [
      {
        path: 'minha-conta',
        component: ContaUsuarioComponent,
        resolve: {
          conta: ContaResolverService
        }
      },
      {
        path: 'usuarios',
        children: [
          {
            path: 'novo',
            component: UsuarioNovoComponent
          },
          {
            path: ':id',
            component: UsuarioEdicaoComponent,
            resolve: {
              usuario: UsuarioResolverService
            }
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContasRoutingModule { }
