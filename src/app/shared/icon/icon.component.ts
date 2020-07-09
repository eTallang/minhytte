import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'mh-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class IconComponent {
  @Input() size: 'small' | 'medium' | 'large' = 'large';
  @Input() name = '';
}
