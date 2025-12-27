import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Hero from './components/Hero';
import AboutHer from './components/AboutHer';
import UsMemories from './components/UsMemories';
import MiniGames from './components/MiniGames';
import LoveNotes from './components/LoveNotes';
import FinalSection from './components/FinalSection';
import Footer from './components/Footer';
import MusicPlayer from './components/MusicPlayer';
import FloatingHearts from './components/FloatingHearts';

function App() {
  const [bgColor, setBgColor] = useState('from-pink-100 via-purple-50 to-pink-50');
  const [easterEggTaps, setEasterEggTaps] = useState(0);

  useEffect(() => {
    // Random easter egg on background clicks
    const handleClick = (e) => {
      if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'IMG') {
        setEasterEggTaps((prev) => {
          const newCount = prev + 1;
          if (newCount === 10) {
            // Change background color as easter egg
            const colors = [
              'from-pink-100 via-purple-50 to-pink-50',
              'from-purple-100 via-pink-50 to-purple-50',
              'from-pink-200 via-purple-100 to-pink-100',
              'from-purple-200 via-pink-100 to-purple-100',
            ];
            setBgColor(colors[Math.floor(Math.random() * colors.length)]);
            return 0;
          }
          return newCount;
        });
      }
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className={`min-h-screen bg-gradient-to-br ${bgColor} transition-colors duration-1000`}>
      <FloatingHearts count={8} />
      <MusicPlayer />
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Hero />
        <AboutHer />
        <UsMemories />
        <MiniGames />
        <LoveNotes />
        <FinalSection />
        <Footer />
      </motion.main>
    </div>
  );
}

export default App;
