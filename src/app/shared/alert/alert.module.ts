import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AlertComponent } from './alert.component';
import { IconModule } from '../icon/icon.module';

@NgModule({
  imports: [CommonModule, OverlayModule, IconModule],
  declarations: [AlertComponent],
  entryComponents: [AlertComponent]
})
export class AlertModule {}
