import { Directive, Input } from '@angular/core';
import { Validator, FormControl, NG_VALIDATORS } from '@angular/forms';

import {FormValidators } from '../form-validators';

@Directive({
  selector: '[equalsto][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: EqualsToValidatorDirective, multi: true }
  ]
})
export class EqualsToValidatorDirective implements Validator {

  constructor() { }

  @Input('equalsto') otherField = '';
  validate(control: FormControl) {
    return FormValidators.equalsTo(this.otherField)(control);
  }

}
