import { useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { CursorFollower } from './components/ui/CursorFollower';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { ServicesSection } from './components/sections/ServicesSection';
import { ContactSection } from './components/sections/ContactSection';

function App() {
  // Update page title
  useEffect(() => {
    document.title = 'Portfolio | Creative Developer';
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white relative">
        <CursorFollower />
        <Header />
        <main>
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <ServicesSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;