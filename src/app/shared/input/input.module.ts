import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputContainerComponent } from './input-container.component';
import { InputDirective } from './input.directive';

@NgModule({
  declarations: [InputContainerComponent, InputDirective],
  imports: [CommonModule],
  exports: [InputContainerComponent, InputDirective]
})
export class InputModule {}
