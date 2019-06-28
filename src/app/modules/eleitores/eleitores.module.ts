
import { NgModule } from '@angular/core';

import { EleitoresRoutingModule } from './eleitores-routing.module';
import { EleitoresListaComponent } from './pages/eleitores-lista/eleitores-lista.component';
import { EleitoresFormComponent } from './pages/eleitores-form/eleitores-form.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [EleitoresListaComponent, EleitoresFormComponent],
  imports: [
    SharedModule,
    EleitoresRoutingModule
  ]
})
export class EleitoresModule { }
