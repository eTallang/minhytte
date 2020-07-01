import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, skip, take } from 'rxjs/operators';
import { Observable, merge } from 'rxjs';

import { Item, ItemChange } from './item';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private collectionName = 'shopping-list';

  constructor(private store: AngularFirestore) {}

  getInBasket(): Observable<Item[]> {
    return this.store
      .collection<Item>(this.collectionName, (list) =>
        list.where('inBasket', '==', true).orderBy('added', 'asc')
      )
      .valueChanges({ idField: 'id' })
      .pipe(take(1)) as Observable<Item[]>;
  }

  getInBasketChanges(): Observable<ItemChange[]> {
    return this.getChanges(true);
  }

  getRemaining(): Observable<Item[]> {
    return this.store
      .collection<Item>(this.collectionName, (list) =>
        list.where('inBasket', '==', false).orderBy('added', 'asc')
      )
      .valueChanges({ idField: 'id' })
      .pipe(
        map((items) => {
          items.push({
            id: '',
            value: ''
          });

          return items;
        }),
        take(1)
      );
  }

  getRemainingChanges(): Observable<ItemChange[]> {
    return this.getChanges(false);
  }

  toggleItem(item: Item): void {
    item.inBasket = !item.inBasket;
    this.store.collection(this.collectionName).doc(item.id).update({ inBasket: item.inBasket });
  }

  removeItem(item: Item): void {
    this.store.collection(this.collectionName).doc(item.id).delete();
  }

  changeItemValue(item: Item, value: string): void {
    value = value.trim();
    if (!item.value && !item.id) {
      this.createItem(value);
    } else if (!item.value) {
      this.removeItem(item);
    } else {
      item.value = value;
      this.store.collection(this.collectionName).doc(item.id).update({ value: item.value });
    }
  }

  private getChanges(inBasket: boolean): Observable<ItemChange[]> {
    return this.store
      .collection<Item>(this.collectionName, (list) =>
        list.where('inBasket', '==', inBasket).orderBy('added', 'asc')
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

  private createItem(value: string): void {
    this.store.collection<Item>(this.collectionName).add({
      added: new Date(),
      inBasket: false,
      removed: false,
      value: value
    });
  }
}
