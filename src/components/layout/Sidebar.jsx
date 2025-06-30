import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FaHome, FaShip, FaCalendarAlt, FaClipboardList, FaBell, FaCog } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const { currentUser } = useAuth();
  const location = useLocation();

  const navItems = [
    { path: '/', name: 'Dashboard', icon: <FaHome />, roles: ['Admin', 'Inspector', 'Engineer'] },
    { path: '/ships', name: 'Ships', icon: <FaShip />, roles: ['Admin', 'Inspector'] },
    { path: '/jobs', name: 'Jobs', icon: <FaClipboardList />, roles: ['Admin', 'Inspector', 'Engineer'] },
    { path: '/calendar', name: 'Calendar', icon: <FaCalendarAlt />, roles: ['Admin', 'Inspector'] },
    { path: '/notifications', name: 'Notifications', icon: <FaBell />, roles: ['Admin', 'Inspector', 'Engineer'] },
    { path: '/settings', name: 'Settings', icon: <FaCog />, roles: ['Admin'] },
  ];

  const filteredNavItems = navItems.filter(item => 
    item.roles.includes(currentUser?.role)
  );

  return (
    <motion.div 
      initial={{ width: 0 }}
      animate={{ width: '16rem' }}
      exit={{ width: 0 }}
      className="hidden md:block bg-gray-800 text-white w-64 min-h-full z-10"
    >
      <div className="p-4">
        <div className="flex items-center mb-8">
          <div className="bg-blue-600 w-8 h-8 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <h1 className="ml-2 text-xl font-bold">ShipMaint</h1>
        </div>
        
        <nav>
          <ul className="space-y-1">
            {filteredNavItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => 
                    `flex items-center px-4 py-3 rounded-lg transition ${
                      isActive 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-300 hover:bg-gray-700'
                    }`
                  }
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </motion.div>
  );
};

export default Sidebar;