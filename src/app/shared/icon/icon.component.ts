import { Component, Input } from '@angular/core';

@Component({
  selector: 'mh-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent {
  @Input() size: 'small' | 'medium' | 'large' = 'large';
  @Input() theme: 'light' | 'dark' = 'dark';
  @Input() name = '';
}
