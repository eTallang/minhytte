export interface Item {
  id?: string;
  value?: string;
  added?: Date;
  inBasket?: boolean;
  removed?: boolean;
}

export interface ItemSet {
  inBasket: Item[];
  remaining: Item[];
}
