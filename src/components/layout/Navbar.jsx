import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FaBell, FaUserCircle, FaCog, FaSignOutAlt, FaBars } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const location = useLocation();

  // Close dropdown when route changes
  useEffect(() => {
    setShowDropdown(false);
    setShowMobileMenu(false);
  }, [location]);

  // Simulated notifications
  useEffect(() => {
    const mockNotifications = [
      { id: 1, message: 'New maintenance job scheduled for Ever Given', date: '2 hours ago', read: false },
      { id: 2, message: 'Component inspection overdue for Maersk Alabama', date: '1 day ago', read: false },
      { id: 3, message: 'Job #J-245 completed successfully', date: '2 days ago', read: true },
    ];
    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.read).length);
  }, []);

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? {...n, read: true} : n
    ));
    setUnreadCount(unreadCount - 1);
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({...n, read: true})));
    setUnreadCount(0);
  };

  return (
    <nav className="bg-white shadow-sm z-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="bg-blue-600 w-8 h-8 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-800 hidden md:block">ShipMaint</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/notifications" className="relative p-2 rounded-full text-gray-500 hover:text-gray-700">
              <FaBell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Link>
            
            <div className="relative">
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <FaUserCircle className="text-blue-600 text-xl" />
                </div>
                <span className="text-gray-700 hidden lg:inline-block">
                  {currentUser?.role}
                </span>
              </button>
              
              <AnimatePresence>
                {showDropdown && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50"
                  >
                    <div className="px-4 py-2 border-b">
                      <p className="text-sm font-medium text-gray-900">{currentUser?.email}</p>
                      <p className="text-sm text-gray-500 capitalize">{currentUser?.role}</p>
                    </div>
                    <Link 
                      to="/settings" 
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FaCog className="mr-3 text-gray-400" />
                      Settings
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FaSignOutAlt className="mr-3 text-gray-400" />
                      Sign out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          <div className="flex items-center md:hidden">
            <button 
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <FaBars className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden"
          >
            <div className="pt-2 pb-3 space-y-1">
              <Link 
                to="/notifications" 
                className="flex items-center pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
              >
                <FaBell className="mr-3 text-gray-500" />
                Notifications
                {unreadCount > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </Link>
              <Link 
                to="/settings" 
                className="flex items-center pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
              >
                <FaCog className="mr-3 text-gray-500" />
                Settings
              </Link>
              <button
                onClick={logout}
                className="w-full text-left flex items-center pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
              >
                <FaSignOutAlt className="mr-3 text-gray-500" />
                Sign out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;