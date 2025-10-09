import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className = "", hoverEffect = true, ...props }) => {
  return (
    <motion.div
      className={`bg-[var(--current-nav)] rounded-xl overflow-hidden shadow-lg ${
        hoverEffect ? 'hover:shadow-xl' : ''
      } transition-shadow ${className}`}
      whileHover={hoverEffect ? { y: -5 } : {}}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;