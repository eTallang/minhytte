import { Component, OnInit } from '@angular/core';

import { Item } from './item';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'mh-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  remaining: Item[] = [];
  inBasket: Item[] = [];

  constructor(private service: ShoppingListService) {}

  ngOnInit(): void {
    this.service.getItems().subscribe(set => {
      this.remaining = set.remaining;
      this.inBasket = set.inBasket;
    });
  }

  toggleItem(item: Item): void {
    this.service.toggleItem(item);
  }

  changeValue(item: Item, value: string) {
    this.service.changeItemValue(item, value);
  }
}
