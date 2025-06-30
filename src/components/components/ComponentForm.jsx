import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { motion } from 'framer-motion';
import HoverGlowCard from '../ui/HoverGlowCard';

const ComponentForm = () => {
  const { shipId, id } = useParams();
  const navigate = useNavigate();
  const { components, addComponent, updateComponent, ships } = useData();
  const [formData, setFormData] = useState({
    name: '',
    serialNumber: '',
    installDate: '',
    lastMaintenanceDate: '',
    shipId: shipId || '',
  });
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (id) {
      const componentToEdit = components.find(comp => comp.id === id);
      if (componentToEdit) {
        setFormData(componentToEdit);
        setIsEdit(true);
      }
    } else if (shipId) {
      setFormData(prev => ({ ...prev, shipId }));
    }
  }, [id, shipId, components]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      updateComponent(formData);
    } else {
      addComponent(formData);
    }
    navigate(`shipId ? /ships/${shipId} : '/ships'`);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold text-gray-800">
          {isEdit ? 'Edit Component' : 'Add New Component'}
        </h1>
      </motion.div>

      <HoverGlowCard>
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          {!shipId && (
            <div>
              <label className="block text-gray-700 mb-2">Ship</label>
              <select
                name="shipId"
                value={formData.shipId}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                required
              >
                <option value="">Select Ship</option>
                {ships.map(ship => (
                  <option key={ship.id} value={ship.id}>
                    {ship.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div>
            <label className="block text-gray-700 mb-2">Component Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Serial Number</label>
            <input
              type="text"
              name="serialNumber"
              value={formData.serialNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Installation Date</label>
            <input
              type="date"
              name="installDate"
              value={formData.installDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Last Maintenance Date</label>
            <input
              type="date"
              name="lastMaintenanceDate"
              value={formData.lastMaintenanceDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
            />
          </div>
          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition flex-1"
            >
              {isEdit ? 'Update Component' : 'Add Component'}
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition flex-1"
            >
              Cancel
            </button>
          </div>
        </form>
      </HoverGlowCard>
    </div>
  );
};

export default ComponentForm;