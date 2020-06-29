import { Component } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MenuComponent } from './menu/menu.component';

@Component({
  selector: 'mh-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent {
  constructor(private overlay: Overlay) {}

  openMenu(): void {
    const portal = new ComponentPortal(MenuComponent);
    const overlayRef = this.overlay.create({
      width: '100vw',
      height: '100vh',
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
      scrollStrategy: this.overlay.scrollStrategies.block(),
    });
    const componentRef = overlayRef.attach(portal);
    componentRef.instance.closeMenu.subscribe(() => {
      overlayRef?.dispose();
      overlayRef?.detach();
    });
  }
}
