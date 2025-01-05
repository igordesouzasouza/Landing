"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHoveringContact, setIsHoveringContact] = useState(false);

  const scrollToSection = (sectionId: string) => {
    setIsOpen(false);
    
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = element.offsetTop - 100;
        window.scrollTo({
          top: offset,
          behavior: "smooth"
        });
      }
    }, 300);
  };

  return (
    <nav className="fixed left-1/2 transform -translate-x-1/2 w-[70%] max-w-7xl z-50 px-8 py-4 backdrop-blur-md bg-white/5 rounded-full shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] border border-white/20 mt-8">
      <div className="mx-auto flex justify-between items-center">
        <motion.h1 
          className="text-2xl font-extrabold select-none mix-blend-difference"
          whileHover={{ scale: 1.05 }}
        >
          <img src="/logue.png" alt="Logo" className="w-40 h-12" />
        </motion.h1>
        
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="mix-blend-difference">
            Menu
          </button>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <NavLink onClick={() => scrollToSection("home")}>Home</NavLink>
          <NavLink onClick={() => scrollToSection("sobre")}>Sobre Nós</NavLink>
          <NavLink onClick={() => scrollToSection("produtos")}>Nossos Serviços</NavLink>
          <NavLink onClick={() => scrollToSection("regiao")}>Por que VM?</NavLink>
          <motion.button
            onClick={() => scrollToSection("footer-contact")}
            className="group relative inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-2 rounded-full overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-white"
              animate={{
                opacity: isHoveringContact ? 1 : 0
              }}
              transition={{
                duration: 0.3,
                ease: "easeInOut"
              }}
            />
            <span 
              className="relative flex items-center gap-2 group-hover:text-gray-900 transition-colors duration-300"
              onMouseEnter={() => setIsHoveringContact(true)}
              onMouseLeave={() => setIsHoveringContact(false)}
            >
              Contate-nos
            </span>
          </motion.button>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => (
  <motion.button
    onClick={onClick}
    className="mix-blend-difference font-medium"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
  >
    {children}
  </motion.button>
);

export default Navbar;
