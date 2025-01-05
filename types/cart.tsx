"use client";

import React, { useState } from "react";
import { PayPalButton } from "../components/PayPalButton" // Ajuste o caminho conforme necessário
import { products } from "../data/products"; // Ajuste o caminho conforme necessário



export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}
export interface CartProps {
  items: CartItem[];
  setItems: (items: CartItem[]) => void;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: any) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([
        ...cartItems,
        { id: product.id, name: product.name, price: product.price, quantity: 1 },
      ]);
    }
  };

  const removeFromCart = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSuccess = () => {
    alert("Pagamento realizado com sucesso!");
    setCartItems([]); // Limpar o carrinho após o pagamento
  };

  return (
    <div className="cart-container">
      <h1>Carrinho</h1>

      <div className="product-list">
        <h2>Produtos Disponíveis</h2>
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Preço: R$ {product.price.toFixed(2)}</p>
            <button onClick={() => addToCart(product)}>Adicionar ao Carrinho</button>
          </div>
        ))}
      </div>

      <div className="cart-items">
        <h2>Itens no Carrinho</h2>
        {cartItems.length === 0 ? (
          <p>O carrinho está vazio.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <h3>{item.name}</h3>
              <p>Preço: R$ {item.price.toFixed(2)}</p>
              <p>Quantidade: {item.quantity}</p>
              <button onClick={() => removeFromCart(item.id)}>Remover</button>
            </div>
          ))
        )}
      </div>

      {cartItems.length > 0 && (
        <PayPalButton items={cartItems} total={total} onSuccess={handleSuccess} />
      )}
    </div>
  );
};

export default Cart;