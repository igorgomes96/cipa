
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CronogramaRoutingModule } from './cronograma-routing.module';
import { CronogramaComponent } from './pages/cronograma/cronograma.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [CronogramaComponent],
  imports: [
    CommonModule,
    CronogramaRoutingModule,
    SharedModule
  ]
})
export class CronogramaModule { }
