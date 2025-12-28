import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Sparkles from './Sparkles';
import Glitter from './Glitter';
import HeartPopup from './HeartPopup';

const AboutHer = () => {
  const [heartPopup, setHeartPopup] = useState({ show: false, x: 50, y: 50 });

  const lines = [
    "tumhari aankhe itni zyada cute hai 👀",
    "i am in love with those dimples 😊",
    "kyu ho tum itni lucky mere lie?? 🍀",
    "mujhe tere lie useful hona accha lagta hai 💕",
    "I love you urvashi ❤️",
  ];

  const images = [
    { src: '/images/she1.png', alt: 'Beautiful You 1' },
    { src: '/images/she2.png', alt: 'Beautiful You 2' },
    { src: '/images/she3.png', alt: 'Beautiful You 3' },
  ];

  const handleImageClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches?.[0] || e.changedTouches?.[0];
    const clientX = touch ? touch.clientX : e.clientX;
    const clientY = touch ? touch.clientY : e.clientY;
    
    const x = (clientX / window.innerWidth) * 100;
    const y = (clientY / window.innerHeight) * 100;
    
    setHeartPopup({ show: true, x, y });
    setTimeout(() => setHeartPopup({ show: false, x: 50, y: 50 }), 900);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden">
      <Sparkles count={15} />
      <Glitter count={15} />
      
      <HeartPopup show={heartPopup.show} x={heartPopup.x} y={heartPopup.y} />
      
      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center text-gradient mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          About You 💕
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6"
        >
          {lines.map((line, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, x: 10 }}
              className="glass-effect rounded-2xl p-6 md:p-8 text-center text-lg md:text-xl text-purple-800 font-medium shadow-lg"
            >
              {line}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, rotate: -5 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ 
                delay: 1.7 + index * 0.2, 
                duration: 0.6,
                type: 'spring',
                stiffness: 100,
              }}
              className="relative"
            >
              <motion.img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                onClick={handleImageClick}
                onTouchStart={handleImageClick}
                className="w-full h-auto rounded-3xl shadow-2xl glow-purple cursor-pointer touch-manipulation select-none border-4 border-white/50 hover:border-pink-300/70 active:border-pink-400 will-change-transform"
                whileHover={{ 
                  scale: 1.08, 
                  rotate: index % 2 === 0 ? 3 : -3,
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ 
                  type: 'spring', 
                  stiffness: 400,
                  damping: 20,
                }}
              />
              <motion.div
                className="absolute -top-2 -right-2 text-3xl md:text-4xl"
                animate={{
                  rotate: [0, 15, -15, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.3,
                  ease: 'easeInOut',
                }}
              >
                💖
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.p
          className="mt-6 text-center text-purple-600 text-sm md:text-base"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 2.5 }}
        >
          Click on any photo to show love! 💕
        </motion.p>
      </div>
    </section>
  );
};

export default AboutHer;

