import { motion } from 'framer-motion';
import { useState } from 'react';
import HeartPopup from './HeartPopup';

const UsMemories = () => {
  const [flipped, setFlipped] = useState({});
  const [heartPopup, setHeartPopup] = useState({ show: false, x: 50, y: 50 });

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

  const memories = [
    {
      id: 1,
      image: '/images/us.png',
      text: 'We Look Good Together 💕',
    },
    {
      id: 2,
      image: '/images/us2.png',
      text: 'Kyuu ho itni cutee ???? ✨',
    },
  ];

  const toggleFlip = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 via-pink-100/50 to-purple-50/50" />
      
      <HeartPopup show={heartPopup.show} x={heartPopup.x} y={heartPopup.y} />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center text-gradient mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Our Memories 📸
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {memories.map((memory, index) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="w-full"
              style={{ perspective: '1000px' }}
            >
              <div
                className="relative w-full h-80 cursor-pointer"
                onClick={() => toggleFlip(memory.id)}
                style={{ 
                  transformStyle: 'preserve-3d',
                }}
              >
                <motion.div
                  className="absolute inset-0 w-full h-full"
                  animate={{ rotateY: flipped[memory.id] ? 180 : 0 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                  style={{ 
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Front side - Heart */}
                  <div
                    className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden shadow-2xl"
                    style={{ 
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                    }}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-pink-300 to-purple-300 flex items-center justify-center rounded-3xl">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-6xl"
                      >
                        💖
                      </motion.div>
                    </div>
                  </div>
                  
                  {/* Back side - Image */}
                  <div
                    className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden shadow-2xl"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                    }}
                  >
                    <img
                      src={memory.image}
                      alt={memory.text}
                      onClick={handleImageClick}
                      onTouchStart={handleImageClick}
                      className="w-full h-full object-cover rounded-3xl cursor-pointer touch-manipulation select-none"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 rounded-b-3xl">
                      <p className="text-white font-medium text-lg">{memory.text}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-center mt-8 text-purple-600 text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          Tap the cards to reveal our memories 💕
        </motion.p>

        {/* Special Message from Cutu */}
        <motion.div
          className="mt-12 md:mt-16 px-4 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2, duration: 1.2 }}
        >
          <motion.div
            className="glass-effect rounded-3xl p-6 md:p-8 lg:p-10 bg-gradient-to-br from-pink-200/80 via-purple-200/80 to-pink-100/80 backdrop-blur-lg border-2 border-white/40 shadow-2xl"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <motion.p
              className="text-lg md:text-xl lg:text-2xl text-purple-800 font-medium leading-relaxed text-center"
              animate={{
                textShadow: [
                  '0 0 10px rgba(255, 182, 193, 0.3)',
                  '0 0 15px rgba(221, 160, 221, 0.5)',
                  '0 0 10px rgba(255, 182, 193, 0.3)',
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              Urvashi, remember if everyone is against you then I am against everyone. 
              <br className="hidden md:block" />
              You will always have me beside you.
              <br />
              <span className="text-2xl md:text-3xl font-bold text-gradient mt-2 block">
                Your truly, Cutu 💕
              </span>
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default UsMemories;

