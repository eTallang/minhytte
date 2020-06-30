import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { ItemSet, Item } from './item';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private collectionName = 'shopping-list';

  constructor(private store: AngularFirestore) {}

  getItems(): Observable<ItemSet> {
    return this.store
      .collection(this.collectionName)
      .valueChanges()
      .pipe(
        map((items) => {
          const set: ItemSet = {
            inBasket: [],
            remaining: []
          };

          const itemList = items as Item[];
          itemList.forEach((i) => {
            if (i.inBasket) {
              set.inBasket.push(i);
            } else {
              set.remaining.push(i);
            }
          });
          set.remaining.push({
            value: ''
          });

          return set;
        })
      );
  }

  toggleItem(item: Item): void {
    item.inBasket = !item.inBasket;
    this.store.collection(this.collectionName).doc(item.id).update({ inBasket: item.inBasket });
  }

  changeItemValue(item: Item, value: string): void {
    if (!item.value) {
      this.createItem(value);
    } else {
      item.value = value;
      this.store.collection(this.collectionName).doc(item.id).update({ value: item.value });
    }
  }

  private createItem(value: string): void {
    this.store
      .collection(this.collectionName)
      .add({
        added: new Date(),
        inBasket: false,
        removed: false,
        value: value
      } as Item)
      .then((res) => {
        this.store.collection(this.collectionName).doc(res.id).update({ id: res.id });
      });
  }
}
