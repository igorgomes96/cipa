import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { PanelComponent } from './components/panel/panel.component';
import { ArquivosComponent } from './components/arquivos/arquivos.component';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { ValidatorMessageComponent } from './components/validator-message/validator-message.component';
import { DateValidatorDirective } from './directives/date-validator.directive';
import { CardCandidatoComponent } from './components/card-candidato/card-candidato.component';
import { EtapaCronogramaComponent } from './components/etapa-cronograma/etapa-cronograma.component';
import { WizardComponent } from './components/wizard/wizard.component';

@NgModule({
  declarations: [
    PanelComponent,
    ArquivosComponent,
    CustomInputComponent,
    ValidatorMessageComponent,
    DateValidatorDirective,
    CardCandidatoComponent,
    EtapaCronogramaComponent,
    WizardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    PanelComponent,
    ArquivosComponent,
    ReactiveFormsModule,
    FormsModule,
    CustomInputComponent,
    ValidatorMessageComponent,
    DateValidatorDirective,
    CardCandidatoComponent,
    EtapaCronogramaComponent,
    WizardComponent
  ]
})
export class SharedModule { }
