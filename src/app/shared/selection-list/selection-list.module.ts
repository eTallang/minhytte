import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SelectionListComponent } from './selection-list.component';
import { ListItemComponent } from './list-item/list-item.component';
import { IconModule } from '../icon/icon.module';

const components = [SelectionListComponent, ListItemComponent];

@NgModule({
  declarations: components,
  imports: [CommonModule, IconModule, FormsModule],
  exports: components
})
export class SelectionListModule {}
