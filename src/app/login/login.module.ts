import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { IconModule, InputModule } from '../shared';
import { A11yModule } from '@angular/cdk/a11y';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    A11yModule,
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    IconModule,
    InputModule
  ]
})
export class LoginModule { }
