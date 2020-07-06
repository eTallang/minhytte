import { NgModule } from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';

import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { ShoppingListComponent } from './shopping-list.component';
import { SelectionListModule } from '../shared/selection-list/selection-list.module';

@NgModule({
  declarations: [ShoppingListComponent],
  imports: [
    CommonModule,
    ShoppingListRoutingModule,
    AngularFirestoreModule,
    SelectionListModule
  ]
})
export class ShoppingListModule {}
