import { NgModule } from '@angular/core';

import { EleicoesRoutingModule } from './eleicoes-routing.module';
import { EleicoesListaComponent } from './pages/eleicoes-lista/eleicoes-lista.component';
import { EleicaoNovaComponent } from './pages/eleicao-nova/eleicao-nova.component';
import { SharedModule } from '../../shared/shared.module';
import { GestaoFormComponent } from './components/gestao-form/gestao-form.component';

@NgModule({
  declarations: [EleicoesListaComponent, EleicaoNovaComponent, GestaoFormComponent],
  imports: [
    SharedModule,
    EleicoesRoutingModule
  ]
})
export class EleicoesModule { }
