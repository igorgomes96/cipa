
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VotacoesRoutingModule } from './votacoes-routing.module';
import { VotacaoComponent } from './votacao/votacao.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [VotacaoComponent],
  imports: [
    CommonModule,
    SharedModule,
    VotacoesRoutingModule
  ]
})
export class VotacoesModule { }
