'use client';

import { useState } from 'react';
import { Instagram, Facebook, MessageCircle } from 'lucide-react';

export const Footer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Mensagem enviada com sucesso!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <footer className="w-full bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4 max-w-[90%]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="md:pl-4">
            <h3 className="text-lg font-semibold mb-2">Contato</h3>
            <p className="mb-1 text-sm">Telefone: (47) 98485-1442</p>
            <p className="mb-1 text-sm">Email: arcondicionado@vmtech.com</p>
            <p className="mb-1 text-sm">Rua Roberto Jasper, 32, Boa Vista</p>
            <p className="text-sm">Rio do Sul - SC</p>
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Redes Sociais</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-gray-300">
                  <Instagram size={22} />
                </a>
                <a href="#" className="hover:text-gray-300">
                  <Facebook size={22} />
                </a>
                <a href="#" className="hover:text-gray-300">
                  <MessageCircle size={22} />
                </a>
              </div>
            </div>
          </div>

          <div className="md:px-8 max-w-md" id="footer-contact">
            <h3 className="text-lg font-semibold mb-3">Envie uma mensagem</h3>
            <form onSubmit={handleSubmit} className="space-y-2">
              <input
                type="text"
                placeholder="Nome"
                className="w-full p-1.5 rounded bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 text-sm"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-1.5 rounded bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 text-sm"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                required
              />
              <textarea
                placeholder="Mensagem"
                rows={2}
                className="w-full p-1.5 rounded bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 text-sm"
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
                required
              />
              <button
                type="submit"
                className="bg-gray-600 text-white px-4 py-1.5 rounded hover:bg-gray-950 transition-colors text-sm"
              >
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>

        <div className="mt-6 pt-3 border-t border-gray-700 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 VM Tech Climatiza. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;