import { Component, OnInit, OnDestroy } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

import { AlertService } from './shared/alert/alert.service';

@Component({
  selector: 'mh-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private unsubscriber = new Subject<void>();

  constructor(private swUpdate: SwUpdate, private alert: AlertService, private router: Router) {}

  ngOnInit(): void {
    this.checkForUpdates();
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        takeUntil(this.unsubscriber)
      )
      .subscribe(() => {
        this.swUpdate.checkForUpdate();
      });
  }

  private checkForUpdates() {
    this.swUpdate.available.pipe(takeUntil(this.unsubscriber)).subscribe((d) => {
      if (d.current !== d.available) {
        this.alert
          .open(
            'Hei du!',
            'En ny oppdatering av appen er tilgjengelig. Trykk på knappen nedenfor for å få siste versjon.',
            {
              action: 'Oppdater',
              closeable: true
            }
          )
          .afterClosed()
          .subscribe((refresh) => {
            if (refresh) {
              location.reload();
            }
          });
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }
}
