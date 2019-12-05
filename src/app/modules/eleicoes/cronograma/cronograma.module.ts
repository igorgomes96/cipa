
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CronogramaRoutingModule } from './cronograma-routing.module';
import { CronogramaComponent } from './pages/cronograma/cronograma.component';
import { SharedModule } from '@shared/shared.module';
import { TemplatesComponent } from './components/templates/templates.component';
import { InfoCronogramaComponent } from './components/info-cronograma/info-cronograma.component';
import { EtapaCronogramaComponent } from './components/etapa-cronograma/etapa-cronograma.component';
import { EtapaDimensionamentoComponent } from './components/etapa-dimensionamento/etapa-dimensionamento.component';
import { EtapaPercentualVotosComponent } from './components/etapa-percentual-votos/etapa-percentual-votos.component';


@NgModule({
  declarations: [
    CronogramaComponent,
    TemplatesComponent,
    InfoCronogramaComponent,
    EtapaCronogramaComponent,
    EtapaDimensionamentoComponent,
    EtapaPercentualVotosComponent
  ],
  imports: [
    CommonModule,
    CronogramaRoutingModule,
    SharedModule
  ]
})
export class CronogramaModule { }
