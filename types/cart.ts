export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

export type CartProps = {
  items: CartItem[];
  setItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}; 