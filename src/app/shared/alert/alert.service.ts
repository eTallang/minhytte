import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { Injectable, Injector } from '@angular/core';

import { AlertConfig, DefualtAlertConfig } from './alert-config';
import { AlertRef } from './alert-ref';
import { AlertComponent } from './alert.component';
import { AlertModule } from './alert.module';

@Injectable({
  providedIn: AlertModule
})
export class AlertService {
  private openAlert: AlertComponent | undefined;

  constructor(private overlay: Overlay, private injector: Injector) {}

  open(title?: string, content?: string, config?: Partial<AlertConfig>): AlertRef {
    if (this.openAlert) {
      this.openAlert.closeAlert();
    }

    const defaultConfig: DefualtAlertConfig = {
      ...new AlertConfig(),
      ...config,
      title: title,
      content: content
    };

    /** Create overlay */
    const overlayRef = this.createOverlayRef();
    const alertRef = new AlertRef(overlayRef);

    /** Attach the dialog container */
    const injector = new PortalInjector(
      this.injector,
      // tslint:disable-next-line: no-any
      new WeakMap<any, any>([
        [DefualtAlertConfig, defaultConfig],
        [AlertRef, alertRef]
      ])
    );
    this.openAlert = this.attachDialogContainer(overlayRef, injector);

    return alertRef;
  }

  private createOverlayRef(): OverlayRef {
    const positionStrategy = this.overlay.position().global().bottom().centerHorizontally();

    return this.overlay.create({
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      positionStrategy: positionStrategy,
      width: '100%'
    });
  }

  private attachDialogContainer(overlayRef: OverlayRef, injector: PortalInjector): AlertComponent {
    const container = new ComponentPortal(AlertComponent, null, injector);
    const containerRef = overlayRef.attach<AlertComponent>(container);
    return containerRef.instance;
  } 
}
