import React from 'react';
import { motion } from 'framer-motion';

const AnimatedCard = ({ children, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.02 }}
      className={`bg-white rounded-xl shadow-md p-6 border border-gray-100 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;