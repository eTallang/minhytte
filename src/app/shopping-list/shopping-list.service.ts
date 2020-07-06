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
    return this.getItems(true);
  }

  getInBasketChanges(): Observable<ItemChange[]> {
    return this.getItemChanges(true);
  }

  getRemaining(): Observable<Item[]> {
    return this.getItems(false);
  }

  getRemainingChanges(): Observable<ItemChange[]> {
    return this.getItemChanges(false);
  }

  toggleItem(item: Item): void {
    item.inBasket = !item.inBasket;
    this.store.collection(this.collectionName).doc(item.id).update({ inBasket: item.inBasket });
  }

  changeItemValue(item: Item, value: string): void {
    item.value = value;
    this.store.collection(this.collectionName).doc(item.id).update({ value: item.value });
  }

  removeItems(items: Item[]): void {
    items.forEach(item => {
      this.store.collection(this.collectionName).doc(item.id).delete();
    });
  }

  createItem(value: string): void {
    this.store.collection<Item>(this.collectionName).add({
      added: new Date(),
      inBasket: false,
      removed: false,
      value: value
    });
  }

  private getItems(inBasket: boolean): Observable<Item[]> {
    return this.store
      .collection<Item>(this.collectionName, (list) =>
        list.where('inBasket', '==', inBasket).orderBy('added', 'asc')
      )
      .valueChanges({ idField: 'id' })
      .pipe(take(1));
  }

  private getItemChanges(inBasket: boolean): Observable<ItemChange[]> {
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
}
