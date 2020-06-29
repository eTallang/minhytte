import { Component, HostBinding, HostListener } from '@angular/core';
import { trigger, state, style, transition, animate, AnimationEvent } from '@angular/animations';
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
    trigger('slideUp', [
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
      transition('void => *', animate('300ms ease-out')),
      transition('* => void', animate('300ms ease-in')),
    ]),
  ]
})
export class MenuComponent {
  @HostBinding('@slideUp') get slideIn() {
    return this.animationState;
  }

  private animationState = '*';
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

  @HostListener('@slideUp.done', ['$event'])
  onAnimationDone(ev: AnimationEvent): void {
    if (ev.toState === 'void') {
      this.closeMenu.next();
      this.closeMenu.complete();
    }
  }

  onClose(): void {
    this.animationState = 'void';
  }
}
