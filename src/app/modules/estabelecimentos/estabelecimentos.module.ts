import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstabelecimentosRoutingModule } from './estabelecimentos-routing.module';
import { EstabelecimentosComponent } from './pages/estabelecimentos/estabelecimentos.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EstabelecimentoNovoComponent } from './pages/estabelecimento-novo/estabelecimento-novo.component';
import { EstabelecimentoEdicaoComponent } from './pages/estabelecimento-edicao/estabelecimento-edicao.component';


@NgModule({
  declarations: [EstabelecimentosComponent, EstabelecimentoNovoComponent, EstabelecimentoEdicaoComponent],
  imports: [
    CommonModule,
    EstabelecimentosRoutingModule,
    SharedModule
  ]
})
export class EstabelecimentosModule { }
