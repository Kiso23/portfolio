import React from 'react';
import { motion } from 'framer-motion';
import { useMousePosition } from '../../hooks/useMousePosition';

export const CursorFollower: React.FC = () => {
  const { x, y } = useMousePosition();
  
  return (
    <>
      <motion.div 
        className="hidden md:block fixed w-8 h-8 rounded-full bg-primary-400/30 pointer-events-none z-50 mix-blend-difference"
        animate={{ 
          x: x - 16, 
          y: y - 16,
        }}
        transition={{ 
          type: "spring", 
          damping: 30, 
          stiffness: 200,
          mass: 0.8
        }}
      />
      <motion.div 
        className="hidden md:block fixed w-40 h-40 rounded-full bg-primary-500/10 pointer-events-none z-40"
        animate={{ 
          x: x - 80, 
          y: y - 80,
        }}
        transition={{ 
          type: "spring", 
          damping: 60, 
          stiffness: 100,
          mass: 1
        }}
      />
    </>
  );
};