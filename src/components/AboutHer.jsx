import { motion } from 'framer-motion';
import Sparkles from './Sparkles';

const AboutHer = () => {
  const lines = [
    "In your eyes, I found my home 🌟",
    "Your smile lights up my world ✨",
    "Every moment with you is magic 💫",
    "You are my favorite person in the universe 🌙",
    "Your laugh is my favorite sound 🎵",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 px-4">
      <Sparkles count={15} />
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center text-gradient mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          About You 💕
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6"
        >
          {lines.map((line, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, x: 10 }}
              className="glass-effect rounded-2xl p-6 md:p-8 text-center text-lg md:text-xl text-purple-800 font-medium shadow-lg"
            >
              {line}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <motion.img
            src="/images/she1.png"
            alt="Her"
            className="w-48 md:w-64 mx-auto rounded-3xl shadow-xl glow-purple"
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ type: 'spring', stiffness: 300 }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutHer;

