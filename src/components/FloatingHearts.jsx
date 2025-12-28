import { motion } from 'framer-motion';
import { useMemo } from 'react';

const FloatingHearts = ({ count = 5 }) => {
  const hearts = useMemo(() => 
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 4 + Math.random() * 2,
      xOffset: (Math.random() - 0.5) * 30,
    })), [count]
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 will-change-contents">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: '100vh', opacity: 0, scale: 0, x: 0 }}
          animate={{
            y: '-100vh',
            opacity: [0, 1, 1, 0],
            scale: [0, 1, 1, 0],
            x: heart.xOffset,
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
          className="absolute text-2xl will-change-transform"
          style={{ 
            left: `${heart.x}%`,
            transform: 'translateZ(0)',
          }}
        >
          💖
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;

