import { OverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MenuComponent } from './menu/menu.component';
import { ShellComponent } from './shell.component';
import { AlertModule, IconModule } from '../shared';

@NgModule({
  declarations: [MenuComponent, ShellComponent],
  imports: [CommonModule, RouterModule, AlertModule, OverlayModule, IconModule, A11yModule],
})
export class ShellModule {}
