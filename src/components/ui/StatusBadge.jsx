import React, { useState } from 'react';
import { FaSync } from 'react-icons/fa';

const StatusBadge = ({ status, jobId, onStatusChange, isUpdating }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const statusColors = {
    Open: 'bg-blue-100 text-blue-800',
    'In Progress': 'bg-yellow-100 text-yellow-800',
    Completed: 'bg-green-100 text-green-800',
    Cancelled: 'bg-red-100 text-red-800',
  };
  
  const handleChange = (e) => {
    onStatusChange(jobId, e.target.value);
    setIsOpen(false);
  };
  
  if (isUpdating) {
    return (
      <div className="flex justify-center">
        <FaSync className="animate-spin text-blue-500" />
      </div>
    );
  }
  
  return (
    <div className="relative">
      {isOpen ? (
        <select
          value={status}
          onChange={handleChange}
          onBlur={() => setIsOpen(false)}
          autoFocus
          className={`px-2 py-1 rounded-full text-xs font-semibold focus:outline-none focus:ring ${statusColors[status]}`}
        >
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[status]}`}
        >
          {status}
        </button>
      )}
    </div>
  );
};

export default StatusBadge;