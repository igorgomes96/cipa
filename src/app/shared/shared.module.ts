import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { TooltipModule } from 'ng2-tooltip-directive';
import { ChartsModule } from 'ng2-charts';
import { TextMaskModule } from 'angular2-text-mask';
import { NgxMaskModule, IConfig } from 'ngx-mask';

import { PanelComponent } from './components/panel/panel.component';
import { ArquivosComponent } from './components/arquivos/arquivos.component';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { ValidatorMessageComponent } from './components/validator-message/validator-message.component';
import { DateValidatorDirective } from './directives/date-validator.directive';
import { CardCandidatoComponent } from './components/card-candidato/card-candidato.component';
import { WizardComponent } from './components/wizard/wizard.component';
import { EmpresaSharedFormComponent } from './components/empresa-shared-form/empresa-shared-form.component';
import { EstabelecimentoSharedFormComponent } from './components/estabelecimento-shared-form/estabelecimento-shared-form.component';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { AjudaTooltipComponent } from './components/ajuda-tooltip/ajuda-tooltip.component';
import { LaddaModule } from 'angular2-ladda';
import { PaginationComponent } from './components/pagination/pagination.component';
import { EqualsToValidatorDirective } from './directives/equasto-validator.directive';
import { WidgetDashboardComponent } from './components/widget-dashboard/widget-dashboard.component';
import { CountCharDirective } from './directives/count-char.directive';
import { EstabelecimentosListaComponent } from './components/estabelecimentos-lista/estabelecimentos-lista.component';
import { EqualsValidatorDirective } from './directives/equas-validator.directive';
import { TimelineItemComponent } from './components/timeline-item/timeline-item.component';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};


@NgModule({
  declarations: [
    PanelComponent,
    ArquivosComponent,
    CustomInputComponent,
    ValidatorMessageComponent,
    DateValidatorDirective,
    EqualsToValidatorDirective,
    EqualsValidatorDirective,
    CardCandidatoComponent,
    WizardComponent,
    EmpresaSharedFormComponent,
    EstabelecimentoSharedFormComponent,
    DatepickerComponent,
    AjudaTooltipComponent,
    PaginationComponent,
    WidgetDashboardComponent,
    CountCharDirective,
    EstabelecimentosListaComponent,
    TimelineItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    TooltipModule,
    LaddaModule,
    ChartsModule,
    TextMaskModule,
    NgxMaskModule.forRoot(options)
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
    EqualsToValidatorDirective,
    EqualsValidatorDirective,
    CardCandidatoComponent,
    WizardComponent,
    EmpresaSharedFormComponent,
    EstabelecimentoSharedFormComponent,
    DatepickerComponent,
    TooltipModule,
    AjudaTooltipComponent,
    LaddaModule,
    PaginationComponent,
    ChartsModule,
    WidgetDashboardComponent,
    CountCharDirective,
    TextMaskModule,
    NgxMaskModule,
    EstabelecimentosListaComponent,
    TimelineItemComponent
  ]
})
export class SharedModule { }
