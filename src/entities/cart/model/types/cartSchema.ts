export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }

export interface CartSchema {
    total: number;
  items: CartItem[];
  isOpen: boolean;
}