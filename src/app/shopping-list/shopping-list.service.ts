import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, skip, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Item, ItemChange } from './item';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private previousRemovedItems: Item[] = [];
  private collectionName = 'shopping-list';

  constructor(private store: AngularFirestore) {}

  getInCart(): Observable<Item[]> {
    return this.getItems(true);
  }

  getInCartChanges(): Observable<ItemChange[]> {
    return this.getItemChanges(true);
  }

  getRemaining(): Observable<Item[]> {
    return this.getItems(false);
  }

  getRemainingChanges(): Observable<ItemChange[]> {
    return this.getItemChanges(false);
  }

  toggleItem(item: Item): void {
    this.store.collection(this.collectionName).doc(item.id).update({ inCart: !item.inCart });
  }

  changeItemValue(item: Item, value: string): void {
    if (!value) {
      this.removeItems([item]);
    } else {
      this.store.collection(this.collectionName).doc(item.id).update({ value: item.value });
    }
  }

  removeItems(items: Item[]): void {
    this.previousRemovedItems = items.slice();
    items.forEach((item) => {
      this.store.collection(this.collectionName).doc(item.id).delete();
    });
  }

  createItem(value: string, inCart = false): void {
    this.store.collection<Item>(this.collectionName).add({
      added: new Date(),
      inCart: inCart,
      removed: false,
      value: value
    });
  }

  undo(): void {
    if (this.previousRemovedItems) {
      this.previousRemovedItems.forEach(item => {
        this.createItem(item.value!, item.inCart);
      });
    }
  }

  private getItems(inCart: boolean): Observable<Item[]> {
    return this.store
      .collection<Item>(this.collectionName, (list) =>
        list.where('inCart', '==', inCart).orderBy('added', 'asc')
      )
      .valueChanges({ idField: 'id' })
      .pipe(take(1));
  }

  private getItemChanges(inCart: boolean): Observable<ItemChange[]> {
    return this.store
      .collection<Item>(this.collectionName, (list) =>
        list.where('inCart', '==', inCart).orderBy('added', 'asc')
      )
      .stateChanges()
      .pipe(
        skip(1),
        map((change) => {
          return change.map((c) => {
            return {
              change: c.type,
              newIndex: c.payload.newIndex,
              oldIndex: c.payload.oldIndex,
              value: { ...c.payload.doc.data(), id: c.payload.doc.id }
            } as ItemChange;
          });
        })
      );
  }
}
