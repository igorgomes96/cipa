
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CronogramaRoutingModule } from './cronograma-routing.module';
import { CronogramaComponent } from './pages/cronograma/cronograma.component';
import { SharedModule } from '../../shared/shared.module';
import { TemplatesComponent } from './components/templates/templates.component';
import { InfoCronogramaComponent } from './components/info-cronograma/info-cronograma.component';

@NgModule({
  declarations: [CronogramaComponent, TemplatesComponent, InfoCronogramaComponent],
  imports: [
    CommonModule,
    CronogramaRoutingModule,
    SharedModule
  ]
})
export class CronogramaModule { }
