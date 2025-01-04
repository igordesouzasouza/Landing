'use client';

import { useState } from 'react';
import { Instagram, Facebook, MessageCircle } from 'lucide-react';

export const Footer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Mensagem enviada com sucesso!');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <footer className="bg-gray-900 text-white py-10 mt-24">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="md:pl-8 lg:pl-16 mt-8">
            <h3 className="text-lg font-semibold mb-3">Contato</h3>
            <p className="mb-1">Telefone: (47) 98485-1442</p>
            <p className="mb-1">Email: arcondicionadovmtech@gmail.com</p>
            <p className="mb-1">Rua Roberto Jasper, 32</p>
            <p>Rio do Sul - SC - Boa Vista</p>
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">Redes Sociais</h3>
              <div className="flex space-x-6">
                <a href="https://www.instagram.com/ar_condicionado_vmtech/" target="_blank" className="hover:text-gray-300">
                  <Instagram size={22} />
                </a>
                <a href="https://www.facebook.com/arcondicionadovmtech" target="_blank" className="hover:text-gray-300">
                  <Facebook size={22} />
                </a>
                <a href="https://wa.me/47984851442?text=Olá,%20gostaria%20de%20ver%20o%20catálogo%20completo%20de%20produtos" target="_blank" className="hover:text-gray-300">
                  <MessageCircle size={22} />
                </a>
              </div>
            </div>
          </div>

          <div className="md:px-12 max-w-md" id="footer-contact">
            <h3 className="text-lg font-semibold mb-4">Envie uma mensagem</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Nome"
                className="w-full p-2 rounded bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                required
              />
              <input
                type="tel"
                placeholder="Telefone"
                className="w-full p-2 rounded bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 rounded bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                required
              />
              <textarea
                placeholder="Mensagem"
                rows={3}
                className="w-full p-2 rounded bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400"
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
                required
              />
              <button
                type="submit"
                className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-950 transition-colors"
              >
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-700 text-center">
          <p className="text-gray-400">
            © 2024 VM Tech Climatiza. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;