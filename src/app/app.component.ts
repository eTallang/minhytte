import { Component } from '@angular/core';

import { SwService } from './core/sw.service';

@Component({
  selector: 'mh-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private swService: SwService) {}
}
