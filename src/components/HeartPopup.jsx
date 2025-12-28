import { motion, AnimatePresence } from 'framer-motion';

const HeartPopup = ({ show, x, y }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed pointer-events-none z-[9999]"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            transform: 'translate(-50%, -50%)',
            touchAction: 'none',
          }}
          initial={{ 
            scale: 0, 
            opacity: 0,
            y: 0,
          }}
          animate={{ 
            scale: [0, 1.8, 1.5],
            opacity: [0, 1, 0],
            y: [-30, -60, -80],
          }}
          exit={{ 
            scale: 0, 
            opacity: 0 
          }}
          transition={{ 
            duration: 0.9,
            ease: 'easeOut',
          }}
        >
          <span className="text-7xl sm:text-8xl md:text-9xl lg:text-[120px] block">💖</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HeartPopup;

