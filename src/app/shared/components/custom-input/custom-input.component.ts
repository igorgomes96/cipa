import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, AbstractControl } from '@angular/forms';
import { formatNumber, formatDate } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import localePt from '@angular/common/locales/pt';

import { distinctUntilChanged, filter } from 'rxjs/operators';

registerLocaleData(localePt);

export const CUSTOM_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => CustomInputComponent),
  multi: true,
};
@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.css'],
  providers: [CUSTOM_VALUE_ACCESSOR, { provide: LOCALE_ID, useValue: 'pt-BR' }]
})
export class CustomInputComponent implements OnInit, ControlValueAccessor {

  @Input() name: string;
  @Input() label: string;
  @Input() id: string;
  @Input() placeholder: string;
  @Input() type = 'text';
  @Input() control: AbstractControl;
  @Input() readOnly = false;
  @Input() addOnAfter: string = null;
  @Input() addOnBefore: string = null;
  @Input() formatNumber = '1.0-2';

  private innerValue: any;
  private value: any;
  private innerType = 'text';
  public hasError = false;

  constructor() { }

  ngOnInit() {
    if (!this.placeholder) {
      this.placeholder = this.label;
    }

    this.innerType = this.type;
    if (this.type === 'number' || this.type === 'date') {
      this.innerType = 'text';
    }

    if (this.type === 'date') {
      this.placeholder = 'dd/mm/aaaa';
    }

    this.control.statusChanges
      .pipe(distinctUntilChanged(), filter(_ => this.control.dirty))
      .subscribe(s => this.hasError = (s === 'INVALID'));

  }

  onChange: (_: any) => void = () => { };
  onTouch: (_: any) => void = () => { };

  toNumber(valor: any): number {
    if (!valor) {
      return 0;
    }
    try {
      return parseFloat(valor.toString().replace(/\./g, '').replace(',', '.'));
    } catch {
      return 0;
    }
  }

  updateValue(valor: any) {
    if (valor !== null) {
      switch (this.type) {
        case 'number':
          this.innerValue = this.toNumber(valor);
          break;
        case 'date':
          if (valor && (valor as string).length === 10) {
            const values: any[] = (valor as string).split('/');
            if (values.length !== 3) {
              this.innerValue = valor;
            } else {
              this.innerValue = new Date(values[2] as number, (values[1] as number) - 1, values[0] as number, 0, 0, 0);
            }
          } else {
            this.innerValue = valor;
          }
          break;
        default:
          this.innerValue = valor;
      }
      this.value = valor;
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
      switch (this.type) {
        case 'number':
          this.value = !valor ? 0 : formatNumber(valor, 'pt-BR', this.formatNumber);
          break;
        case 'date':
          this.value = valor ? formatDate(valor as Date, 'dd/MM/yyyy', 'pt-BR') : valor;
          break;
        default:
          this.value = valor;
      }
    } else {
      this.innerValue = '';
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
    if (this.type === 'date') {
      setTimeout(() => {
        this.innerValue = new Date(this.innerValue);
        this.onChange(this.innerValue);
      }, 100);
    }
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.readOnly = isDisabled;
  }
}
