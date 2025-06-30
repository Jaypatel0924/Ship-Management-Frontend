

import React, { createContext, useState, useEffect, useContext } from 'react';
import { 
  getShips, saveShip, deleteShip,
  getComponents, saveComponent, deleteComponent,
  getJobs, saveJob, deleteJob,
  getNotifications, saveNotification, markNotificationAsRead
} from '../utils/localStorageUtils';

const DataContext = createContext();

export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  const [ships, setShips] = useState([]);
  const [components, setComponents] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setShips(getShips());
    setComponents(getComponents());
    setJobs(getJobs());
    setNotifications(getNotifications());
    setLoading(false);
  }, []);

  // Ship operations
  const addShip = (ship) => {
    const newShip = saveShip(ship);
    setShips(getShips());
    return newShip;
  };

  const updateShip = (ship) => {
    const updatedShip = saveShip(ship);
    setShips(getShips());
    return updatedShip;
  };

  const removeShip = (id) => {
    deleteShip(id);
    setShips(getShips());
  };

  // Component operations
  const addComponent = (component) => {
    const newComponent = saveComponent(component);
    setComponents(getComponents());
    return newComponent;
  };

  const updateComponent = (component) => {
    const updatedComponent = saveComponent(component);
    setComponents(getComponents());
    return updatedComponent;
  };

  const removeComponent = (id) => {
    deleteComponent(id);
    setComponents(getComponents());
  };


// Job operations
const addJob = (job) => {
  const newJob = saveJob(job);
  setJobs(getJobs());
  
  // Create notification for new job
  const notification = {
    id: `n${Date.now()}`,
    type: 'job_created',
    message: `New job created: ${job.type} for ${job.componentId}`,
    read: false,
    timestamp: new Date().toISOString(),
  };
  addNotification(notification);
  
  return newJob;
};

const updateJob = (job) => {
  const updatedJob = saveJob(job);
  setJobs(getJobs());
  
  // Create notification for job update
  const notification = {
    id: `n${Date.now()}`,
    type: 'job_updated',
    message: `Job updated: ${job.type} - Status: ${job.status}`,
    read: false,
    timestamp: new Date().toISOString(),
  };
  
  // Special notification for completed jobs
  if (job.status === 'Completed') {
    const completedNotification = {
      id: `n${Date.now() + 1}`,
      type: 'job_completed',
      message: `Job completed: ${job.type}`,
      read: false,
      timestamp: new Date().toISOString(),
    };
    addNotification(completedNotification);
  }
  
  addNotification(notification);
  
  return updatedJob;
};

  const removeJob = (id) => {
    deleteJob(id);
    setJobs(getJobs());
  };

  // Notification operations
  const addNotification = (notification) => {
    const newNotification = saveNotification(notification);
    setNotifications(getNotifications());
    return newNotification;
  };

  const markAsRead = (id) => {
    markNotificationAsRead(id);
    setNotifications(getNotifications());
  };

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(n => ({ ...n, read: true }));
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
    setNotifications(updatedNotifications);
  };

  const value = {
    ships,
    components,
    jobs,
    notifications,
    loading,
    addShip,
    updateShip,
    removeShip,
    addComponent,
    updateComponent,
    removeComponent,
    addJob,
    updateJob,
    removeJob,
    addNotification,
    markAsRead,
    markAllAsRead,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}