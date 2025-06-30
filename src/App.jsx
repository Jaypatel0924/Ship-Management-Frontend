

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { NotificationProvider } from './contexts/NotificationContext';
import ProtectedRoute from './components/layout/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ShipsPage from './pages/ShipsPage';
import ShipDetailPage from './pages/ShipDetailPage';
import JobsPage from './pages/JobsPage';
import CalendarPage from './pages/CalendarPage';
import NotificationPage from './pages/NotificationPage';
import ShipForm from './components/ships/ShipForm';
import ComponentForm from './components/components/ComponentForm';
import JobForm from './components/jobs/JobForm';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import WaveBackground from './components/ui/WaveBackground';
import JobDetailPage from './pages/JobDetailPage';
import { initializeData } from './utils/localStorageUtils';

function App() {

  useEffect(() => {
    initializeData();
  },[])
  return (
    <Router>
      <AuthProvider>
        <DataProvider>
          <NotificationProvider>
            <div className="flex flex-col min-h-screen">
              <WaveBackground />
              <Navbar />
              <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 p-4 md:p-8 z-10">
                  <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route element={<ProtectedRoute />}>
                      <Route path="/" element={<DashboardPage />} />
                      <Route path="/ships" element={<ShipsPage />} />
                      <Route path="/ships/new" element={<ShipForm />} />
                      <Route path="/ships/edit/:id" element={<ShipForm />} />
                      <Route path="/ships/:id" element={<ShipDetailPage />} />
                      <Route path="/ships/:id/components/new" element={<ComponentForm />} />
                      <Route path="/components/edit/:id" element={<ComponentForm />} />
                      <Route path="/jobs" element={<JobsPage />} />
                      <Route path="/jobs/new" element={<JobForm />} />
                      <Route path="/jobs/edit/:id" element={<JobForm />} />
                      <Route path="/calendar" element={<CalendarPage />} />
                      <Route path="/notifications" element={<NotificationPage />} />
                      <Route path="/jobs/:id" element={<JobDetailPage/>} />
                    </Route>
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </main>
              </div>
            </div>
          </NotificationProvider>
        </DataProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;