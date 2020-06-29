import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

interface Item {
  id: string;
  value: string;
  added: Date;
  inBasket: boolean;
  removed: boolean;
}

@Component({
  selector: 'mh-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  items!: Observable<Item[]>;

  constructor(private store: AngularFirestore) {}

  ngOnInit(): void {
    this.items = this.store.collection('shopping-list').valueChanges() as Observable<Item[]>;
  }
}
