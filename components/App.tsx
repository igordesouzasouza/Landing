'use client';

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { products } from '../data/products';
import { Footer } from './Footer';
import { LiquidButton } from './LiquidButton';
import { Card3D } from './Card3D';
import { ImageTracker } from './ImageTracker';
import { LiquidCard } from './LiquidCard';
import { LiquidProductCard } from './LiquidProductCard';
import dynamic from 'next/dynamic';

// Importação dinâmica do ReactPlayer
const ReactPlayer = dynamic(() => import('react-player/lazy'), {
  ssr: false // Desabilita Server Side Rendering para este componente
});

const App = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const slideIn = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  };

  const staggerChildren = {
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const [isHovering, setIsHovering] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-transparent flex flex-col items-center relative"
    >
     
      <div className="w-full flex justify-center">
        <Navbar />
      </div>
      
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        id="home" 
        className="h-screen relative overflow-hidden pt-16 w-full"
      >
        <div className="absolute inset-0">
          <div className="relative w-full h-full">
            {isClient && ( // Renderiza o player apenas no cliente
              <ReactPlayer
                url="/video.mp4"
                playing
                loop
                muted
                playsinline
                width="100%"
                height="100%"
                className="react-player"
                style={{ position: 'absolute', top: 0, left: 0 }}
                config={{
                  file: {
                    attributes: {
                      style: {
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                      }
                    },
                    forceVideo: true,
                    forceSafariHLS: true,
                    hlsOptions: {
                      maxBufferLength: 30,
                      maxMaxBufferLength: 60,
                    },
                  },
                }}
              />
            )}
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="relative h-full flex items-center justify-center"
        >
          <div className="text-center px-4">
            <motion.h1 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-5xl md:text-6xl font-bold text-white mb-4"
            >
              VM Tech Climatiza
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-xl md:text-2xl text-gray-200"
            >
              16 ANOS oferecendo excelência em climatização para o seu conforto.
            </motion.p>
          </div>
        </motion.div>
      </motion.section>

      <motion.section 
        variants={fadeIn}
        id="sobre" 
        className="max-w-6xl mx-auto mt-10 relative"
      >
        
      </motion.section>

      <motion.main 
        variants={staggerChildren}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 space-y-24"
      >
        <motion.section 
          variants={fadeIn}
          id="sobre" 
          className="max-w-6xl mx-auto mt-10"
        >
          <motion.h2 
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold mb-12"
          >
            Sobre a Empresa
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <LiquidCard className="bg-white/90 shadow-xl backdrop-blur-sm">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">Nossa História</h3>
                  <p className="text-gray-600"> Com 16 anos de experiência no mercado, noss
                    a empresa é referência em venda, instalação e manutenção de ar condicionado, co
                    nforto térmico e soluções personalizadas para residências, comércios e indústrias. No
                    sso compromisso com a excelência nos permite construir um relacionamento sólido de conf
                    iança com nossos clientes, priorizando a qualidade, a pontualidade e o atendimento difer
                    enciado. Seja qual for a sua necessidade, estamos prontos para oferecer as melhores
                     opções em climatização, sempre com eficiência e um atendimento que supera ex
                     ectativas..</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">Missão </h3>
                  <p className="text-gray-600">Nossa missão é proporcionar as melhores soluções para nossos clientes com altíssima qualidade e pontualidade.</p>
                </div>
              </div>
            </LiquidCard>
            <ImageTracker 
              src="/fotosobre.png" 
              alt="Técnico instalando ar condicionado" 
              className="w-full h-full object-cover"
            />
          </div>
        </motion.section>

        <motion.section 
          variants={slideIn}
          id="produtos" 
          className="max-w-6xl mx-auto"
        >
          <motion.h2 
            variants={fadeIn}
            className="text-3xl font-bold mb-12"
          >
            Catálogo de Produtos
          </motion.h2>
          <motion.div 
            variants={staggerChildren}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {products.map((product, index) => (
              <LiquidProductCard
                key={product.id}
                className="bg-white shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <motion.img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <div>
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold text-gray-700">
                      R${product.price.toFixed(2)}
                    </span>
                  </div>
                  <LiquidButton
                    href={`https://w.app/p7IQra`}
                    className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg text-center block"
                  >
                    Conversar com um vendedor
                  </LiquidButton>
                </div>
              </LiquidProductCard>
            ))}
          </motion.div>
          <div className="mt-12 flex justify-end">
            <a
              href="https://w.app/p7IQra"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 bg-gray-900 text-white px-12 py-4 rounded-lg text-lg font-medium overflow-hidden"
            >
              <motion.div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(45deg, #ffffff33 0, #ffffff33 2px, transparent 0, transparent 4px)",
                  backgroundSize: "8px 8px"
                }}
                animate={{
                  opacity: isHovering ? [1, 0] : 1,
                  backgroundPosition: isHovering ? ["0% 0%", "100% 100%"] : "0% 0%"
                }}
                transition={{
                  opacity: { duration: 0.3, ease: "easeInOut" },
                  backgroundPosition: {
                    duration: 0.8,
                    repeat: isHovering ? Infinity : 0,
                    ease: "linear"
                  }
                }}
              />
              <motion.div
                className="absolute inset-0 bg-white"
                animate={{
                  opacity: isHovering ? 1 : 0
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut"
                }}
              />
              <span 
                className="relative flex items-center gap-2 group-hover:text-gray-900 transition-colors duration-300"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                Ver Catálogo Completo
                <svg 
                  viewBox="0 0 24 24" 
                  className="w-6 h-6 fill-current transition-colors duration-300"
                >
                  <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                </svg>
              </span>
            </a>
          </div>
        </motion.section>

        <motion.section 
          variants={fadeIn}
          id="regiao" 
          className="max-w-6xl mx-auto mb-32"
        >
          <motion.h2 
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold mb-12 text-center"
          >
            Região de Atendimento
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="w-full h-full"
            >
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
            </motion.div>
            <motion.div 
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col justify-center space-y-6"
            >
              <motion.div 
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl"
              >
                <h3 className="text-xl font-semibold mb-3">Rio do Sul</h3>
                <p className="text-gray-600">Atendimento completo em toda a cidade de Rio do Sul e região central.</p>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl"
              >
                <h3 className="text-xl font-semibold mb-3">Alto Vale</h3>
                <p className="text-gray-600">Cobertura nas principais cidades do Alto Vale do Itajaí, incluindo Ituporanga, Ibirama e Taió.</p>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl"
              >
                <h3 className="text-xl font-semibold mb-3">Vale do Itajaí</h3>
                <p className="text-gray-600">Atendimento em cidades próximas como Blumenau, Indaial e região.</p>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </motion.main>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="w-full"
      >
        <div className="container mx-auto">
          <Footer />
        </div>
      </motion.footer>
    </motion.div>
  );
};

export default App;

// Email: sb-buyer@test.com (exemplo)
// Senha: test123 (exemplo)
// Cartões de teste fornecidos pelo PayPal Sandbox
// Cartões de teste fornecidos pelo PayPal Sandbox