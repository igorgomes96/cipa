import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioResolverService } from '@core/resolvers/usuario-resolver.service';
import { ContaResolverService } from '@core/resolvers/conta-resolver.service';
import { AdminGuard } from '@core/guards/admin.guard';
import { ContasResolverService } from '@core/resolvers/contas-resolver.service';

import { ContaUsuarioComponent } from './pages/conta-usuario/conta-usuario.component';
import { NavigationType } from 'src/app/app.component';
import { UsuarioNovoComponent } from './pages/usuario-novo/usuario-novo.component';
import { UsuarioEdicaoComponent } from './pages/usuario-edicao/usuario-edicao.component';
import { ContasListaComponent } from './pages/contas-lista/contas-lista.component';
import { AdministradoresComponent } from './pages/administradores/administradores.component';
import { UsuarioAdminNovoComponent } from './pages/usuario-admin-novo/usuario-admin-novo.component';
import { UsuarioAdminEdicaoComponent } from './pages/usuario-admin-edicao/usuario-admin-edicao.component';

const routes: Routes = [
  {
    path: '',
    data: {
      navigationType: NavigationType.Top
    },
    children: [
      {
        path: '',
        component: ContasListaComponent,
        canActivate: [AdminGuard],
        resolve: {
          contas: ContasResolverService
        },
        data: {
          navigationType: NavigationType.Top
        }
      },
      {
        path: 'minha-conta',
        component: ContaUsuarioComponent,
        resolve: {
          conta: ContaResolverService
        }
      },
      {
        path: 'administradores',
        children: [
          {
            path: '',
            component: AdministradoresComponent,
            canActivate: [AdminGuard]
          },
          {
            path: 'usuarios',
            children: [
              {
                path: 'novo',
                component: UsuarioAdminNovoComponent,
                canActivate: [AdminGuard]
              },
              {
                path: ':id',
                component: UsuarioAdminEdicaoComponent,
                resolve: {
                  usuario: UsuarioResolverService
                },
                canActivate: [AdminGuard]
              }
            ]
          }
        ]
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
