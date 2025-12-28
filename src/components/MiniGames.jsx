import { motion } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';

const MiniGames = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState({ x: 1, y: 0 });
  const [nextDirection, setNextDirection] = useState({ x: 1, y: 0 });
  
  const gridSize = 20;
  const gameAreaRef = useRef(null);
  const gameLoopRef = useRef(null);

  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize),
    };
    setFood(newFood);
  }, []);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setSnake([{ x: 10, y: 10 }]);
    setDirection({ x: 1, y: 0 });
    setNextDirection({ x: 1, y: 0 });
    generateFood();
  };

  const handleKeyPress = useCallback((e) => {
    if (!gameStarted || gameOver) return;

    const key = e.key;
    const newDir = { ...nextDirection };

    if (key === 'ArrowUp' && direction.y === 0) {
      newDir.x = 0;
      newDir.y = -1;
    } else if (key === 'ArrowDown' && direction.y === 0) {
      newDir.x = 0;
      newDir.y = 1;
    } else if (key === 'ArrowLeft' && direction.x === 0) {
      newDir.x = -1;
      newDir.y = 0;
    } else if (key === 'ArrowRight' && direction.x === 0) {
      newDir.x = 1;
      newDir.y = 0;
    }

    setNextDirection(newDir);
  }, [gameStarted, gameOver, direction, nextDirection]);

  const handleSwipe = useCallback((dir) => {
    if (!gameStarted || gameOver) return;

    const newDir = { ...nextDirection };

    if (dir === 'up' && direction.y === 0) {
      newDir.x = 0;
      newDir.y = -1;
    } else if (dir === 'down' && direction.y === 0) {
      newDir.x = 0;
      newDir.y = 1;
    } else if (dir === 'left' && direction.x === 0) {
      newDir.x = -1;
      newDir.y = 0;
    } else if (dir === 'right' && direction.x === 0) {
      newDir.x = 1;
      newDir.y = 0;
    }

    setNextDirection(newDir);
  }, [gameStarted, gameOver, direction, nextDirection]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    if (gameStarted && !gameOver) {
      gameLoopRef.current = setInterval(() => {
        setSnake((prevSnake) => {
          setDirection(nextDirection);
          const head = prevSnake[0];
          const newHead = {
            x: head.x + nextDirection.x,
            y: head.y + nextDirection.y,
          };

          // Check wall collision
          if (
            newHead.x < 0 ||
            newHead.x >= gridSize ||
            newHead.y < 0 ||
            newHead.y >= gridSize
          ) {
            setGameOver(true);
            setGameStarted(false);
            return prevSnake;
          }

          // Check self collision
          if (prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
            setGameOver(true);
            setGameStarted(false);
            return prevSnake;
          }

          const newSnake = [newHead, ...prevSnake];

          // Check food collision
          if (newHead.x === food.x && newHead.y === food.y) {
            setScore((prev) => prev + 1);
            generateFood();
          } else {
            newSnake.pop();
          }

          return newSnake;
        });
      }, 150); // Game speed

      return () => {
        if (gameLoopRef.current) clearInterval(gameLoopRef.current);
      };
    }
  }, [gameStarted, gameOver, nextDirection, food, generateFood]);

  const cellSize = '100%';

  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-200/30 via-purple-200/30 to-pink-100/30" />
      
      <div className="relative z-10 max-w-2xl mx-auto w-full">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center text-gradient mb-8"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Eat Strawberry 🍓
        </motion.h2>

        <motion.div
          className="glass-effect rounded-3xl p-4 md:p-6 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Score Display */}
          {gameStarted && (
            <div className="mb-4">
              <motion.div
                className="inline-block bg-white/80 backdrop-blur-md px-6 py-2 rounded-full shadow-lg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                <p className="text-2xl md:text-3xl font-bold text-purple-700">
                  Score: {score} 💕
                </p>
              </motion.div>
            </div>
          )}

          {/* Game Area */}
          <div
            ref={gameAreaRef}
            className="relative bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl overflow-hidden border-4 border-white/50 shadow-2xl w-full"
            style={{
              aspectRatio: '1',
              maxWidth: '500px',
              margin: '0 auto',
              touchAction: 'none',
            }}
          >
            {/* Game Grid */}
            <div
              className="grid w-full h-full touch-none"
              style={{
                gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                gridTemplateRows: `repeat(${gridSize}, 1fr)`,
                touchAction: 'none',
              }}
            >
              {Array.from({ length: gridSize * gridSize }).map((_, index) => {
                const x = index % gridSize;
                const y = Math.floor(index / gridSize);
                const isSnake = snake.some((seg) => seg.x === x && seg.y === y);
                const isHead = snake[0]?.x === x && snake[0]?.y === y;
                const isFood = food.x === x && food.y === y;

                return (
                  <div
                    key={index}
                    className="border border-pink-200/30"
                    style={{
                      backgroundColor: isSnake
                        ? isHead
                          ? 'rgba(255, 182, 193, 0.9)'
                          : 'rgba(221, 160, 221, 0.7)'
                        : isFood
                        ? 'rgba(255, 192, 203, 0.8)'
                        : 'transparent',
                    }}
                  >
                    {isHead && (
                      <motion.div
                        className="w-full h-full flex items-center justify-center text-2xl"
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      >
                        💖
                      </motion.div>
                    )}
                    {isFood && !isSnake && (
                      <motion.div
                        className="w-full h-full flex items-center justify-center text-xl"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      >
                        🍓
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Start Screen */}
            {!gameStarted && !gameOver && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 backdrop-blur-sm">
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="text-center px-4"
                >
                  <p className="text-4xl md:text-6xl mb-4">💖🍓</p>
                  <p className="text-2xl md:text-3xl font-bold text-white mb-4 drop-shadow-lg">
                    Tap to Start!
                  </p>
                  <div className="space-y-2 text-white/90 drop-shadow">
                    <p className="text-base md:text-lg">
                      📱 <strong>Mobile:</strong> Use arrow buttons below
                    </p>
                    <p className="text-base md:text-lg">
                      💻 <strong>PC:</strong> Use arrow keys (↑ ↓ ← →)
                    </p>
                  </div>
                </motion.div>
              </div>
            )}

            {/* Game Over Screen */}
            {gameOver && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-md">
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="text-center bg-white/90 backdrop-blur-lg rounded-3xl p-8 md:p-10 max-w-md mx-4"
                >
                  <p className="text-5xl md:text-6xl mb-4">💔</p>
                  <p className="text-2xl md:text-3xl font-bold text-purple-700 mb-2">
                    Game Over!
                  </p>
                  <p className="text-xl md:text-2xl text-purple-600 mb-6">
                    Score: {score} 💕
                  </p>
                  <motion.button
                    onClick={startGame}
                    className="px-8 py-4 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full font-bold text-lg shadow-lg glow-pink"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Play Again! 🎮
                  </motion.button>
                </motion.div>
              </div>
            )}
          </div>

          {/* Mobile Controls */}
          {gameStarted && !gameOver && (
            <div className="mt-4 md:mt-6 grid grid-cols-3 gap-3 md:gap-4 max-w-xs mx-auto px-4">
              <div></div>
              <motion.button
                onClick={() => handleSwipe('up')}
                className="col-span-1 bg-gradient-to-br from-pink-400 to-purple-400 text-white rounded-xl p-4 md:p-5 text-3xl md:text-4xl shadow-lg glow-pink touch-manipulation active:scale-95"
                whileTap={{ scale: 0.85 }}
              >
                ↑
              </motion.button>
              <div></div>
              <motion.button
                onClick={() => handleSwipe('left')}
                className="bg-gradient-to-br from-pink-400 to-purple-400 text-white rounded-xl p-4 md:p-5 text-3xl md:text-4xl shadow-lg glow-pink touch-manipulation active:scale-95"
                whileTap={{ scale: 0.85 }}
              >
                ←
              </motion.button>
              <motion.button
                onClick={() => handleSwipe('down')}
                className="bg-gradient-to-br from-pink-400 to-purple-400 text-white rounded-xl p-4 md:p-5 text-3xl md:text-4xl shadow-lg glow-pink touch-manipulation active:scale-95"
                whileTap={{ scale: 0.85 }}
              >
                ↓
              </motion.button>
              <motion.button
                onClick={() => handleSwipe('right')}
                className="bg-gradient-to-br from-pink-400 to-purple-400 text-white rounded-xl p-4 md:p-5 text-3xl md:text-4xl shadow-lg glow-pink touch-manipulation active:scale-95"
                whileTap={{ scale: 0.85 }}
              >
                →
              </motion.button>
            </div>
          )}

          {/* Start Button */}
          {!gameStarted && !gameOver && (
            <motion.button
              onClick={startGame}
              className="mt-6 px-8 py-4 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full font-bold text-lg shadow-lg glow-pink"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Game! 🎮
            </motion.button>
          )}

          {/* Instructions */}
          {!gameStarted && !gameOver && (
            <motion.div
              className="mt-4 text-purple-600 text-sm md:text-base space-y-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p className="font-semibold">How to Play:</p>
              <p>📱 <strong>Mobile:</strong> Use arrow buttons to control</p>
              <p>💻 <strong>PC:</strong> Use arrow keys (↑ ↓ ← →)</p>
              <p className="mt-2">Eat the 🍓 to grow and score points! 💕</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default MiniGames;
