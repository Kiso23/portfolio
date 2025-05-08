import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { SectionTitle } from '../ui/SectionTitle';
import { ExternalLink, X } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
}

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const projects: Project[] = [
    {
      id: 1,
      title: "E-commerce Platform",
      category: "Web Development",
      description: "A modern e-commerce platform built with React, Node.js, and Stripe integration. Features include product filtering, user authentication, cart functionality, and responsive design.",
      image: "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      tags: ["React", "Node.js", "Stripe", "MongoDB"],
      link: "#"
    },
    {
      id: 2,
      title: "Online Quiz Platform",
      category: "Web Development",
      description: "An interactive quiz platform with real-time scoring, multiple question types, and detailed analytics. Features include timer-based quizzes, leaderboards, and progress tracking.",
      image: "https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      tags: ["React", "Firebase", "TypeScript", "Tailwind"],
      link: "#"
    },
    {
      id: 3,
      title: "Hospital Appointment System",
      category: "Healthcare",
      description: "A comprehensive appointment management system for hospitals. Features include real-time scheduling, doctor availability, patient records, and automated reminders.",
      image: "https://images.pexels.com/photos/7088530/pexels-photo-7088530.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      tags: ["React", "Node.js", "PostgreSQL", "WebRTC"],
      link: "#"
    },
    {
      id: 4,
      title: "Content Management System",
      category: "Web Development",
      description: "A custom CMS built for content creators with a focus on user experience. Features include a visual editor, asset management, scheduling, and analytics integration.",
      image: "https://images.pexels.com/photos/9822732/pexels-photo-9822732.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      tags: ["JavaScript", "Node.js", "MongoDB", "AWS"],
      link: "#"
    }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle subtitle="Portfolio" title="Recent Projects" />
        
        <motion.div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              custom={index}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={cardVariants}
              className="group relative overflow-hidden rounded-lg shadow-lg bg-white dark:bg-gray-800 cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="text-white">
                    <span className="text-sm font-medium bg-primary-500 px-3 py-1 rounded-full">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-bold mt-2">{project.title}</h3>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white">
                    {project.title}
                  </h3>
                  <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                    {project.category}
                  </span>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <motion.div 
                className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <div className="bg-primary-600 text-white p-3 rounded-full shadow-lg">
                  <ExternalLink size={20} />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-72">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 bg-white dark:bg-gray-900 p-2 rounded-full shadow-md"
                >
                  <X className="text-gray-900 dark:text-white" size={20} />
                </button>
              </div>
              
              <div className="p-6 md:p-8 overflow-y-auto max-h-[calc(90vh-18rem)]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
                    {selectedProject.title}
                  </h3>
                  <span className="text-sm font-medium text-white bg-primary-600 px-3 py-1 rounded-full">
                    {selectedProject.category}
                  </span>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  {selectedProject.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="text-sm px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <a 
                  href={selectedProject.link}
                  className="inline-block px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg shadow-lg shadow-primary-500/20 transition-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Project
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};