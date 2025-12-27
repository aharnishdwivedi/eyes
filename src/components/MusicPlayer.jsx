import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.3; // Start at 30% volume
      const fadeIn = setInterval(() => {
        if (audio.volume < 0.6) {
          audio.volume += 0.01;
        } else {
          clearInterval(fadeIn);
        }
      }, 100);

      // Try to autoplay
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setIsLoaded(true);
          })
          .catch(() => {
            // Autoplay failed, user needs to interact
            setIsLoaded(true);
          });
      }
    }
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        loop
        preload="auto"
        onLoadedData={() => setIsLoaded(true)}
      >
        <source src="/audio/uskiaankhon.mp3" type="audio/mpeg" />
      </audio>
      
      <AnimatePresence>
        {isLoaded && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={togglePlay}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center text-white shadow-lg glow-pink"
          >
            <motion.svg
              animate={isPlaying ? { rotate: 360 } : {}}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              {isPlaying ? (
                <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" />
              ) : (
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              )}
            </motion.svg>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default MusicPlayer;

