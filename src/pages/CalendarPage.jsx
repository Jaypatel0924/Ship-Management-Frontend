import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useData } from '../contexts/DataContext';
import { motion } from 'framer-motion';
import HoverGlowCard from '../components/ui/HoverGlowCard';
import DayEvents from '../components/calendar/DayEvents';
import { FaCalendarAlt } from 'react-icons/fa';

const CalendarPage = () => {
  const { jobs } = useData();
  const [date, setDate] = useState(new Date());
  const [selectedDateEvents, setSelectedDateEvents] = useState([]);
  const [view, setView] = useState('month');

  const handleDateChange = (newDate) => {
    setDate(newDate);
    const formattedDate = newDate.toISOString().split('T')[0];
    const events = jobs.filter(job => job.scheduledDate === formattedDate);
    setSelectedDateEvents(events);
  };

  const handleViewChange = (newView) => {
    setView(newView);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Maintenance Calendar</h1>
          <p className="text-gray-600">View scheduled maintenance jobs</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => handleViewChange('month')}
            className={`px-3 py-1 rounded-lg ${
              view === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => handleViewChange('week')}
            className={`px-3 py-1 rounded-lg ${
              view === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Weekly
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <HoverGlowCard>
            <Calendar
              onChange={handleDateChange}
              value={date}
              view={view}
              onViewChange={handleViewChange}
              className="bg-white rounded-lg shadow-md p-4 border border-gray-200"
            />
          </HoverGlowCard>
        </div>
        <div>
          <HoverGlowCard>
            <div className="p-4">
              <div className="flex items-center mb-4">
                <FaCalendarAlt className="text-blue-500 mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Jobs on {date.toLocaleDateString()}
                </h2>
              </div>
              {selectedDateEvents.length === 0 ? (
                <p className="text-gray-500">No jobs scheduled for this day.</p>
              ) : (
                <DayEvents events={selectedDateEvents} />
              )}
            </div>
          </HoverGlowCard>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;