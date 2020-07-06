import { Component, OnInit } from '@angular/core';

import { Item, ItemChange } from './item';
import { ShoppingListService } from './shopping-list.service';
import { listAnimation } from '../core/animations';

@Component({
  selector: 'mh-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
  animations: [listAnimation]
})
export class ShoppingListComponent implements OnInit {
  remaining: Item[] = [];
  inBasket: Item[] = [];

  constructor(private service: ShoppingListService) {}

  ngOnInit(): void {
    this.service.getRemaining().subscribe((remaining) => (this.remaining = remaining));
    this.service.getRemainingChanges().subscribe((changes) => this.updateList(this.remaining, changes));

    this.service.getInBasket().subscribe((inBasket) => (this.inBasket = inBasket));
    this.service.getInBasketChanges().subscribe((changes) => this.updateList(this.inBasket, changes));
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
