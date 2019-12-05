
import { NgModule } from '@angular/core';

import { InscricoesRoutingModule } from './inscricoes-routing.module';
import { InscricoesPendentesComponent } from './pages/inscricoes-pendentes/inscricoes-pendentes.component';
import { InscricoesAprovadasComponent } from './pages/inscricoes-aprovadas/inscricoes-aprovadas.component';
import { InscricoesReprovadasComponent } from './pages/inscricoes-reprovadas/inscricoes-reprovadas.component';
import { SharedModule } from '@shared/shared.module';
import { InscricoesFormComponent } from './pages/inscricoes-form/inscricoes-form.component';
import { InscricoesListaComponent } from './components/inscricoes-lista/inscricoes-lista.component';
import { ReprovacoesListaComponent } from './components/reprovacoes-lista/reprovacoes-lista.component';

@NgModule({
  declarations: [
    InscricoesPendentesComponent,
    InscricoesAprovadasComponent,
    InscricoesReprovadasComponent,
    InscricoesFormComponent,
    InscricoesListaComponent,
    ReprovacoesListaComponent
  ],
  imports: [
    SharedModule,
    InscricoesRoutingModule
  ]
})
export class InscricoesModule { }
