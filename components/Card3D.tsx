import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ReactNode, MouseEvent } from "react";

interface Card3DProps {
  children: ReactNode;
  className?: string;
}

export const Card3D = ({ children, className = "" }: Card3DProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, {
    stiffness: 150,
    damping: 15
  });
  const mouseYSpring = useSpring(y, {
    stiffness: 150,
    damping: 15
  });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const z = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    [20, -20]
  );

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        z,
        transformStyle: "preserve-3d",
        perspective: "1200px"
      }}
      className={`relative overflow-hidden ${className}`}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
      }}
      transition={{ 
        duration: 0.3,
        boxShadow: { duration: 0.2 }
      }}
    >
      <div 
        style={{ 
          transform: "translateZ(50px)",
          transformStyle: "preserve-3d"
        }}
        className="will-change-transform h-full"
      >
        {children}
      </div>
    </motion.div>
  );
}; 