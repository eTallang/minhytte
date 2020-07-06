import { Directive } from '@angular/core';

@Directive({
  selector: '[mhInput]',
  host: {
    class: 'mh-input'
  }
})
export class InputDirective {

  constructor() { }

}
