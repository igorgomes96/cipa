
import { NgModule } from '@angular/core';

import { EleitoresRoutingModule } from './eleitores-routing.module';
import { EleitoresListaComponent } from './pages/eleitores-lista/eleitores-lista.component';
import { EleitoresFormComponent } from './components/eleitores-form/eleitores-form.component';
import { SharedModule } from '../../shared/shared.module';
import { EleitorNovoComponent } from './pages/eleitor-novo/eleitor-novo.component';
import { EleitorEdicaoComponent } from './pages/eleitor-edicao/eleitor-edicao.component';
import { InconsistenciasComponent } from './pages/inconsistencias/inconsistencias.component';

@NgModule({
  declarations: [EleitoresListaComponent, EleitoresFormComponent, EleitorNovoComponent, EleitorEdicaoComponent, InconsistenciasComponent],
  imports: [
    SharedModule,
    EleitoresRoutingModule
  ]
})
export class EleitoresModule { }
