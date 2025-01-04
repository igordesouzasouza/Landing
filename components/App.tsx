'use client';

import { useState } from 'react';
import Navbar from './Navbar';
import { products } from '../data/products';
import { CartItem } from '../types/cart';
import { Footer } from './Footer';

const App = () => {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const savedItems = localStorage.getItem('cartItems');
      return savedItems ? JSON.parse(savedItems) : [];
    }
    return [];
  });

  const addToCart = (product: typeof products[0]) => {
    setItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar items={items} setItems={setItems} />
      
      {/* Hero Section */}
      <section id="home" className="h-screen relative overflow-hidden pt-16">
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>

        <div className="relative h-full flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              VM Tech Climatiza
            </h1>
            <p className="text-xl md:text-2xl text-gray-200">
              16 ANOS oferecendo excelência em climatização para o seu conforto.
            </p>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 space-y-24">
        {/* Seção Sobre */}
        <section id="sobre" className="max-w-6xl mx-auto mt-10">
          <h2 className="text-3xl font-bold mb-12">Sobre a Empresa</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Texto */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-3">Nossa História</h3>
                <p className="text-gray-600">
                Com 16 anos de experiência no mercado, nossa empresa é referência em venda, instalação 
                e manutenção de ar condicionado, conforto térmico e soluções personalizadas para residências,
                 comércios e indústrias. Nosso compromisso com a excelência nos permite construir um relacion
                 amento sólido de confiança com nossos clientes, priorizando a qualidade, a pontualidade e o a
                 tendimento diferenciado. Seja qual for a sua necessidade, estamos prontos para oferecer as mel
                 hores opções em climatizaçã
                o, sempre com eficiência e um atendimento que supera expectativas.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">Missão e Valores</h3>
                <p className="text-gray-600">
                  Nossa missão é proporcionar as melhores soluções para nossos clientes...
                </p>
              </div>
            </div>

            {/* Imagem */}
            <div className="relative">
              <img 
                src="/fotosobre.png" 
                alt="Técnico instalando ar condicionado" 
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </section>
 

        {/* Catálogo de Produtos */}
        <section id="produtos" className="max-w-6xl mx-auto">
          {/* Botão de Catálogo Completo */}
          <div className="mt-12 flex justify-end">
            <a 
              href="https://wa.me/47984851442?text=Olá,%20gostaria%20de%20ver%20o%20catálogo%20completo%20de%20produtos"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-950 transition-colors text-lg font-medium"
            >
              <span>Ver Catálogo Completo</span>
              <svg 
                viewBox="0 0 24 24" 
                className="w-6 h-6 fill-current"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
          </div>
          <h2 className="text-3xl font-bold mb-12">Catálogo de Produtos mais vendidos</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div 
                key={product.id} 
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
              >
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-bold text-gray-700">
                    R${product.price.toFixed(2)}
                  </span>
                </div>
                <button 
                  onClick={() => addToCart(product)}
                  className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition-colors"
                >
                  Adicionar ao carrinho
                </button>
              </div>
            ))}
          </div>
          
          
        </section>

        {/* Seção Região */}
        <section id="regiao" className="max-w-6xl mx-auto mb-24">
          <h2 className="text-3xl font-bold mb-12 text-center">Região de Atendimento</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Mapa do Google */}
            <div className="w-full h-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113576.23767674143!2d-49.7027174!3d-27.2156886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94dfb6b1a2baa925%3A0x2faa1b1f9c5c4b11!2sRio%20do%20Sul%2C%20SC!5e0!3m2!1spt-BR!2sbr!4v1699456693705!5m2!1spt-BR!2sbr"
                width="100%"
                height="100%"
                style={{ border: '0', minHeight: '500px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg shadow-lg"
              />
            </div>

            {/* Lista de Regiões */}
            <div className="flex flex-col justify-center space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-3">Rio do Sul</h3>
                <p className="text-gray-600">
                  Atendimento completo em toda a cidade de Rio do Sul e região central.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-3">Alto Vale</h3>
                <p className="text-gray-600">
                  Cobertura nas principais cidades do Alto Vale do Itajaí, incluindo Ituporanga, Ibirama e Taió.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-3">Vale do Itajaí</h3>
                <p className="text-gray-600">
                  Atendimento em cidades próximas como Blumenau, Indaial e região.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default App; 

// Email: sb-buyer@test.com (exemplo)
// Senha: test123 (exemplo)
// Cartões de teste fornecidos pelo PayPal Sandbox