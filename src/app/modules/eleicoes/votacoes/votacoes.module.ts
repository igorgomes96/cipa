
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VotacoesRoutingModule } from './votacoes-routing.module';
import { SharedModule } from '@shared/shared.module';
import { VotacaoComponent } from './pages/votacao/votacao.component';

@NgModule({
  declarations: [VotacaoComponent],
  imports: [
    CommonModule,
    SharedModule,
    VotacoesRoutingModule
  ]
})
export class VotacoesModule { }
