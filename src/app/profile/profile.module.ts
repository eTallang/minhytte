import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { IconModule, InputModule } from '../shared';


@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    IconModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
    InputModule,
    RouterModule
  ]
})
export class ProfileModule { }
