import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { AbstractControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LOCALE_ID } from '@angular/core';
import { formatDate } from '@angular/common';

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
export class DatepickerComponent implements OnInit {

  @Input() name: string;
  @Input() label: string;
  @Input() id: string;
  @Input() control: AbstractControl;
  @Input() readOnly = true;

  private innerValue: any;
  private value: any;
  public hasError = false;

  private jDate: any;

  constructor() { }

  ngOnInit() {
    this.jDate = $(`#${this.id} .input-group.date`).datepicker({
      todayBtn: 'linked',
      keyboardNavigation: false,
      forceParse: false,
      calendarWeeks: false,
      autoclose: true,
      language: 'pt-BR'
    });
    this.jDate.on('changeDate', (e: { date: any; }) => {
      this.pushChanges(e.date);
    });

  }

  onChange: (_: any) => void = () => { };
  onTouch: (_: any) => void = () => { };

  updateValue(valor: any) {
    if (valor != null) {
      this.innerValue = valor;
      this.value = formatDate(valor as Date, 'dd/MM/yyyy', 'pt-BR');
    } else {
      this.innerValue = '';
    }
  }

  pushChanges(valor: any) {
    this.updateValue(valor);
    this.onChange(this.innerValue);
  }


  writeValue(valor: any): void {
    if (valor !== null) {
      this.innerValue = valor;
      this.value = valor;
      this.jDate.datepicker('setDate', this.value);
    } else {
      this.innerValue = '';
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.readOnly = isDisabled;
  }

}
