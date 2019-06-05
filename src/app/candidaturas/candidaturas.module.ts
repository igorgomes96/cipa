import { NgModule } from '@angular/core';

import { CandidaturasRoutingModule } from './candidaturas-routing.module';
import { CandidaturasPendentesComponent } from './candidaturas-pendentes/candidaturas-pendentes.component';
import { CandidaturasAprovadasComponent } from './candidaturas-aprovadas/candidaturas-aprovadas.component';
import { CandidaturasReprovadasComponent } from './candidaturas-reprovadas/candidaturas-reprovadas.component';
import { SharedModule } from '../shared/shared.module';
import { CandidaturasFormComponent } from './candidaturas-form/candidaturas-form.component';

@NgModule({
  declarations: [CandidaturasPendentesComponent, CandidaturasAprovadasComponent, CandidaturasReprovadasComponent, CandidaturasFormComponent],
  imports: [
    SharedModule,
    CandidaturasRoutingModule
  ]
})
export class CandidaturasModule { }
