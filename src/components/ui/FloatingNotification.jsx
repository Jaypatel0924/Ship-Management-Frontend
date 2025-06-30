import React from 'react';
import { motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

const FloatingNotification = ({ id, message, type, onDismiss }) => {
  const bgColor = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    warning: 'bg-yellow-500'
  }[type] || 'bg-blue-500';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, transition: { duration: 0.2 } }}
      className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg text-white ${bgColor} flex items-center`}
    >
      <span>{message}</span>
      <button 
        onClick={() => onDismiss(id)}
        className="ml-4 text-white hover:text-gray-200 focus:outline-none"
      >
        <FaTimes />
      </button>
    </motion.div>
  );
};

export default FloatingNotification;