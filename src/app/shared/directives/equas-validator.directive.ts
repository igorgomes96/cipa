import { Directive, Input } from '@angular/core';
import { Validator, FormControl, NG_VALIDATORS } from '@angular/forms';

import {FormValidators } from '../form-validators';

@Directive({
  selector: '[equals][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: EqualsValidatorDirective, multi: true }
  ]
})
export class EqualsValidatorDirective implements Validator {

  constructor() { }

  // tslint:disable-next-line: no-input-rename
  @Input('equals') valor = '';
  validate(control: FormControl) {
    return FormValidators.equals(this.valor)(control);
  }

}
