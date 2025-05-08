
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from '../ui/SectionTitle';
import { Send, Mail, Phone, MapPin, Check } from 'lucide-react';
import emailjs from '@emailjs/browser';


interface FormState {
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
}

export const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    from_name: '',
    from_email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormState>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormState]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormState> = {};
    if (!formState.from_name.trim()) newErrors.from_name = 'Name is required';
    if (!formState.from_email.trim()) {
      newErrors.from_email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.from_email)) {
      newErrors.from_email = 'Valid email is required';
    }
    if (!formState.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formState.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    setIsSubmitting(true);
  
    try {
      // Extract service, template, and public key from env variables
      const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
      const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
  
      // Check if any required EmailJS environment variable is missing
      if (!serviceId || !templateId || !publicKey) {
        console.error("Missing EmailJS environment variables.");
        alert("Email service is not configured. Please try again later.");
        setIsSubmitting(false);
        return;
      }
  
      // Send the email using EmailJS
      const result = await emailjs.send(serviceId, templateId, {
        from_name: formState.from_name,
        from_email: formState.from_email,
        subject: formState.subject,
        message: formState.message
      }, publicKey);
  
      // On success, handle response
      console.log('Email successfully sent!', result.text);
      setIsSubmitted(true);
      setFormState({ from_name: '', from_email: '', subject: '', message: '' });
  
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      // Handle any error that occurs during the email sending
      console.error('Email sending failed:', error);
      alert('There was an error sending your message. Please try again.');
    }
  
    setIsSubmitting(false);
  };
// / Define classes for input fields and error messages  

  const inputClasses = 'w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all';
  const errorClasses = 'text-red-500 text-sm mt-1';

  const contactItems = [
    {
      icon: <Mail className="text-primary-600 dark:text-primary-400" size={24} />,
      title: 'Email',
      content: 'Sarlongki360@gmail.com',

    },
    {
      icon: <Phone className="text-primary-600 dark:text-primary-400" size={24} />,
      title: '8473010850',
    },
    {
      icon: <MapPin className="text-primary-600 dark:text-primary-400" size={24} />,
      title: 'Location',
      content: 'Assam, India',
      href: '#'
    }
  ];

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  const contactItemsVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const contactItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle subtitle="Get In Touch" title="Contact Me" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div variants={formVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
              {isSubmitted ? (
                <motion.div className="flex flex-col items-center justify-center text-center py-10" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                    <Check className="text-green-600 dark:text-green-400" size={32} />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-600 dark:text-gray-400">Thank you! I’ll get back to you soon.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="from_name" className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Name</label>
                      <motion.input
                        type="text"
                        id="from_name"
                        name="from_name"
                        value={formState.from_name}
                        onChange={handleChange}
                        className={inputClasses}
                        placeholder="Your Name"
                        whileFocus={{ scale: 1.01 }}
                      />
                      {errors.from_name && <p className={errorClasses}>{errors.from_name}</p>}
                    </div>
                    <div>
                      <label htmlFor="from_email" className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Email</label>
                      <motion.input
                        type="email"
                        id="from_email"
                        name="from_email"
                        value={formState.from_email}
                        onChange={handleChange}
                        className={inputClasses}
                        placeholder="Your Email"
                        whileFocus={{ scale: 1.01 }}
                      />
                      {errors.from_email && <p className={errorClasses}>{errors.from_email}</p>}
                    </div>
                  </div>
                  <div className="mb-6">
                    <label htmlFor="subject" className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Subject</label>
                    <motion.input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      className={inputClasses}
                      placeholder="Subject"
                      whileFocus={{ scale: 1.01 }}
                    />
                    {errors.subject && <p className={errorClasses}>{errors.subject}</p>}
                  </div>
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Message</label>
                    <motion.textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      rows={5}
                      className={inputClasses}
                      placeholder="Your Message"
                      whileFocus={{ scale: 1.01 }}
                    />
                    {errors.message && <p className={errorClasses}>{errors.message}</p>}
                  </div>
                  <motion.button
                    type="submit"
                    className="w-full py-3 px-6 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg shadow-lg shadow-primary-500/20 transition-all flex items-center justify-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <Send className="mr-2" size={20} />
                    )}
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
          <motion.div variants={contactItemsVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-6">Let's Connect</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-8">
              I'm always open to discuss new ideas or opportunities. Feel free to reach out!
            </p>
            <div className="space-y-6">
              {contactItems.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  className="flex items-start space-x-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all"
                  variants={contactItemVariants}
                  whileHover={{ x: 5 }}
                >
                  <div className="p-3 bg-primary-100 dark:bg-primary-900/20 rounded-full">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{item.title}</h4>
                    <p className="text-gray-600 dark:text-gray-400">{item.content}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
