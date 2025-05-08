import React from 'react';
import { motion } from 'framer-motion';
import { Github as GitHub, Twitter, Linkedin, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: <GitHub size={20} />, href: 'https://github.com', label: 'GitHub' },
    { icon: <Twitter size={20} />, href: 'https://twitter.com', label: 'Twitter' },
    { icon: <Linkedin size={20} />, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: <Mail size={20} />, href: 'mailto:sarlongki360@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-2">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-secondary-500">
                Sarlongki
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-md">
              Bringing creative ideas to life through beautiful, functional design and development.
            </p>
          </div>
          
          <div className="flex space-x-4">
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                aria-label={link.label}
                className="p-3 bg-white dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 shadow-sm transition-colors"
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            &copy; {currentYear} Sarlongki. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};