import { motion } from 'framer-motion';
import { useMemo } from 'react';

const Glitter = ({ count = 20 }) => {
  const elements = ['✨', '💖', '🌹', '⭐', '💕'];
  
  const glitters = useMemo(() => 
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
      size: Math.random() * 12 + 8,
      element: elements[Math.floor(Math.random() * elements.length)],
      duration: 2 + Math.random() * 2,
    })), [count]
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden will-change-contents">
      {glitters.map((glitter) => (
        <motion.div
          key={glitter.id}
          className="absolute will-change-transform"
          style={{
            left: `${glitter.x}%`,
            top: `${glitter.y}%`,
            fontSize: `${glitter.size}px`,
            transform: 'translateZ(0)',
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: glitter.duration,
            delay: glitter.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {glitter.element}
        </motion.div>
      ))}
    </div>
  );
};

export default Glitter;

