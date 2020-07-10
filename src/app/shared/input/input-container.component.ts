import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'mh-input-container',
  templateUrl: './input-container.component.html',
  styleUrls: ['./input-container.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InputContainerComponent {
  @Input() theme: 'light' | 'dark' = 'dark';
}
