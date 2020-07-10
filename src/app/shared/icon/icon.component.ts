import { Component, Input, ViewEncapsulation, HostBinding } from '@angular/core';

@Component({
  selector: 'mh-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class IconComponent {
  @HostBinding('class.mh-icon-large') get largeClass() {
    return this.size === 'large';
  }

  @HostBinding('class.mh-icon-medium') get mediumClass() {
    return this.size === 'medium';
  }

  @HostBinding('class.mh-icon-small') get smallClass() {
    return this.size === 'small';
  }

  @Input() size: 'small' | 'medium' | 'large' = 'large';
  @Input() name = '';
}
