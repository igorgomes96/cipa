
import { NgModule } from '@angular/core';

import { CandidaturasRoutingModule } from './candidaturas-routing.module';
import { CandidaturasPendentesComponent } from './pages/candidaturas-pendentes/candidaturas-pendentes.component';
import { CandidaturasAprovadasComponent } from './pages/candidaturas-aprovadas/candidaturas-aprovadas.component';
import { CandidaturasReprovadasComponent } from './pages/candidaturas-reprovadas/candidaturas-reprovadas.component';
import { SharedModule } from '../../shared/shared.module';
import { CandidaturasFormComponent } from './pages/candidaturas-form/candidaturas-form.component';

@NgModule({
  declarations: [CandidaturasPendentesComponent, CandidaturasAprovadasComponent, CandidaturasReprovadasComponent, CandidaturasFormComponent],
  imports: [
    SharedModule,
    CandidaturasRoutingModule
  ]
})
export class CandidaturasModule { }
