

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { FaPlus, FaSearch, FaFilter, FaCalendarAlt, FaEdit, FaSync } from 'react-icons/fa';
import HoverGlowCard from '../components/ui/HoverGlowCard';
import AnimatedCard from '../components/ui/AnimatedCard';

const JobsPage = () => {
  const { jobs, updateJob, ships, components } = useData();
  const { currentUser } = useAuth();
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    ship: '',
    status: '',
    priority: '',
  });
  const [updatingStatus, setUpdatingStatus] = useState({});

  useEffect(() => {
    setFilteredJobs(jobs);
  }, [jobs]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    applyFilters(term, filters);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    applyFilters(searchTerm, { ...filters, [name]: value });
  };

  const applyFilters = (term, filterSettings) => {
    let result = jobs;

    // Apply search term
    if (term) {
      result = result.filter(job => 
        job.type.toLowerCase().includes(term) || 
        job.priority.toLowerCase().includes(term) ||
        job.status.toLowerCase().includes(term)
      );
    }

    // Apply ship filter
    if (filterSettings.ship) {
      result = result.filter(job => job.shipId === filterSettings.ship);
    }

    // Apply status filter
    if (filterSettings.status) {
      result = result.filter(job => job.status === filterSettings.status);
    }

    // Apply priority filter
    if (filterSettings.priority) {
      result = result.filter(job => job.priority === filterSettings.priority);
    }

    setFilteredJobs(result);
  };

  const clearFilters = () => {
    setFilters({ ship: '', status: '', priority: '' });
    setSearchTerm('');
    setFilteredJobs(jobs);
  };

  const getComponentName = (componentId) => {
    const component = components.find(c => c.id === componentId);
    return component ? component.name : 'N/A';
  };

  const getShipName = (shipId) => {
    const ship = ships.find(s => s.id === shipId);
    return ship ? ship.name : 'N/A';
  };

  const handleStatusChange = async (jobId, newStatus) => {
    setUpdatingStatus(prev => ({ ...prev, [jobId]: true }));
    
    try {
      const job = jobs.find(j => j.id === jobId);
      if (job) {
        await updateJob({ ...job, status: newStatus });
      }
    } catch (error) {
      console.error("Failed to update job status:", error);
    } finally {
      setUpdatingStatus(prev => ({ ...prev, [jobId]: false }));
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Maintenance Jobs</h1>
          <p className="text-gray-600">Manage maintenance jobs for ship components</p>
        </div>
        
        <Link 
          to="/jobs/new"
          className="mt-4 md:mt-0 flex items-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition"
        >
          <FaPlus className="mr-2" />
          Create Job
        </Link>
      </motion.div>

      <HoverGlowCard>
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-gray-700 mb-2">Ship</label>
            <select
              name="ship"
              value={filters.ship}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Ships</option>
              {ships.map(ship => (
                <option key={ship.id} value={ship.id}>{ship.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Status</label>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Priority</label>
            <select
              name="priority"
              value={filters.priority}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
        <div className="mb-6">
          <button
            onClick={clearFilters}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <FaFilter className="mr-1" />
            Clear Filters
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ship</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Component</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scheduled Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredJobs.map(job => (
                <tr key={job.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {job.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {getShipName(job.shipId)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {getComponentName(job.componentId)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      job.priority === 'High' ? 'bg-red-100 text-red-800' :
                      job.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {job.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="relative">
                      {updatingStatus[job.id] ? (
                        <FaSync className="animate-spin text-blue-500" />
                      ) : (
                        <select
                          value={job.status}
                          onChange={(e) => handleStatusChange(job.id, e.target.value)}
                          className={`px-2 py-1 rounded-full text-xs font-semibold focus:outline-none focus:ring ${
                            job.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            job.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                            job.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                            'bg-blue-100 text-blue-800'
                          }`}
                          disabled={currentUser.role === 'Inspector' && job.status === 'Completed'}
                        >
                          <option value="Open">Open</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-1 text-gray-400" />
                      {new Date(job.scheduledDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <Link 
                        to={`/jobs/edit/${job.id}`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <FaEdit />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </HoverGlowCard>
    </div>
  );
};

export default JobsPage;