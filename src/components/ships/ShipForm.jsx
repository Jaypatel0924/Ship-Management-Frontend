import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { motion } from 'framer-motion';
import HoverGlowCard from '../ui/HoverGlowCard';

const ShipForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { ships, addShip, updateShip } = useData();
  const [formData, setFormData] = useState({
    name: '',
    imo: '',
    flag: '',
    status: 'Active',
  });
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (id) {
      const shipToEdit = ships.find(ship => ship.id === id);
      if (shipToEdit) {
        setFormData(shipToEdit);
        setIsEdit(true);
      }
    }
  }, [id, ships]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      updateShip(formData);
    } else {
      addShip(formData);
    }
    navigate('/ships');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold text-gray-800">
          {isEdit ? 'Edit Ship' : 'Add New Ship'}
        </h1>
      </motion.div>

      <HoverGlowCard>
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          <div>
            <label className="block text-gray-700 mb-2">Ship Name</label>
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
            <label className="block text-gray-700 mb-2">IMO Number</label>
            <input
              type="text"
              name="imo"
              value={formData.imo}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Flag</label>
            <input
              type="text"
              name="flag"
              value={formData.flag}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            >
              <option value="Active">Active</option>
              <option value="Under Maintenance">Under Maintenance</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition flex-1"
            >
              {isEdit ? 'Update Ship' : 'Add Ship'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/ships')}
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

export default ShipForm;