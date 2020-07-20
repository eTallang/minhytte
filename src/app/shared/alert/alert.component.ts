import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  HostListener,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import { DefualtAlertConfig } from './alert-config';
import { AlertRef } from './alert-ref';
import { alertAnimations } from './animation';

@Component({
  selector: 'mh-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'mh-alert'
  },
  animations: [alertAnimations.fromAbove, alertAnimations.fromBelow]
})
export class AlertComponent implements OnInit {
  // tslint:disable-next-line: no-any
  private timer: any;
  private result: boolean | undefined;
  animationState: 'open' | 'closed' | 'void' = 'void';

  @HostBinding('@fromBelow') get animation(): string {
    return this.animationState;
  }

  @HostBinding('class.mh-alert--info') get infoClass() {
    return this.config.severity === 'info';
  }

  @HostBinding('class.mh-alert--success') get successClass() {
    return this.config.severity === 'success';
  }

  @HostBinding('class.mh-alert--error') get errorClass() {
    return this.config.severity === 'error';
  }

  @HostListener('@fromAbove.done', ['$event.toState'])
  @HostListener('@fromBelow.done', ['$event.toState'])
  onAnimationDone(toState: string) {
    if (toState === 'closed') {
      clearTimeout(this.timer);
      this.ref.close(this.result);
    }
  }

  constructor(public config: DefualtAlertConfig, private ref: AlertRef) {}

  ngOnInit(): void {
    this.animationState = 'open';
    if (!this.config.action || this.config.action && !this.config.closeable) {
      this.timer = setTimeout(() => {
        this.animationState = 'closed';
      }, this.config.duration);
    }
  }

  closeAlert(result?: boolean): void {
    this.result = result;
    this.animationState = 'closed';
  }
}
