'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CartItem } from '../types/cart';
import { PayPalButton } from './PayPalButton';

interface CheckoutFormProps {
  items: CartItem[];
  total: number;
}

const CheckoutForm = ({ items, total }: CheckoutFormProps) => {
  const router = useRouter();

  const handlePaymentSuccess = () => {
    localStorage.removeItem('cartItems'); // Limpa o carrinho
    router.push('/payment/success');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Resumo do Pedido */}
      <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Resumo do Pedido</h2>
        {items.map((item) => (
          <div key={item.id} className="flex justify-between mb-2">
            <span>{item.name} x{item.quantity}</span>
            <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="border-t mt-4 pt-4">
          <div className="flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>R$ {total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* PayPal Button */}
      <div className="mt-6">
        <PayPalButton 
          items={items}
          total={total}
          onSuccess={handlePaymentSuccess}
        />
      </div>
    </div>
  );
};

export default CheckoutForm;