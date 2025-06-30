import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaEdit, FaTrash, FaCalendarAlt, FaShip, FaWrench, FaUser, FaHistory } from 'react-icons/fa';
import HoverGlowCard from '../components/ui/HoverGlowCard';
import StatusBadge from '../components/ui/StatusBadge';

const JobDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { jobs, ships, components, users, updateJob, removeJob } = useData();
  const { currentUser } = useAuth();
  const [job, setJob] = useState(null);
  const [history, setHistory] = useState([]);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    const foundJob = jobs.find(j => j.id === id);
    if (foundJob) {
      setJob(foundJob);
      
      // Simulated history data
      setHistory([
        {
          id: 1,
          action: 'Created',
          user: 'admin@entnt.in',
          timestamp: new Date(Date.now() - 86400000).toISOString(),
          changes: {}
        },
        {
          id: 2,
          action: 'Status Updated',
          user: 'engineer@entnt.in',
          timestamp: new Date(Date.now() - 43200000).toISOString(),
          changes: { status: 'In Progress' }
        }
      ]);
    } else {
      navigate('/jobs');
    }
  }, [id, jobs, navigate]);

  const handleStatusChange = async (newStatus) => {
    if (!job) return;
    
    setUpdatingStatus(true);
    try {
      await updateJob({ ...job, status: newStatus });
      setJob({ ...job, status: newStatus });
    } catch (error) {
      console.error("Failed to update job status:", error);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      removeJob(id);
      navigate('/jobs');
    }
  };

  if (!job) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const getShipName = (shipId) => {
    const ship = ships.find(s => s.id === shipId);
    return ship ? ship.name : 'N/A';
  };

  const getComponentName = (componentId) => {
    const component = components.find(c => c.id === componentId);
    return component ? component.name : 'N/A';
  };

  const getEngineerName = (engineerId) => {
    const engineer = users.find(u => u.id === engineerId);
    return engineer ? engineer.email : 'N/A';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <button
          onClick={() => navigate('/jobs')}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <FaArrowLeft className="mr-2" />
          Back to Jobs
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{job.type}</h1>
          <div className="flex items-center mt-2">
            <StatusBadge 
              status={job.status} 
              jobId={job.id} 
              onStatusChange={handleStatusChange}
              isUpdating={updatingStatus}
            />
            <span className="ml-4 text-gray-600">
              <FaCalendarAlt className="inline mr-1 text-gray-400" />
              {new Date(job.scheduledDate).toLocaleDateString()}
            </span>
          </div>
        </div>
        
        <div className="mt-4 md:mt-0 flex space-x-2">
          <button
            onClick={() => navigate(`/jobs/edit/${job.id}`)}
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition"
          >
            <FaEdit className="mr-2" />
            Edit Job
          </button>
          {currentUser?.role === 'Admin' && (
            <button
              onClick={handleDelete}
              className="flex items-center bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition"
            >
              <FaTrash className="mr-2" />
              Delete Job
            </button>
          )}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <HoverGlowCard>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Job Details</h2>
              
              {job.description && (
                <div className="mb-6">
                  <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-gray-500 text-sm mb-1 flex items-center">
                    <FaShip className="mr-2 text-blue-500" />
                    Ship
                  </h3>
                  <p className="text-gray-800">{getShipName(job.shipId)}</p>
                </div>
                
                <div>
                  <h3 className="text-gray-500 text-sm mb-1 flex items-center">
                    <FaWrench className="mr-2 text-blue-500" />
                    Component
                  </h3>
                  <p className="text-gray-800">{getComponentName(job.componentId)}</p>
                </div>
                
                <div>
                  <h3 className="text-gray-500 text-sm mb-1 flex items-center">
                    <FaUser className="mr-2 text-blue-500" />
                    Assigned Engineer
                  </h3>
                  <p className="text-gray-800">{getEngineerName(job.assignedEngineerId)}</p>
                </div>
                
                <div>
                  <h3 className="text-gray-500 text-sm mb-1">Priority</h3>
                  <p className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                    job.priority === 'High' ? 'bg-red-100 text-red-800' :
                    job.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {job.priority}
                  </p>
                </div>
              </div>
            </div>
          </HoverGlowCard>
        </div>
        
        <div>
          <HoverGlowCard>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <FaHistory className="text-blue-500 mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">Job History</h2>
              </div>
              
              <div className="space-y-4">
                {history.map(record => (
                  <div key={record.id} className="border-l-2 border-blue-300 pl-4 py-1">
                    <p className="text-gray-800 font-medium">{record.action}</p>
                    <p className="text-gray-500 text-sm">{new Date(record.timestamp).toLocaleString()}</p>
                    <p className="text-gray-500 text-sm">By: {record.user}</p>
                    
                    {Object.keys(record.changes).length > 0 && (
                      <div className="mt-2 text-sm">
                        {Object.entries(record.changes).map(([key, value]) => (
                          <p key={key} className="text-gray-600">
                            <span className="font-medium">{key}:</span> {value}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </HoverGlowCard>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;