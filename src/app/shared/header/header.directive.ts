import { Directive, HostBinding, OnInit, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';

@Directive({
  selector: '[mhHeader]',
  host: {
    'style.transition': 'box-sizing 300ms ease'
  }
})
export class HeaderDirective implements OnInit {
  topGap = 0;

  @HostBinding('style.boxShadow') get shadow() {
    if(this.topGap === 0) {
      return '0 1rem 2rem rgba(13, 23, 55, .2)';
    } else {
      return '0';
    }
  }

  constructor(private elementRef: ElementRef<HTMLElement>) { }

  ngOnInit(): void {
    fromEvent(document, 'scroll').subscribe(() => {
      console.log(this.elementRef.nativeElement.style.top);
    });
  }
}
