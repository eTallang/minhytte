import { NgModule } from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';

import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { ShoppingListComponent } from './shopping-list.component';
import { HeaderModule } from '../shared/header/header.module';
import { SelectionListModule } from '../shared/selection-list/selection-list.module';

@NgModule({
  declarations: [ShoppingListComponent],
  imports: [
    CommonModule,
    ShoppingListRoutingModule,
    HeaderModule,
    AngularFirestoreModule,
    SelectionListModule
  ]
})
export class ShoppingListModule {}