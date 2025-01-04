'use client';

import { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { CartItem, CartProps } from '../types/cart';
import { useRouter } from 'next/navigation';

export const Cart = ({ items, setItems }: CartProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // Carregar itens do localStorage ao montar o componente
  useEffect(() => {
    const savedItems = localStorage.getItem('cartItems');
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, []);

  // Salvar itens no localStorage quando mudam
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(items));
  }, [items]);

  const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const updateQuantity = (id: number, change: number) => {
    setItems(prev => {
      const item = prev.find(i => i.id === id);
      if (!item) return prev;

      const newQuantity = item.quantity + change;
      if (newQuantity <= 0) {
        return prev.filter(item => item.id !== id);
      }
      
      return prev.map(item =>
        item.id === id 
          ? { ...item, quantity: newQuantity }
          : item
      );
    });
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 rounded-full relative"
      >
        <ShoppingCart className="h-6 w-6" />
        {items.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-gray-800 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
            {items.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl p-4 z-50">
          {items.length === 0 ? (
            <p className="text-gray-500">Carrinho vazio</p>
          ) : (
            <>
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center mb-2">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="text-sm bg-gray-200 px-2 rounded"
                      >
                        -
                      </button>
                      <span className="text-sm text-gray-500">
                        {item.quantity}x R${item.price.toFixed(2)}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="text-sm bg-gray-200 px-2 rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button 
                    onClick={() => updateQuantity(item.id, -item.quantity)}
                    className="text-red-500 text-sm"
                  >
                    Remover
                  </button>
                </div>
              ))}
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span>R${total.toFixed(2)}</span>
                </div>
                <button 
                  className="w-full mt-4 bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900"
                  onClick={() => {
                    setIsOpen(false);
                    router.push('/checkout');
                  }}
                >
                  Finalizar Compra
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};