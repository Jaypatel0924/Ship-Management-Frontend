import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaEdit, FaTrash, FaPlus, FaWrench, FaCalendarAlt } from 'react-icons/fa';
import AnimatedCard from '../components/ui/AnimatedCard';
import HoverGlowCard from '../components/ui/HoverGlowCard';

const ShipDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { ships, components, jobs, removeShip } = useData();
  const { currentUser } = useAuth();
  const [ship, setShip] = useState(null);
  const [shipComponents, setShipComponents] = useState([]);
  const [shipJobs, setShipJobs] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const foundShip = ships.find(s => s.id === id);
    if (foundShip) {
      setShip(foundShip);
      
      // Filter components for this ship
      const comps = components.filter(c => c.shipId === id);
      setShipComponents(comps);
      
      // Filter jobs for this ship
      const shipJobs = jobs.filter(j => j.shipId === id);
      setShipJobs(shipJobs);
    } else {
      navigate('/ships');
    }
  }, [id, ships, components, jobs, navigate]);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this ship?')) {
      removeShip(id);
      navigate('/ships');
    }
  };

  if (!ship) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Link to="/ships" className="flex items-center text-blue-600 hover:text-blue-800">
          <FaArrowLeft className="mr-2" />
          Back to Ships
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{ship.name}</h1>
          <p className="text-gray-600">IMO: {ship.imo} | Flag: {ship.flag}</p>
        </div>
        
        <div className="mt-4 md:mt-0 flex space-x-2">
          {currentUser?.role === 'Admin' && (
            <>
              <Link 
                to={`/ships/edit/${ship.id}`}
                className="flex items-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition"
              >
                <FaEdit className="mr-2" />
                Edit Ship
              </Link>
              <button
                onClick={handleDelete}
                className="flex items-center bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition"
              >
                <FaTrash className="mr-2" />
                Delete Ship
              </button>
            </>
          )}
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'overview'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('components')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'components'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Components ({shipComponents.length})
          </button>
          <button
            onClick={() => setActiveTab('jobs')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'jobs'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Maintenance Jobs ({shipJobs.length})
          </button>
        </nav>
      </div>

      {/* Tab content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnimatedCard>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">General Information</h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-500 text-sm">IMO Number</p>
                <p className="text-gray-800">{ship.imo}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Flag</p>
                <p className="text-gray-800">{ship.flag}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Status</p>
                <p className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                  ship.status === 'Active' ? 'bg-green-100 text-green-800' :
                  ship.status === 'Under Maintenance' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {ship.status}
                </p>
              </div>
            </div>
          </AnimatedCard>

          <AnimatedCard>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Statistics</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <p className="text-3xl font-bold text-blue-600">{shipComponents.length}</p>
                <p className="text-gray-600">Components</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <p className="text-3xl font-bold text-green-600">{shipJobs.filter(j => j.status === 'Completed').length}</p>
                <p className="text-gray-600">Completed Jobs</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg text-center">
                <p className="text-3xl font-bold text-yellow-600">{shipJobs.filter(j => j.status === 'In Progress').length}</p>
                <p className="text-gray-600">Jobs in Progress</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg text-center">
                <p className="text-3xl font-bold text-red-600">{shipComponents.filter(c => {
                  const lastMaintenance = new Date(c.lastMaintenanceDate);
                  const sixMonthsAgo = new Date();
                  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
                  return lastMaintenance < sixMonthsAgo;
                }).length}</p>
                <p className="text-gray-600">Overdue Components</p>
              </div>
            </div>
          </AnimatedCard>
        </div>
      )}

      {activeTab === 'components' && (
        <HoverGlowCard>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Components</h2>
            {currentUser?.role === 'Admin' && (
              <Link 
                to={`/ships/${ship.id}/components/new`}
                className="flex items-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition"
              >
                <FaPlus className="mr-2" />
                Add Component
              </Link>
            )}
          </div>

          {shipComponents.length === 0 ? (
            <div className="text-center py-12">
              <FaWrench className="mx-auto text-4xl text-gray-400 mb-4" />
              <p className="text-gray-500">No components found for this ship</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Serial Number</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Installation Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Maintenance</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {shipComponents.map(component => (
                    <tr key={component.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {component.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {component.serialNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(component.installDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(component.lastMaintenanceDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          <Link 
                            to={`/components/edit/${component.id}`}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <FaEdit />
                          </Link>
                          {currentUser?.role === 'Admin' && (
                            <button
                              // onClick={() => handleDeleteComponent(component.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <FaTrash />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </HoverGlowCard>
      )}

      {activeTab === 'jobs' && (
        <HoverGlowCard>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Maintenance Jobs</h2>
            <Link 
              to={`/jobs/new?shipId=${ship.id}`}
              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition"
            >
              <FaPlus className="mr-2" />
              Create Job
            </Link>
          </div>

          {shipJobs.length === 0 ? (
            <div className="text-center py-12">
              <FaCalendarAlt className="mx-auto text-4xl text-gray-400 mb-4" />
              <p className="text-gray-500">No maintenance jobs scheduled for this ship</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Component</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scheduled Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {shipJobs.map(job => (
                    <tr key={job.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {job.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {components.find(c => c.id === job.componentId)?.name || 'N/A'}
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
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          job.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          job.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {job.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(job.scheduledDate).toLocaleDateString()}
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
          )}
        </HoverGlowCard>
      )}
    </div>
  );
};

export default ShipDetailPage;