'use client';

import { useEffect, useRef } from 'react';
import { CartItem } from '../types/cart';

interface PayPalButtonProps {
  items: CartItem[];
  total: number;
  onSuccess: () => void;
}

declare global {
  interface Window {
    paypal: any;
  }
}

export const PayPalButton = ({ items, total, onSuccess }: PayPalButtonProps) => {
  const paypalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.paypal && paypalRef.current) {
      window.paypal
        .Buttons({
          createOrder: (_data: any, actions: any) => {
            return actions.order.create({
              purchase_units: [{
                description: `Compra VM Tech Climatiza`,
                amount: {
                  currency_code: 'BRL',
                  value: total.toFixed(2),
                  breakdown: {
                    item_total: {
                      currency_code: 'BRL',
                      value: total.toFixed(2)
                    }
                  }
                },
                items: items.map(item => ({
                  name: item.name,
                  unit_amount: {
                    currency_code: 'BRL',
                    value: item.price.toFixed(2)
                  },
                  quantity: item.quantity
                }))
              }]
            });
          },
          onApprove: async (_data: any, actions: any) => {
            const order = await actions.order.capture();
            console.log('Pagamento aprovado:', order);
            onSuccess();
          },
          onError: (err: any) => {
            console.error('Erro no PayPal:', err);
          }
        })
        .render(paypalRef.current);
    }
  }, [items, total, onSuccess]);

  return <div ref={paypalRef} />;
}; 