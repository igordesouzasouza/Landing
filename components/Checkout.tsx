import { useState } from 'react';
import { CartItem } from '../types/cart';
import { X } from 'lucide-react';

type CheckoutProps = {
  items: CartItem[];
  total: number;
  onClose: () => void;
  onFinish: () => void;
};

export const Checkout = ({ items, total, onClose, onFinish }: CheckoutProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFinish();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Nome"
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-gray-400"
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
          />
          <input
            type="email"
            placeholder="Email"
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-gray-400"
            value={formData.email}
            onChange={e => setFormData({...formData, email: e.target.value})}
          />
          <input
            type="tel"
            placeholder="Telefone"
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-gray-400"
            value={formData.phone}
            onChange={e => setFormData({...formData, phone: e.target.value})}
          />
          <textarea
            placeholder="Endereço"
            required
            rows={4}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-gray-400"
            value={formData.address}
            onChange={e => setFormData({...formData, address: e.target.value})}
          />
          <button 
            type="submit"
            className="w-full bg-gray-800 text-white py-3 rounded hover:bg-gray-900 transition-colors text-lg font-medium"
          >
            Confirmar Pedido
          </button>
        </form>
      </div>
    </div>
  );
}; 