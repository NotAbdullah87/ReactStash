import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

// Animation variants for Framer Motion
const backgroundVariants = {
  initial: {
    rotate: 0,
    x: 0,
    y: 0,
  },
  hover: {
    rotate: 20,
    x: 8,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 15,
    },
  },
};

const foregroundVariants = {
  initial: {
    scale: 1,
  },
  hover: {
    scale: 1.05,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 15,
    },
  },
};

const GlassButtonVariant1 = ({ children, className, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover="hover"
      whileTap={{ scale: 0.95 }}
      initial="initial"
      className={clsx(
        'group relative  h-24 w-24 cursor-pointer border-none bg-transparent',
        className
      )}
      aria-label="Glassmorphism button"
    >
      {/* Background Solid Rectangle */}
      <motion.div
        variants={backgroundVariants}
        className="absolute rotate-5 -translate-y-1 translate-x-2 inset-0 rounded-[30px] bg-violet-500"
      />

      {/* Foreground Glassmorphism Rectangle */}
      <motion.div
        variants={foregroundVariants}
        className={clsx(
          'absolute inset-0 flex items-center justify-center rounded-[30px] border',
          // Glassmorphism styles
          'border-white/30 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-md'
        )}
      >
        {children}
      </motion.div>
    </motion.button>
  );
};

export default GlassButtonVariant1;