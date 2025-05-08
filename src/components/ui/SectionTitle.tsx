import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface SectionTitleProps {
  subtitle: string;
  title: string;
  alignment?: 'left' | 'center' | 'right';
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ 
  subtitle, 
  title, 
  alignment = 'center' 
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const childVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
  };

  return (
    <motion.div
      ref={ref}
      className={`max-w-2xl mb-12 ${alignmentClasses[alignment]}`}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <motion.p 
        className="text-primary-600 dark:text-primary-400 font-semibold mb-2 uppercase tracking-wide"
        variants={childVariants}
      >
        {subtitle}
      </motion.p>
      
      <motion.h2 
        className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white"
        variants={childVariants}
      >
        {title}
      </motion.h2>
      
      <motion.div 
        className={`h-1 w-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded mt-4 ${
          alignment === 'center' ? 'mx-auto' : alignment === 'right' ? 'ml-auto' : ''
        }`}
        variants={childVariants}
      />
    </motion.div>
  );
};