import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mh-separator',
  template: '',
  styleUrls: ['./separator.component.scss'],
  host: {
    role: 'separator'
  }
})
export class SeparatorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
