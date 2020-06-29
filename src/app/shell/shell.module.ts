import { OverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MenuComponent } from './menu/menu.component';
import { ShellComponent } from './shell.component';
import { IconModule } from '../shared/icon/icon.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MenuComponent, ShellComponent],
  imports: [CommonModule, RouterModule, OverlayModule, IconModule, A11yModule],
})
export class ShellModule {}
