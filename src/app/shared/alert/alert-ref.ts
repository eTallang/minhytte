import { OverlayRef } from '@angular/cdk/overlay';
import { Observable, Subject } from 'rxjs';

export class AlertRef {
  private readonly _afterClosed = new Subject<boolean>();
  private result: boolean | undefined;

  constructor(private overlayRef: OverlayRef) {
    this.overlayRef.detachments().subscribe(() => {
      this._afterClosed.next(this.result);
      this._afterClosed.complete();
    });
  }

  close(dialogResult?: boolean): void {
    this.result = !!dialogResult;
    this.overlayRef.detach();
    this.overlayRef.dispose();
  }

  afterClosed(): Observable<boolean> {
    return this._afterClosed.asObservable();
  }
}
