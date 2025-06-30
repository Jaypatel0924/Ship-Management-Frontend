import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import AnimatedCard from '../components/ui/AnimatedCard';
import HoverGlowCard from '../components/ui/HoverGlowCard';

const ShipsPage = () => {
  const { ships, removeShip } = useData();
  const { currentUser } = useAuth();
  const [filteredShips, setFilteredShips] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setFilteredShips(ships);
  }, [ships]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (term === '') {
      setFilteredShips(ships);
    } else {
      const filtered = ships.filter(ship => 
        ship.name.toLowerCase().includes(term) || 
        ship.imo.toLowerCase().includes(term) ||
        ship.flag.toLowerCase().includes(term) ||
        ship.status.toLowerCase().includes(term)
      );
      setFilteredShips(filtered);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this ship?')) {
      removeShip(id);
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
          <h1 className="text-3xl font-bold text-gray-800">Ships Management</h1>
          <p className="text-gray-600">Manage your fleet of ships</p>
        </div>
        
        {currentUser?.role === 'Admin' && (
          <Link 
            to="/ships/new"
            className="mt-4 md:mt-0 flex items-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition"
          >
            <FaPlus className="mr-2" />
            Add New Ship
          </Link>
        )}
      </motion.div>

      <HoverGlowCard>
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search ships..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IMO Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Flag</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredShips.map((ship) => (
                <tr key={ship.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link to={`/ships/${ship.id}`} className="text-blue-600 hover:underline">
                      {ship.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ship.imo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ship.flag}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      ship.status === 'Active' ? 'bg-green-100 text-green-800' :
                      ship.status === 'Under Maintenance' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {ship.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <Link 
                        to={`/ships/edit/${ship.id}`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <FaEdit />
                      </Link>
                      {currentUser?.role === 'Admin' && (
                        <button
                          onClick={() => handleDelete(ship.id)}
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
      </HoverGlowCard>
    </div>
  );
};

export default ShipsPage;