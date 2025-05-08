import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { SectionTitle } from '../ui/SectionTitle';
import { Code, Palette, Globe, Zap, PenTool, Lightbulb } from 'lucide-react';

interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

export const ServicesSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const services: Service[] = [
    {
      title: "Web Development",
      description: "Building responsive, fast, and accessible websites using modern technologies and best practices.",
      icon: <Code size={36} />,
      color: "bg-primary-500 text-white"
    },
    {
      title: "UI/UX Design",
      description: "Creating intuitive, engaging user interfaces with a focus on user experience and conversion.",
      icon: <Palette size={36} />,
      color: "bg-secondary-500 text-white"
    },
    {
      title: "Animation & Interaction",
      description: "Adding life to your website with custom animations and interactive elements that engage users.",
      icon: <Zap size={36} />,
      color: "bg-accent-500 text-white"
    },
    {
      title: "Responsive Design",
      description: "Ensuring your website looks and functions perfectly across all devices and screen sizes.",
      icon: <Globe size={36} />,
      color: "bg-primary-600 text-white"
    },
    {
      title: "Brand Identity",
      description: "Developing cohesive brand identities that communicate your values and connect with your audience.",
      icon: <PenTool size={36} />,
      color: "bg-secondary-600 text-white"
    },
    {
      title: "Creative Direction",
      description: "Guiding the visual strategy of your project to ensure a cohesive and effective end result.",
      icon: <Lightbulb size={36} />,
      color: "bg-accent-600 text-white"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="services" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle subtitle="Services" title="What I Offer" />
        
        <motion.div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <motion.div 
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all hover:shadow-xl hover:-translate-y-2"
              variants={itemVariants}
            >
              <div className={`p-6 ${service.color}`}>
                <div className="w-14 h-14 rounded-lg bg-white/20 flex items-center justify-center mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-display font-bold mb-2">{service.title}</h3>
              </div>
              
              <div className="p-6">
                <p className="text-gray-700 dark:text-gray-300">
                  {service.description}
                </p>

                <motion.a
                  href="#contact"
                  className="inline-flex items-center mt-4 text-primary-600 dark:text-primary-400 font-medium"
                  whileHover={{ x: 5 }}
                >
                  Learn more
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 ml-1" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};