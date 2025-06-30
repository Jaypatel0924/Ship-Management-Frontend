// Check if user has permission based on role
export const hasPermission = (user, requiredRole) => {
  if (!user || !user.role) return false;
  
  const roleHierarchy = {
    Admin: ['Admin', 'Inspector', 'Engineer'],
    Inspector: ['Inspector', 'Engineer'],
    Engineer: ['Engineer']
  };
  
  return roleHierarchy[user.role]?.includes(requiredRole) || false;
};

// Get allowed actions for the current user
export const getAllowedActions = (user) => {
  if (!user) return [];
  
  const actions = {
    Admin: ['create_ship', 'edit_ship', 'delete_ship', 'create_component', 'edit_component', 'delete_component', 'create_job', 'edit_job', 'delete_job'],
    Inspector: ['create_job', 'edit_job'],
    Engineer: ['edit_job']
  };
  
  return actions[user.role] || [];
};