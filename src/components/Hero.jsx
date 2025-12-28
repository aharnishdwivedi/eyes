import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import HeartPopup from './HeartPopup';

const Hero = () => {
  const [showText, setShowText] = useState(false);
  const [heartPopup, setHeartPopup] = useState({ show: false, x: 50, y: 50 });

  useEffect(() => {
    const timer = setTimeout(() => setShowText(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleImageClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const touch = e.touches?.[0] || e.changedTouches?.[0];
    const clientX = touch ? touch.clientX : e.clientX;
    const clientY = touch ? touch.clientY : e.clientY;
    
    const x = (clientX / window.innerWidth) * 100;
    const y = (clientY / window.innerHeight) * 100;
    
    setHeartPopup({ show: true, x, y });
    setTimeout(() => setHeartPopup({ show: false, x: 50, y: 50 }), 900);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/images/bgcute.jpeg)',
        }}
      />
      
      {/* White Glass Effect Overlay */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-md" />
      
      <HeartPopup show={heartPopup.show} x={heartPopup.x} y={heartPopup.y} />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="relative z-10 text-center w-full px-4 md:px-0 lg:px-0"
      >
        <div className="mb-8 w-full">
          <motion.img
            src="/images/eyes.jpeg"
            alt="Eyes"
            loading="eager"
            onClick={handleImageClick}
            onTouchStart={handleImageClick}
            className="w-full md:w-full lg:w-full max-w-full mx-auto rounded-lg md:rounded-none lg:rounded-none shadow-2xl glow-pink object-cover border-4 border-white/50 cursor-pointer touch-manipulation select-none active:border-pink-400 will-change-transform"
            style={{ maxHeight: '70vh' }}
          />
        </div>

        <AnimatePresence>
          {showText && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="mt-6 md:mt-8"
            >
              <motion.div
                className="inline-block glass-effect rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 bg-white/60 backdrop-blur-lg mx-4 md:mx-0"
              >
                <motion.h1
                  className="text-4xl md:text-6xl lg:text-7xl font-bold text-gradient mb-4"
                  animate={{
                    textShadow: [
                      '0 0 20px rgba(255, 182, 193, 0.5)',
                      '0 0 30px rgba(221, 160, 221, 0.7)',
                      '0 0 20px rgba(255, 182, 193, 0.5)',
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  For Urvashi 💕
                </motion.h1>
                <motion.p
                  className="text-xl md:text-2xl text-purple-700 font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                >
                  A little something made with love by me your Cutu...
                </motion.p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-4xl">👇</span>
      </motion.div>
    </section>
  );
};

export default Hero;

