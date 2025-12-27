import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const FloatingHearts = ({ count = 5 }) => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const newHearts = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2,
    }));
    setHearts(newHearts);
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: '100vh', opacity: 0, scale: 0 }}
          animate={{
            y: '-100vh',
            opacity: [0, 1, 1, 0],
            scale: [0, 1, 1, 0],
            x: [0, Math.random() * 50 - 25, Math.random() * 50 - 25],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
          className="absolute text-2xl"
          style={{ left: `${heart.x}%` }}
        >
          💖
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;

