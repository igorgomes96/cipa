import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavigationType } from '../app.component';
import { EleitoresListaComponent } from './eleitores-lista/eleitores-lista.component';
import { EleitoresFormComponent } from './eleitores-form/eleitores-form.component';
import { EleicaoResolverService } from '../core/resolvers/eleicao-resolver.service';

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
        component: EleitoresFormComponent
      },
      {
        path: ':id',
        component: EleitoresFormComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EleitoresRoutingModule { }
