export interface ShoppingCartItemModel {
  readonly id: string;
  readonly name: string;
  readonly image: string;
  readonly quantity: number;
}

export interface ShoppingCartModel {
  readonly id: string;
  readonly subtotalAmount: number;
  readonly totalAmount: number;
  readonly items: ShoppingCartItemModel[];
}
