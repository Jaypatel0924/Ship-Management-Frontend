
const MOCK_DATA = {
  users: [
    { id: "1", role: "Admin", email: "admin@entnt.in", password: "admin123" },
    { id: "2", role: "Inspector", email: "inspector@entnt.in", password: "inspect123" },
    { id: "3", role: "Engineer", email: "engineer@entnt.in", password: "engine123" },
   
  ],
  ships: [
    { id: "s1", name: "Ever Given", imo: "9811000", flag: "Panama", status: "Active" },
    { id: "s2", name: "Maersk Alabama", imo: "9164263", flag: "USA", status: "Under Maintenance" }
  ],
  components: [
    { id: "c1", shipId: "s1", name: "Main Engine", serialNumber: "ME-1234", installDate: "2020-01-10", lastMaintenanceDate: "2024-03-12" },
    { id: "c2", shipId: "s2", name: "Radar", serialNumber: "RAD-5678", installDate: "2021-07-18", lastMaintenanceDate: "2023-12-01" }
  ],
  jobs: [
    { id: "j1", componentId: "c1", shipId: "s1", type: "Inspection", priority: "High", status: "Open", assignedEngineerId: "3", scheduledDate: "2025-05-05" },
    { id: "j2", componentId: "c2", shipId: "s2", type: "Inspection", priority: "High", status: "Open", assignedEngineerId: "3", scheduledDate: "2025-05-06" }
  ],
  notifications: []
};

// Initialize localStorage
export const initializeData = () => {
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(MOCK_DATA.users));
    localStorage.setItem('ships', JSON.stringify(MOCK_DATA.ships));
    localStorage.setItem('components', JSON.stringify(MOCK_DATA.components));
    localStorage.setItem('jobs', JSON.stringify(MOCK_DATA.jobs));
    localStorage.setItem('notifications', JSON.stringify(MOCK_DATA.notifications));
  }
};

// User functions
export const getUsers = () => JSON.parse(localStorage.getItem('users')) || [];
export const setCurrentUser = (user) => localStorage.setItem('currentUser', JSON.stringify(user));
export const getCurrentUser = () => JSON.parse(localStorage.getItem('currentUser'));
export const clearCurrentUser = () => localStorage.removeItem('currentUser');

// Ship functions
export const getShips = () => JSON.parse(localStorage.getItem('ships')) || [];
export const saveShip = (ship) => {
  const ships = getShips();
  if (ship.id) {
    const index = ships.findIndex(s => s.id === ship.id);
    if (index !== -1) {
      ships[index] = ship;
    } else {
      ships.push(ship);
    }
  } else {
    ship.id = `s${Date.now()}`;
    ships.push(ship);
  }
  localStorage.setItem('ships', JSON.stringify(ships));
  return ship;
};
export const deleteShip = (id) => {
  const ships = getShips().filter(ship => ship.id !== id);
  localStorage.setItem('ships', JSON.stringify(ships));
};

// Component functions
export const getComponents = () => JSON.parse(localStorage.getItem('components')) || [];
export const saveComponent = (component) => {
  const components = getComponents();
  if (component.id) {
    const index = components.findIndex(c => c.id === component.id);
    if (index !== -1) {
      components[index] = component;
    } else {
      components.push(component);
    }
  } else {
    component.id = `c${Date.now()}`;
    components.push(component);
  }
  localStorage.setItem('components', JSON.stringify(components));
  return component;
};
export const deleteComponent = (id) => {
  const components = getComponents().filter(comp => comp.id !== id);
  localStorage.setItem('components', JSON.stringify(components));
};

// Job functions

export const getJobs = () => JSON.parse(localStorage.getItem('jobs')) || [];

export const saveJob = (job) => {
  const jobs = getJobs();
  
  // Generate ID for new jobs
  if (!job.id) {
    job.id = `j${Date.now()}`;
  }
  
  const index = jobs.findIndex(j => j.id === job.id);
  
  if (index !== -1) {
    // Update existing job
    jobs[index] = job;
  } else {
    // Add new job
    jobs.push(job);
  }
  
  localStorage.setItem('jobs', JSON.stringify(jobs));
  return job;
};
export const deleteJob = (id) => {
  const jobs = getJobs().filter(job => job.id !== id);
  localStorage.setItem('jobs', JSON.stringify(jobs));
};

// Notification functions
export const getNotifications = () => JSON.parse(localStorage.getItem('notifications')) || [];
export const saveNotification = (notification) => {
  const notifications = getNotifications();
  notifications.unshift(notification); // Add to beginning
  localStorage.setItem('notifications', JSON.stringify(notifications));
  return notification;
};
export const markNotificationAsRead = (id) => {
  const notifications = getNotifications().map(notif => 
    notif.id === id ? { ...notif, read: true } : notif
  );
  localStorage.setItem('notifications', JSON.stringify(notifications));
};