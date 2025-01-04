'use client';

import CheckoutForm from '@/components/CheckoutForm';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CartItem } from '@/types/cart';

export default function CheckoutPage() {
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const savedItems = localStorage.getItem('cartItems');
    if (savedItems) {
      const parsedItems = JSON.parse(savedItems);
      setItems(parsedItems);
      setTotal(parsedItems.reduce((acc: number, item: CartItem) => 
        acc + (item.price * item.quantity), 0
      ));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="pt-10   pl-20">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Voltar para Home</span>
          </button>
        </div>

        <div className="py-8">
          <h1 className="text-3xl font-bold text-center mb-8">Finalizar Compra</h1>
          <CheckoutForm items={items} total={total} />
        </div>
      </div>
    </div>
  );
} 