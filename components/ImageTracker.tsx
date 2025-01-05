import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface ImageTrackerProps {
  src: string;
  alt: string;
  className?: string;
}

export const ImageTracker = ({ src, alt, className = "" }: ImageTrackerProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const liquidX = useSpring(mouseX, { stiffness: 50, damping: 10 });
  const liquidY = useSpring(mouseY, { stiffness: 50, damping: 10 });

  const rotateX = useTransform(liquidY, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(liquidX, [-0.5, 0.5], ["-7deg", "7deg"]);
  const gradientX = useTransform(liquidX, [-1, 1], ["-50%", "150%"]);
  const gradientY = useTransform(liquidY, [-1, 1], ["-50%", "150%"]);

  const shineX = useTransform(liquidX, [-1, 1], ["0%", "100%"]);
  const shineY = useTransform(liquidY, [-1, 1], ["0%", "100%"]);
  
  const shine = useTransform(
    [shineX, shineY],
    ([x, y]) => `${x} ${y}`
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseXRel = (e.clientX - centerX) / (rect.width / 2);
    const mouseYRel = (e.clientY - centerY) / (rect.height / 2);

    mouseX.set(mouseXRel);
    mouseY.set(mouseYRel);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        mouseX.set(Math.sin(Date.now() / 2000) * 0.3);
        mouseY.set(Math.cos(Date.now() / 2000) * 0.3);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [isHovered, mouseX, mouseY]);

  return (
    <motion.div
      ref={cardRef}
      className="relative overflow-hidden rounded-xl shadow-xl"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-gray-50/30 via-white/30 to-gray-100/30"
        style={{
          backgroundPosition: shine,
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      />
      <motion.div
        className="relative z-10 h-full"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        <motion.img 
          src={src} 
          alt={alt} 
          className={`w-full h-full object-cover rounded-xl ${className}`}
          style={{
            transformStyle: "preserve-3d",
            transform: "translateZ(20px)",
          }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-xl"
          style={{
            x: gradientX,
            y: gradientY,
          }}
        />
      </motion.div>
    </motion.div>
  );
}; 