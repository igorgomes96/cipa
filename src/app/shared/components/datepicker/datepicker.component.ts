import { Component, OnInit, Input, forwardRef, AfterViewInit } from '@angular/core';
import { AbstractControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LOCALE_ID } from '@angular/core';
import { formatDate } from '@angular/common';
import { race } from 'rxjs/operators';

declare var $: any;

export const CUSTOM_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => DatepickerComponent),
  multi: true,
};
@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css'],
  providers: [CUSTOM_VALUE_ACCESSOR, { provide: LOCALE_ID, useValue: 'pt-BR' }]
})
export class DatepickerComponent implements OnInit, AfterViewInit {

  @Input() name: string;
  @Input() label: string;
  @Input() id: string;
  @Input() control: AbstractControl;
  @Input() readOnly = true;
  @Input() inputClasses = '';
  @Input() placeholder = '';

  // private innerValue: any;  // Valor de fato
  value: any; // Texto exibido no controle
  public hasError = false;

  private isDisabled = false;
  private jDate: any;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    $.fn.datepicker.dates['pt-BR'] = {
      days: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
      daysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
      daysMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sá'],
      months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      today: 'Hoje',
      clear: 'Limpar',
      format: 'dd/mm/yyyy',
      titleFormat: 'MM yyyy', /* Leverages same syntax as 'format' */
      weekStart: 0
    };
    this.updateDatePicker();
  }
  onChange: (_: any) => void = () => { };
  onTouch: (_: any) => void = () => { };

  updateValue(valor: any) {
    if (valor != null) {
      this.value = formatDate(valor as Date, 'dd/MM/yyyy', 'pt-BR');
    } else {
      this.value = '';
    }
  }

  updateDatePicker(isDisabled = false) {
    this.jDate = $(`#${this.id}`).datepicker({
      keyboardNavigation: false,
      forceParse: false,
      calendarWeeks: false,
      autoclose: true,
      language: 'pt-BR',
    });
    if (this.control.value) {
      this.jDate.datepicker('setDate', formatDate(this.control.value as Date, 'dd/MM/yyyy', 'pt-BR'));
    }
    this.jDate.on('changeDate', (e: { date: any; }) => {
      this.pushChanges(e.date);
    });

  }

  pushChanges(valor: any) {
    this.updateValue(valor);
    this.onChange(valor);
  }


  writeValue(valor: any): void {
    if (valor != null) {
      this.value = formatDate(valor as Date, 'dd/MM/yyyy', 'pt-BR');
      if (this.jDate) {
        this.jDate.datepicker('setDate', formatDate(valor as Date, 'dd/MM/yyyy', 'pt-BR'));
      }
    } else {
      this.value = '';
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    this.updateDatePicker(isDisabled);
  }

}
