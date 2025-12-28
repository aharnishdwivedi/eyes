import { motion } from 'framer-motion';
import { useMemo } from 'react';

const FloatingRoses = ({ count = 3 }) => {
  const roses = useMemo(() => 
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 5 + Math.random() * 2,
      size: Math.random() * 15 + 18,
      rotation: Math.random() * 360,
    })), [count]
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 will-change-contents">
      {roses.map((rose) => (
        <motion.div
          key={rose.id}
          initial={{ y: '100vh', opacity: 0, rotate: rose.rotation }}
          animate={{
            y: '-100vh',
            opacity: [0, 1, 1, 0],
            rotate: rose.rotation + 360,
          }}
          transition={{
            duration: rose.duration,
            delay: rose.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
          className="absolute text-2xl md:text-3xl will-change-transform"
          style={{ 
            left: `${rose.x}%`,
            fontSize: `${rose.size}px`,
            transform: 'translateZ(0)',
          }}
        >
          🌹
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingRoses;

