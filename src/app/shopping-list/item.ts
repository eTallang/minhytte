export class Item {
  id?: string;
  value?: string;
  added?: Date;
  inBasket?: boolean;
  removed?: boolean;
}

export interface ItemChange {
  change: 'added' | 'modified' | 'removed';
  oldIndex: number;
  newIndex: number;
  value: Item;
}
