


import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import { motion } from 'framer-motion';
import HoverGlowCard from '../ui/HoverGlowCard';
import { FaArrowLeft, FaSave, FaTimes } from 'react-icons/fa';

const JobForm = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { jobs, addJob, updateJob, components, ships, users } = useData();
  const { currentUser } = useAuth();
  const { showNotification } = useNotification();
  const [formData, setFormData] = useState({
    type: '',
    priority: 'Medium',
    status: 'Open',
    componentId: '',
    shipId: location.state?.shipId || '',
    assignedEngineerId: currentUser?.role === 'Engineer' ? currentUser.id : '',
    scheduledDate: new Date().toISOString().split('T')[0],
    description: '',
  });
  const [isEdit, setIsEdit] = useState(false);
  const [shipComponents, setShipComponents] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      const jobToEdit = jobs.find(job => job.id === id);
      if (jobToEdit) {
        setFormData(jobToEdit);
        setIsEdit(true);
        // Load components for the ship
        const comps = components.filter(c => c.shipId === jobToEdit.shipId);
        setShipComponents(comps);
      }
    } else if (formData.shipId) {
      // Load components when ship is selected
      const comps = components.filter(c => c.shipId === formData.shipId);
      setShipComponents(comps);
    }
  }, [id, jobs, components, formData.shipId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // When ship changes, update available components
    if (name === 'shipId') {
      const comps = components.filter(c => c.shipId === value);
      setShipComponents(comps);
      // Reset component selection
      setFormData(prev => ({ ...prev, componentId: '' }));
    }
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.type.trim()) newErrors.type = 'Job type is required';
    if (!formData.shipId) newErrors.shipId = 'Ship is required';
    if (!formData.componentId) newErrors.componentId = 'Component is required';
    if (!formData.assignedEngineerId) newErrors.assignedEngineerId = 'Engineer is required';
    if (!formData.scheduledDate) newErrors.scheduledDate = 'Date is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showNotification('Please fill all required fields', 'error');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      if (isEdit) {
        await updateJob(formData);
        showNotification('Job updated successfully!', 'success');
      } else {
        await addJob(formData);
        showNotification('Job created successfully!', 'success');
      }
      navigate('/jobs');
    } catch (error) {
      console.error("Error saving job:", error);
      showNotification('Failed to save job. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <button
          onClick={() => navigate('/jobs')}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          <FaArrowLeft className="mr-2" />
          Back to Jobs
        </button>
        
        <h1 className="text-3xl font-bold text-gray-800">
          {isEdit ? 'Edit Maintenance Job' : 'Create New Maintenance Job'}
        </h1>
      </motion.div>

      <HoverGlowCard>
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">Job Type *</label>
              <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${
                  errors.type ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                placeholder="Inspection, Repair, Maintenance..."
              />
              {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Priority *</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                required
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">Status *</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                required
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Scheduled Date *</label>
              <input
                type="date"
                name="scheduledDate"
                value={formData.scheduledDate}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${
                  errors.scheduledDate ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                required
              />
              {errors.scheduledDate && <p className="text-red-500 text-sm mt-1">{errors.scheduledDate}</p>}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">Ship *</label>
              <select
                name="shipId"
                value={formData.shipId}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${
                  errors.shipId ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                required
              >
                <option value="">Select Ship</option>
                {ships.map(ship => (
                  <option key={ship.id} value={ship.id}>
                    {ship.name} ({ship.imo})
                  </option>
                ))}
              </select>
              {errors.shipId && <p className="text-red-500 text-sm mt-1">{errors.shipId}</p>}
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Component *</label>
              <select
                name="componentId"
                value={formData.componentId}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${
                  errors.componentId ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                required
                disabled={!formData.shipId}
              >
                <option value="">Select Component</option>
                {shipComponents.map(comp => (
                  <option key={comp.id} value={comp.id}>
                    {comp.name} ({comp.serialNumber})
                  </option>
                ))}
              </select>
              {errors.componentId && <p className="text-red-500 text-sm mt-1">{errors.componentId}</p>}
            </div>
          </div>
          

          <div>
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Describe the job requirements, issues found, or maintenance procedures..."
            ></textarea>
          </div>
          
          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition flex-1 disabled:opacity-75"
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin mr-2">&#9696;</span>
                  {isEdit ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                <>
                  <FaSave className="mr-2" />
                  {isEdit ? 'Update Job' : 'Create Job'}
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate('/jobs')}
              className="flex items-center justify-center bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition flex-1"
            >
              <FaTimes className="mr-2" />
              Cancel
            </button>
          </div>
        </form>
      </HoverGlowCard>
    </div>
  );
};

export default JobForm;

