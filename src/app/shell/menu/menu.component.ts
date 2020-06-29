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
      transition('void => *', animate('300ms cubic-bezier(0, 0.2, 0.1, 1)')),
      transition('* => void', animate('300ms ease-in')),
    ]),
  ]
})
export class MenuComponent {
  @HostBinding('@slideUp') get slideIn() {
    return this.animationState;
  }

  private animationState = '*';
  closeStart = new Subject<void>();
  closeEnd = new Subject<void>();

  menuItems: MenuItem[] = [
    {
      name: 'Guider',
      icon: 'clipboard',
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
      name: 'Om hytta',
      icon: 'information-circle',
      url: 'about',
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
      this.closeEnd.next();
      this.closeEnd.complete();
    }
  }

  onClose(): void {
    this.closeStart.next();
    this.closeStart.complete();
    this.animationState = 'void';
  }
}
