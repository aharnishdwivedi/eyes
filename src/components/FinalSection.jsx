import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const FinalSection = () => {
  const [messages, setMessages] = useState([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const messageSequence = [
    "Every time I look into your eyes...",
    "I see my future...",
    "I see my happiness...",
    "I see my everything...",
    "Thank you for being in my life 💕",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentMessageIndex < messageSequence.length) {
        setMessages((prev) => [...prev, messageSequence[currentMessageIndex]]);
        setCurrentMessageIndex((prev) => prev + 1);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [currentMessageIndex]);

  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 px-4 md:px-0 lg:px-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-300/40 via-purple-300/40 to-pink-200/40" />
      
      <div className="relative z-10 w-full mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="mb-12 w-full"
        >
          <motion.img
            src="/images/eyes.jpeg"
            alt="Eyes"
            className="w-full max-w-full mx-auto rounded-none md:rounded-none lg:rounded-none shadow-2xl glow-purple object-cover"
            style={{ maxHeight: '70vh' }}
            animate={{
              scale: [1, 1.02, 1],
              filter: [
                'brightness(1) saturate(1)',
                'brightness(1.1) saturate(1.2)',
                'brightness(1) saturate(1)',
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>

        <div className="space-y-4 min-h-[200px] px-4">
          {messages.map((message, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-xl md:text-2xl lg:text-3xl text-purple-700 font-medium"
            >
              {message}
            </motion.p>
          ))}
        </div>

        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 12, duration: 1 }}
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="text-6xl mb-4"
          >
            💖
          </motion.div>
          <p className="text-2xl md:text-3xl text-gradient font-bold">
            Forever & Always
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalSection;

