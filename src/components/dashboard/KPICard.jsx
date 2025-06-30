import React from 'react';
import { motion } from 'framer-motion';

const KPICard = ({ title, value, icon, change }) => {
  const isPositive = change >= 0;
  
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <h3 className="text-3xl font-bold text-gray-800 mt-2">{value}</h3>
        </div>
        <div className="p-3 rounded-lg bg-blue-50 text-blue-500">
          {icon}
        </div>
      </div>
      
      {change !== undefined && (
        <div className={`mt-4 flex items-center text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          <span>{isPositive ? '↑' : '↓'} {Math.abs(change)}%</span>
          <span className="ml-2">{isPositive ? 'Increase' : 'Decrease'} from last month</span>
        </div>
      )}
    </motion.div>
  );
};

export default KPICard;