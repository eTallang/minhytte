import { Component, OnInit, OnDestroy } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MenuComponent } from './menu/menu.component';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'mh-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit, OnDestroy {
  private unsubscriber = new Subject<void>();
  private previousUrl = '';

  menuIsOpen = false;

  constructor(private overlay: Overlay, private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationStart),
        takeUntil(this.unsubscriber)
      )
      .subscribe(() => (this.previousUrl = this.router.url));
  }

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  openMenu(): void {
    this.menuIsOpen = true;
    const portal = new ComponentPortal(MenuComponent);
    const overlayRef = this.overlay.create({
      width: '100vw',
      height: '100vh',
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
      scrollStrategy: this.overlay.scrollStrategies.block()
    });
    const componentRef = overlayRef.attach(portal);
    componentRef.instance.closeStart.subscribe(() => (this.menuIsOpen = false));
    componentRef.instance.closeEnd.subscribe(() => {
      overlayRef?.dispose();
      overlayRef?.detach();
    });
  }

  navigateBack(): void {
    this.router.navigateByUrl(this.previousUrl);
  }
}
