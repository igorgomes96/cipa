import { NgModule } from '@angular/core';

import { EleicoesRoutingModule } from './eleicoes-routing.module';
import { EleicoesListaComponent } from './eleicoes-lista/eleicoes-lista.component';
import { EleicoesFormComponent } from './eleicoes-form/eleicoes-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [EleicoesListaComponent, EleicoesFormComponent],
  imports: [
    SharedModule,
    EleicoesRoutingModule
  ]
})
export class EleicoesModule { }
