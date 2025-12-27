import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const MiniGames = () => {
  const [heartsCollected, setHeartsCollected] = useState(0);
  const [fallingHearts, setFallingHearts] = useState([]);
  const [gameActive, setGameActive] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [caughtHearts, setCaughtHearts] = useState(0);
  const [gameInterval, setGameInterval] = useState(null);

  // Tap to collect hearts
  const handleTap = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setHeartsCollected((prev) => prev + 1);
    
    // Create a temporary heart at tap location
    const newHeart = {
      id: Date.now(),
      x,
      y,
    };
    
    setTimeout(() => {
      setHeartsCollected((prev) => prev - 1);
    }, 2000);
  };

  // Falling hearts game
  const startFallingHearts = () => {
    setGameActive(true);
    setFallingHearts([]);
    setCaughtHearts(0);
    
    const interval = setInterval(() => {
      setFallingHearts((prev) => [
        ...prev,
        {
          id: Date.now() + Math.random() * 1000,
          x: Math.random() * 90 + 5, // 5% to 95% to keep hearts visible
          speed: 3 + Math.random() * 2, // 3-5 seconds
        },
      ]);
    }, 600);

    setGameInterval(interval);

    setTimeout(() => {
      clearInterval(interval);
      setGameInterval(null);
      setGameActive(false);
      setTimeout(() => {
        setFallingHearts([]);
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
          setCaughtHearts(0);
        }, 3000);
      }, 1000); // Wait for last hearts to fall
    }, 10000);
  };

  const catchHeart = (heartId) => {
    setFallingHearts((prev) => prev.filter((h) => h.id !== heartId));
    setCaughtHearts((prev) => prev + 1);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (gameInterval) {
        clearInterval(gameInterval);
      }
    };
  }, [gameInterval]);

  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-200/30 via-purple-200/30 to-pink-100/30" />
      
      <div className="relative z-10 max-w-4xl mx-auto w-full">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center text-gradient mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Let's Play! 🎮
        </motion.h2>

        {/* Tap to Collect Hearts */}
        <motion.div
          className="glass-effect rounded-3xl p-8 mb-8 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-purple-700 mb-4">
            Tap to Collect Hearts 💖
          </h3>
          <motion.div
            className="relative h-64 bg-gradient-to-br from-pink-200 to-purple-200 rounded-2xl overflow-hidden cursor-pointer"
            onClick={handleTap}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-purple-600 font-medium">
                Tap anywhere to collect hearts! 💕
              </p>
            </div>
            <AnimatePresence>
              {Array.from({ length: Math.min(heartsCollected, 20) }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-4xl pointer-events-none"
                  initial={{ scale: 0, opacity: 0, x: '-50%', y: '-50%' }}
                  animate={{ 
                    scale: [0, 1.2, 1],
                    opacity: [0, 1, 0],
                    y: '-50%',
                  }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 1 }}
                  style={{
                    left: '50%',
                    top: '50%',
                  }}
                >
                  💖
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          <p className="mt-4 text-purple-600">
            Hearts collected: {heartsCollected} 💕
          </p>
        </motion.div>

        {/* Falling Hearts Game */}
        <motion.div
          className="glass-effect rounded-3xl p-8 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-purple-700 mb-4">
            Catch the Falling Hearts! 🎯
          </h3>
          <motion.button
            onClick={startFallingHearts}
            disabled={gameActive}
            className="px-8 py-4 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full font-bold text-lg shadow-lg glow-pink disabled:opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {gameActive ? 'Playing...' : 'Start Game!'}
          </motion.button>
          
          {gameActive && (
            <div className="relative h-64 bg-gradient-to-br from-purple-200 to-pink-200 rounded-2xl overflow-hidden mt-4">
              <AnimatePresence>
                {fallingHearts.map((heart) => (
                  <motion.div
                    key={heart.id}
                    className="absolute text-3xl cursor-pointer z-10"
                    onClick={() => catchHeart(heart.id)}
                    initial={{ 
                      top: '-5%',
                      opacity: 1,
                      scale: 1,
                    }}
                    animate={{ 
                      top: '105%',
                      opacity: [1, 1, 0.8],
                    }}
                    exit={{ 
                      opacity: 0,
                      scale: 0,
                    }}
                    whileHover={{ scale: 1.2 }}
                    transition={{ 
                      duration: heart.speed, 
                      ease: 'linear',
                    }}
                    style={{ 
                      left: `${heart.x}%`,
                      transform: 'translateX(-50%)',
                    }}
                  >
                    💖
                  </motion.div>
                ))}
              </AnimatePresence>
              {!gameActive && fallingHearts.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-purple-600 font-medium">
                    Click on the hearts to catch them! 💕
                  </p>
                </div>
              )}
            </div>
          )}
          
          {!gameActive && (
            <div className="relative h-64 bg-gradient-to-br from-purple-200 to-pink-200 rounded-2xl overflow-hidden mt-4 flex items-center justify-center">
              <p className="text-purple-600 font-medium">
                {caughtHearts > 0 ? `You caught ${caughtHearts} hearts! 💕` : 'Click "Start Game!" to begin 🎮'}
              </p>
            </div>
          )}

          <AnimatePresence>
            {showMessage && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="mt-4 text-2xl text-purple-600 font-bold"
              >
                You caught {caughtHearts} hearts! You're amazing! 🌟
              </motion.div>
            )}
          </AnimatePresence>
          
          {gameActive && (
            <p className="mt-4 text-purple-600 font-medium">
              Hearts caught: {caughtHearts} 💕
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default MiniGames;

