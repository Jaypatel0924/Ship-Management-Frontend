import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { motion } from 'framer-motion';
import AnimatedCard from '../ui/AnimatedCard';

const DayEvents = ({ events }) => {
  const { ships, components } = useData();

  const getShipName = (shipId) => {
    const ship = ships.find(s => s.id === shipId);
    return ship ? ship.name : 'N/A';
  };

  const getComponentName = (componentId) => {
    const component = components.find(c => c.id === componentId);
    return component ? component.name : 'N/A';
  };

  return (
    <div className="space-y-4">
      {events.map((job, index) => (
        <AnimatedCard key={job.id} delay={index * 0.1}>
          <div className="p-4">
            <div className="font-medium text-blue-600">
              {job.type}
            </div>
            <div className="text-sm text-gray-600 mt-1">
              Ship: {getShipName(job.shipId)}
            </div>
            <div className="text-sm text-gray-600">
              Component: {getComponentName(job.componentId)}
            </div>
            <div className="flex items-center mt-2">
              <span className="text-sm text-gray-600">Priority:</span>
              <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                job.priority === 'High' ? 'bg-red-100 text-red-800' :
                job.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {job.priority}
              </span>
            </div>
            <div className="flex items-center mt-1">
              <span className="text-sm text-gray-600">Status:</span>
              <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                job.status === 'Completed' ? 'bg-green-100 text-green-800' :
                job.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {job.status}
              </span>
            </div>
            <div className="mt-3">
              <Link 
                to={`/jobs/edit/${job.id}`}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                View Details
              </Link>
            </div>
          </div>
        </AnimatedCard>
      ))}
    </div>
  );
};

export default DayEvents;