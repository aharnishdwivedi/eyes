import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="relative py-12 px-4 bg-gradient-to-br from-pink-200/50 via-purple-200/50 to-pink-100/50">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <motion.p
          className="text-xl md:text-2xl text-purple-700 font-medium glow-pink"
          animate={{
            textShadow: [
              '0 0 10px rgba(255, 182, 193, 0.5)',
              '0 0 20px rgba(221, 160, 221, 0.7)',
              '0 0 10px rgba(255, 182, 193, 0.5)',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          Built by Aharnish, with love ❤️
        </motion.p>
      </motion.div>
    </footer>
  );
};

export default Footer;

