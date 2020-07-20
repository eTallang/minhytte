import { NgModule } from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';

import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { ShoppingListComponent } from './shopping-list.component';
import { SelectionListModule } from '../shared/selection-list/selection-list.module';
import { SeparatorModule, AlertModule } from '../shared';

@NgModule({
  declarations: [ShoppingListComponent],
  imports: [
    CommonModule,
    ShoppingListRoutingModule,
    AngularFirestoreModule,
    SelectionListModule,
    SeparatorModule,
    AlertModule
  ]
})
export class ShoppingListModule {}
