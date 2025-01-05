import { motion } from "framer-motion";
import { ReactNode } from "react";

interface LiquidButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export const LiquidButton = ({ children, href, onClick, className = "" }: LiquidButtonProps) => {
  const ButtonWrapper = href ? motion.a : motion.button;
  
  return (
    <ButtonWrapper
      href={href}
      onClick={onClick}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative overflow-hidden group ${className}`}
      whileHover="hover"
      variants={{
        hover: {
          scale: 1.02,
          transition: {
            duration: 0.3,
            ease: "easeInOut"
          }
        }
      }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        animate={{
          backgroundPosition: ["0%", "100%", "0%"],
        }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        style={{
          backgroundSize: "200% 100%"
        }}
      />
      <motion.div className="relative z-10 group-hover:text-white transition-colors duration-300">
        {children}
      </motion.div>
    </ButtonWrapper>
  );
}; 