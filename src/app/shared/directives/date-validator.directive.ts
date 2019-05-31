import { Directive } from '@angular/core';
import { Validator, FormControl, NG_VALIDATORS } from '@angular/forms';

import {FormValidators } from '../form-validators';

@Directive({
  selector: '[date-validation][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: DateValidatorDirective, multi: true }
  ]
})
export class DateValidatorDirective implements Validator {

  constructor() { }

  validate(control: FormControl) {
    return FormValidators.date(control);
  }

}
