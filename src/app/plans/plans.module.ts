import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlansRoutingModule } from './plans-routing.module';
import { PlansComponent } from './plans.component';
import { SeparatorModule, SelectionListModule } from '../shared';


@NgModule({
  declarations: [PlansComponent],
  imports: [
    CommonModule,
    PlansRoutingModule,
    SeparatorModule,
    SelectionListModule
  ]
})
export class PlansModule { }
