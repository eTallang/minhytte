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
          .open('Nyhet', 'En ny oppdatering av appen er tilgjengelig.', {
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
  }
}
