import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Item, ItemChange } from './item';
import { ShoppingListService } from './shopping-list.service';
import { listAnimation } from '../core/animations';
import { AlertService } from '../shared/alert/alert.service';

@Component({
  selector: 'mh-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
  animations: [listAnimation]
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  private unsubscriber = new Subject<void>();
  remaining: Item[] = [];
  inCart: Item[] = [];

  constructor(private service: ShoppingListService, private alertService: AlertService) {}

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
      .getInCart()
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((inCart) => (this.inCart = inCart));
    this.service
      .getInCartChanges()
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((changes) => this.updateList(this.inCart, changes));
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
    this.alertService.open('', 'Element ble slettet.', {
      action: 'Angre',
      duration: 3000,
      closeable: false
    }).afterClosed().subscribe(undo => {
      if (undo) {
        this.service.undo();
      }
    });
  }

  emptyCart(): void {
    this.service.removeItems(this.inCart);
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
