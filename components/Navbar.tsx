'use client';

import { Cart } from './Cart';
import { CartProps } from '../types/cart';

export const Navbar = ({ items, setItems }: CartProps) => {
  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'home') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else if (sectionId === 'footer-contact') {
      // Scroll para o formulário de contato no footer
      const footer = document.getElementById('footer-contact');
      if (footer) {
        footer.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  return (
    <nav className="fixed w-full z-50 px-4 py-2">
      <div className="max-w-6xl mx-auto backdrop-blur-md bg-white/90 rounded-2xl shadow-lg px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-extrabold font-poppins select-none text-gray-800">Vm Tech Climatiza</h1>
          </div>
          <div className="flex items-center space-x-8">
            <div className="hidden md:flex space-x-8">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-gray-700 hover:text-gray-900 transition-colors"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('sobre')}
                className="text-gray-700 hover:text-gray-900 transition-colors"
              >
                Sobre
              </button>
              <button 
                onClick={() => scrollToSection('produtos')}
                className="text-gray-700 hover:text-gray-900 transition-colors"
              >
                Produtos
              </button>
              <button 
                onClick={() => scrollToSection('regiao')}
                className="text-gray-700 hover:text-gray-900 transition-colors"
              >
                Região de Atendimento
              </button>
              <button 
                onClick={() => scrollToSection('footer-contact')}
                className="text-white bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-950 transition-colors"
              >
                Solicitar Contato
              </button>
            </div>
            <Cart 
              items={items} 
              setItems={setItems}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 