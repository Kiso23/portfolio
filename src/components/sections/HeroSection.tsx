import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start('visible');
  }, [controls]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const childVariants = {
    hidden: { 
      opacity: 0, 
      y: 30 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center">
      {/* Background element - gradient with animation */}
      <motion.div 
        className="absolute inset-0 overflow-hidden -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div className="absolute top-0 -left-40 h-[500px] w-[800px] bg-primary-200/30 dark:bg-primary-900/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -right-40 h-[500px] w-[800px] bg-secondary-200/30 dark:bg-secondary-900/20 rounded-full blur-3xl" />
      </motion.div>

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden -z-5 pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/4 h-16 w-16 rounded-full bg-primary-400/20 dark:bg-primary-500/20"
          animate={{ 
            y: [0, 20, 0], 
            x: [0, 10, 0],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 5,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-3/4 right-1/4 h-24 w-24 rounded-full bg-secondary-400/20 dark:bg-secondary-500/20"
          animate={{ 
            y: [0, -30, 0], 
            x: [0, -15, 0],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 7,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-1/3 right-1/3 h-12 w-12 rounded-full bg-accent-400/20 dark:bg-accent-500/20"
          animate={{ 
            y: [0, 15, 0], 
            x: [0, -20, 0],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 6,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 pt-24">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-4 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300"
            variants={childVariants}
          >
            Creative Developer & Designer
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed"
            variants={childVariants}
          >
            Crafting beautiful, interactive digital experiences that engage and inspire.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            variants={childVariants}
          >
            <motion.a
              href="#projects"
              className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg flex items-center gap-2 shadow-lg shadow-primary-500/20 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects <ArrowRight size={18} />
            </motion.a>
            
            <motion.a
              href="#contact"
              className="px-8 py-4 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <span className="text-sm text-gray-600 dark:text-gray-400 mb-2">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown className="text-gray-600 dark:text-gray-400" />
        </motion.div>
      </motion.div>
    </section>
  );
};