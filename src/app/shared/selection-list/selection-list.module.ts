import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { SelectionListComponent } from './selection-list.component';
import { ListItemComponent } from './list-item/list-item.component';
import { IconModule } from '../icon/icon.module';

const components = [SelectionListComponent, ListItemComponent];

@NgModule({
  declarations: components,
  imports: [CommonModule, IconModule, FormsModule, DragDropModule],
  exports: components
})
export class SelectionListModule {}
