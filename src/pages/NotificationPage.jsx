import React from 'react';
import { useData } from '../contexts/DataContext';
import { motion } from 'framer-motion';
import { FaBell, FaTrash, FaCheck } from 'react-icons/fa';
import HoverGlowCard from '../components/ui/HoverGlowCard';
import AnimatedCard from '../components/ui/AnimatedCard';

const NotificationPage = () => {
  const { notifications, markAsRead, markAllAsRead } = useData();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const notificationIcon = (type) => {
    switch(type) {
      case 'job_created':
        return <FaBell className="text-blue-500" />;
      case 'job_updated':
        return <FaBell className="text-yellow-500" />;
      case 'job_completed':
        return <FaCheck className="text-green-500" />;
      default:
        return <FaBell className="text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Notifications</h1>
          <p className="text-gray-600">Your recent system notifications</p>
        </div>
        {notifications.length > 0 && (
          <button
            onClick={markAllAsRead}
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition"
          >
            Mark All as Read
          </button>
        )}
      </motion.div>

      <HoverGlowCard>
        {notifications.length === 0 ? (
          <div className="text-center py-12">
            <FaBell className="mx-auto text-4xl text-gray-400 mb-4" />
            <p className="text-gray-500">No notifications available</p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification, index) => (
              <AnimatedCard key={notification.id} delay={index * 0.1}>
                <div className={`p-4 border-l-4 ${
                  notification.read ? 'border-gray-300' : 'border-blue-500'
                }`}>
                  <div className="flex justify-between">
                    <div className="flex items-start">
                      <div className="mr-3 mt-1">
                        {notificationIcon(notification.type)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{notification.message}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          {formatDate(notification.timestamp)}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Mark as read"
                        >
                          <FaCheck />
                        </button>
                      )}
                      <button
                        className="text-gray-400 hover:text-gray-600"
                        title="Dismiss"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        )}
      </HoverGlowCard>
    </div>
  );
};

export default NotificationPage;