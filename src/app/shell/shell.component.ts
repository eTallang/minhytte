import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

import { MenuComponent } from './menu/menu.component';

@Component({
  selector: 'mh-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {
  menuIsOpen = false;
  isScrolled = false;
  photoUrl: Observable<string | null> | undefined;
  initials: Observable<string> | undefined;

  constructor(private overlay: Overlay, private auth: AngularFireAuth) {}

  ngOnInit(): void {
    this.listenForScroll();
    this.photoUrl = this.getPhotoUrl();
    this.initials = this.getUserInitials();
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

  private getPhotoUrl(): Observable<string | null> {
    return this.auth.user.pipe(
      map((user) => {
        return user!.photoURL;
      })
    );
  }

  private getUserInitials(): Observable<string> {
    return this.auth.user.pipe(
      map((user) => {
        const name = user?.displayName || user?.email?.split('@')[0];
        return name![0].toUpperCase();
      })
    );
  }

  private listenForScroll() {
    fromEvent(window, 'scroll')
      .pipe(debounceTime(10))
      .subscribe(() => {
        this.isScrolled = window.scrollY > 0;
      });
  }
}
