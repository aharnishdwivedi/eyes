import { motion } from 'framer-motion';

const LoveNotes = () => {
  const leetcodeProblems = [
    {
      id: 1,
      title: 'Best Time to Buy and Sell Stock',
      url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/',
      emoji: '📈',
    },
    {
      id: 2,
      title: 'Valid Parentheses',
      url: 'https://leetcode.com/problems/valid-parentheses/',
      emoji: '🔢',
    },
    {
      id: 3,
      title: 'Remove Duplicates from Sorted Array',
      url: 'https://leetcode.com/problems/remove-duplicates-from-sorted-array/description/',
      emoji: '🧹',
    },
    {
      id: 4,
      title: 'Longest Common Prefix',
      url: 'https://leetcode.com/problems/longest-common-prefix/description/',
      emoji: '🔤',
    },
    {
      id: 5,
      title: 'Missing Number',
      url: 'https://leetcode.com/problems/missing-number/',
      emoji: '🔍',
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center py-12 md:py-20 px-4 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/images/bgcute.jpeg)',
        }}
      />
      
      {/* White Glass Effect Overlay */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-md" />
      
      {/* Eyes Image - Front */}
      <motion.div
        className="absolute top-4 md:top-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.img
          src="/images/eyes.jpeg"
          alt="Eyes"
          className="w-32 h-32 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full object-cover shadow-2xl border-4 border-white/50 glow-pink"
          animate={{
            scale: [1, 1.05, 1],
            filter: [
              'brightness(1)',
              'brightness(1.1)',
              'brightness(1)',
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
      
      {/* Content Container with Glass Effect */}
      <div className="relative z-10 max-w-2xl mx-auto w-full mt-32 md:mt-40 lg:mt-44">
        <motion.div
          className="glass-effect rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 bg-white/60 backdrop-blur-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-6 md:mb-8"
          >
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gradient mb-4"
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            💻 Coding Time! 💻
          </motion.h2>
          <motion.p
            className="text-xl md:text-2xl text-purple-700 font-medium"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            ye leetcode krlo please cutieee 🥺
          </motion.p>
          </motion.div>

          <div className="space-y-3 md:space-y-4">
          {leetcodeProblems.map((problem, index) => (
            <motion.a
              key={problem.id}
              href={problem.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              className="block bg-white/70 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 hover:shadow-lg hover:bg-white/80 transition-all duration-300 cursor-pointer group border border-white/30"
            >
              <div className="flex items-center gap-3 md:gap-4">
                <motion.span
                  className="text-3xl md:text-4xl"
                  animate={{
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2,
                    ease: 'easeInOut',
                  }}
                >
                  {problem.emoji}
                </motion.span>
                <div className="flex-1">
                  <p className="text-base md:text-lg font-semibold text-purple-800 group-hover:text-purple-900 transition-colors">
                    {problem.title}
                  </p>
                  <p className="text-xs md:text-sm text-purple-500 mt-1">
                    Click to solve →
                  </p>
                </div>
                <motion.span
                  className="text-xl md:text-2xl"
                  animate={{
                    x: [0, 5, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: index * 0.15,
                    ease: 'easeInOut',
                  }}
                >
                  →
                </motion.span>
              </div>
            </motion.a>
          ))}
          </div>

          <motion.div
            className="mt-6 md:mt-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <motion.p
              className="text-sm md:text-base text-purple-700 font-medium"
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              You got this! 💪✨
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default LoveNotes;
