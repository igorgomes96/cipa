import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavigationType } from '../../app.component';
import { EleitoresListaComponent } from './pages/eleitores-lista/eleitores-lista.component';
import { EleitoresFormComponent } from './components/eleitores-form/eleitores-form.component';
import { EleicaoResolverService } from '../../core/resolvers/eleicao-resolver.service';
import { EleitorResolverService } from '../../core/resolvers/eleitor-resolver.service';
import { EleitorNovoComponent } from './pages/eleitor-novo/eleitor-novo.component';
import { EleitorEdicaoComponent } from './pages/eleitor-edicao/eleitor-edicao.component';

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
        component: EleitorNovoComponent
      },
      {
        path: ':id',
        component: EleitorEdicaoComponent,
        resolve: {
          eleitor: EleitorResolverService
        }
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EleitoresRoutingModule { }
