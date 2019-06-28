import { NgModule } from '@angular/core';

import { EleicoesRoutingModule } from './eleicoes-routing.module';
import { EleicoesListaComponent } from './pages/eleicoes-lista/eleicoes-lista.component';
import { EleicoesFormComponent } from './pages/eleicoes-form/eleicoes-form.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [EleicoesListaComponent, EleicoesFormComponent],
  imports: [
    SharedModule,
    EleicoesRoutingModule
  ]
})
export class EleicoesModule { }
