import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstabelecimentosRoutingModule } from './estabelecimentos-routing.module';
import { EstabelecimentosComponent } from './pages/estabelecimentos/estabelecimentos.component';
import { EstabelecimentosListaComponent } from './components/estabelecimentos-lista/estabelecimentos-lista.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [EstabelecimentosComponent, EstabelecimentosListaComponent],
  imports: [
    CommonModule,
    EstabelecimentosRoutingModule,
    SharedModule
  ]
})
export class EstabelecimentosModule { }
