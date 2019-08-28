import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[appCountChar]'
})
export class CountCharDirective {

  @HostBinding('textarea') input: any;
  constructor() {
    console.log('teste', this.input);
  }

}
