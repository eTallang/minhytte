import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Subject } from 'rxjs';

interface MenuItem {
  name: string;
  icon: string;
  url: string;
}

@Component({
  selector: 'mh-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [
    trigger('height', [
      state(
        'void',
        style({
          transform: 'translateY(100%)',
        })
      ),
      state(
        '*',
        style({
          transform: 'translateY(0)',
        })
      ),
      transition('void <=> *', animate('350ms cubic-bezier(0, 0, 0.2, 1)')),
    ]),
  ],
  host: {
    '@height': ''
  }
})
export class MenuComponent {
  closeMenu = new Subject<void>();

  menuItems: MenuItem[] = [
    {
      name: 'Guider',
      icon: 'book',
      url: 'guides',
    },
    {
      name: 'Handleliste',
      icon: 'basket',
      url: 'shopping-list',
    },
    {
      name: 'Planer',
      icon: 'bulb',
      url: 'plans',
    },
    {
      name: 'Logg',
      icon: 'list',
      url: 'logg',
    },
    {
      name: 'Hyttebok',
      icon: 'clipboard',
      url: 'cabin-book',
    },
    {
      name: 'Turer',
      icon: 'boat',
      url: 'trips',
    },
    {
      name: 'Kontakter',
      icon: 'people',
      url: 'contacts',
    },
  ];

  onClose(): void {
    this.closeMenu.next();
    this.closeMenu.complete();
  }
}
