import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { SectionTitle } from '../ui/SectionTitle';
import { Code, Palette, Globe, Zap } from 'lucide-react';

interface Skill {
  name: string;
  level: number;
  icon: React.ReactNode;
}

export const AboutSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skills: Skill[] = [
    { name: 'Frontend Development', level: 90, icon: <Code size={24} /> },
    { name: 'UI/UX Design', level: 85, icon: <Palette size={24} /> },
    { name: 'Web Animation', level: 80, icon: <Zap size={24} /> },
    { name: 'Responsive Design', level: 95, icon: <Globe size={24} /> },
  ];

  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle subtitle="About Me" title="Who I Am" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* About Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-4">
              Passionate Developer with an Eye for Design
            </h3>
            
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              I'm a creative developer with a passion for building beautiful, functional digital experiences. With a 
              background in both design and development, I bring a unique perspective to every project.
            </p>
            
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              My journey began 6 years ago, and since then I've worked with clients across various industries, 
              helping them bring their ideas to life through thoughtful design and clean code.
            </p>
            
            <div className="flex gap-x-4 mt-8">
              <motion.div
                className="h-20 w-20 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center shadow-sm"
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                <Code size={32} className="text-primary-600 dark:text-primary-400" />
              </motion.div>
              
              <motion.div
                className="h-20 w-20 rounded-full bg-secondary-100 dark:bg-secondary-900/50 flex items-center justify-center shadow-sm"
                whileHover={{ scale: 1.05, rotate: -5 }}
              >
                <Palette size={32} className="text-secondary-600 dark:text-secondary-400" />
              </motion.div>
              
              <motion.div
                className="h-20 w-20 rounded-full bg-accent-100 dark:bg-accent-900/50 flex items-center justify-center shadow-sm"
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                <Globe size={32} className="text-accent-600 dark:text-accent-400" />
              </motion.div>
            </div>
          </motion.div>
          
          {/* Skills */}
          <div className="space-y-6">
            <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-4">
              My Skills
            </h3>
            
            {skills.map((skill, index) => (
              <motion.div 
                key={skill.name}
                custom={index}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={variants}
                className="mb-6"
              >
                <div className="flex items-center mb-2">
                  <div className="mr-3 text-primary-600 dark:text-primary-400">
                    {skill.icon}
                  </div>
                  <div className="flex justify-between w-full">
                    <span className="font-medium text-gray-800 dark:text-gray-200">{skill.name}</span>
                    <span className="text-gray-600 dark:text-gray-400">{skill.level}%</span>
                  </div>
                </div>
                
                <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.2 + (index * 0.1) }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};