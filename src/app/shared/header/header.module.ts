import { NgModule } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { HeaderDirective } from './header.directive';

@NgModule({
  declarations: [HeaderDirective],
  imports: [CommonModule, ScrollingModule],
  exports: [HeaderDirective]
})
export class HeaderModule {}
