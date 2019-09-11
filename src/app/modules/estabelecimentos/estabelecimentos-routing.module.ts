import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstabelecimentosComponent } from './pages/estabelecimentos/estabelecimentos.component';
import { NavigationType } from 'src/app/app.component';
import { EstabelecimentosResolverService } from 'src/app/core/resolvers/estabelecimentos-resolver.service';


const routes: Routes = [
  {
    path: '',
    component: EstabelecimentosComponent,
    data: {
      navigationType: NavigationType.Top
    },
    resolve: {
      estabelecimentos: EstabelecimentosResolverService
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstabelecimentosRoutingModule { }
