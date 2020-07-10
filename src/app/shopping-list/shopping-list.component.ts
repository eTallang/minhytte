import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Item, ItemChange } from './item';
import { ShoppingListService } from './shopping-list.service';
import { listAnimation } from '../core/animations';

@Component({
  selector: 'mh-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
  animations: [listAnimation]
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  private unsubscriber = new Subject<void>();
  remaining: Item[] = [];
  inBasket: Item[] = [];

  constructor(private service: ShoppingListService) {}

  ngOnInit(): void {
    this.service
      .getRemaining()
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((remaining) => (this.remaining = remaining));
    this.service
      .getRemainingChanges()
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((changes) => this.updateList(this.remaining, changes));

    this.service
      .getInBasket()
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((inBasket) => (this.inBasket = inBasket));
    this.service
      .getInBasketChanges()
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((changes) => this.updateList(this.inBasket, changes));
  }

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  toggleItem(item: Item): void {
    this.service.toggleItem(item);
  }

  changeValue(item: Item, value: string) {
    item.value = value;
    this.service.changeItemValue(item, value);
  }

  addItem(value: string): void {
    this.service.createItem(value);
  }

  removeValue(item: Item): void {
    this.service.removeItems([item]);
  }

  emptyCart(): void {
    this.service.removeItems(this.inBasket);
  }

  private updateList(list: Item[], changes: ItemChange[]): void {
    changes.forEach((change) => {
      switch (change.change) {
        case 'added': {
          list.splice(change.newIndex, 0, change.value);
          break;
        }
        case 'modified': {
          list.splice(change.newIndex, 1, change.value);
          break;
        }
        case 'removed': {
          list.splice(change.oldIndex, 1);
          break;
        }
      }
    });
  }
}
