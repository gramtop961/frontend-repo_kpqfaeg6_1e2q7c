import React from 'react';
import { motion } from 'framer-motion';

const letterVariants = {
  hidden: { opacity: 0, y: 12, rotate: 2 },
  visible: (i) => ({
    opacity: 0.95,
    y: 0,
    rotate: 0,
    transition: { delay: 0.02 * i, type: 'spring', stiffness: 200, damping: 20 },
  }),
};

const CosmicText = ({ text, className = '', delay = 0 }) => {
  const letters = Array.from(text);
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      className={`inline-block ${className}`}
    >
      {letters.map((ch, i) => (
        <motion.span
          key={`${ch}-${i}`}
          custom={i}
          variants={letterVariants}
          style={{ display: 'inline-block' }}
          transition={{ delay: delay + i * 0.015 }}
          className="text-white/90"
        >
          {ch === ' ' ? '\u00A0' : ch}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default CosmicText;
