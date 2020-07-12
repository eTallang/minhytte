import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

import { AlertService } from '../shared/alert/alert.service';

@Injectable({
  providedIn: 'root'
})
export class SwService {
  constructor(private swUpdate: SwUpdate, private alertService: AlertService) {
    this.swUpdate.available.subscribe((d) => {
      if (d.current !== d.available) {
        this.alertService
          .open('Hei du!', 'En ny oppdatering av appen er tilgjengelig. Trykk på knappen nedenfor for å få siste versjon.', {
            action: 'Oppdater',
            closeable: true
          })
          .afterClosed()
          .subscribe((refresh) => {
            if (refresh) {
              location.reload();
            }
          });
      }
    });
    this.alertService
      .open('Hei du!', 'En ny oppdatering av appen er tilgjengelig. Trykk på knappen nedenfor for å se siste versjon.', {
        action: 'Oppdater',
        closeable: true
      })
      .afterClosed()
      .subscribe((refresh) => {
        if (refresh) {
          location.reload();
        }
      });
  }
}
