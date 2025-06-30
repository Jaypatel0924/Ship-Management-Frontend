import React from 'react';
import { motion } from 'framer-motion';

const HoverGlowCard = ({ children, className = '' }) => {
  return (
    <motion.div
      className={`relative group ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl blur opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        {children}
      </div>
    </motion.div>
  );
};

export default HoverGlowCard;