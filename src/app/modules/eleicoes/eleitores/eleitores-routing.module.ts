import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavigationType } from 'src/app/app.component';
import { EleitoresListaComponent } from './pages/eleitores-lista/eleitores-lista.component';
import { EleicaoResolverService } from '@core/resolvers/eleicao-resolver.service';
import { EleitorResolverService } from '@core/resolvers/eleitor-resolver.service';
import { EleitorNovoComponent } from './pages/eleitor-novo/eleitor-novo.component';
import { EleitorEdicaoComponent } from './pages/eleitor-edicao/eleitor-edicao.component';
import { InconsistenciasComponent } from './pages/inconsistencias/inconsistencias.component';
import { InconsistenciasResolverService } from 'src/app/core/resolvers/inconsistencias-resolver.service';

const routes: Routes = [
  {
    path: '',
    data: {
      navigationType: NavigationType.Left,
      breadcrumb: 'Eleitores',
      title: 'Eleitores'
    },
    children: [
      {
        path: '',
        component: EleitoresListaComponent,
        resolve: {
          eleicao: EleicaoResolverService
        }
      },
      {
        path: 'novo',
        component: EleitorNovoComponent,
        resolve: {
          eleicao: EleicaoResolverService
        }
      },
      {
        path: ':id',
        component: EleitorEdicaoComponent,
        resolve: {
          eleitor: EleitorResolverService
        }
      }
    ]
  },
  {
    path: 'importacoes',
    children: [
      {
        path: ':id',
        children: [
          {
            path: 'inconsistencias',
            component: InconsistenciasComponent,
            resolve: {
              inconsistencias: InconsistenciasResolverService
            },
            data: {
              navigationType: NavigationType.Left,
              breadcrumb: 'Inconsistências',
              title: 'Inconsistências da Importação'
            }
          }
        ]
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EleitoresRoutingModule { }
