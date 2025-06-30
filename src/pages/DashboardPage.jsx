import React, { useEffect } from 'react';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import KpiCard from '../components/dashboard/KPICard';
import MaintenanceChart from '../components/dashboard/MaintenanceChart';
// import StatusPieChart from '../components/dashboard/StatusPieChart';
import { motion } from 'framer-motion';
import HoverGlowCard from '../components/ui/HoverGlowCard';
import { FaShip, FaWrench, FaTools, FaCheckCircle } from 'react-icons/fa';

const DashboardPage = () => {
    const { ships, components, jobs, loading } = useData();
    const { currentUser } = useAuth();

    // Calculate KPIs
    const totalShips = ships.length;
    const overdueComponents = components.filter(comp => {
        const lastMaintenance = new Date(comp.lastMaintenanceDate);
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        return lastMaintenance < sixMonthsAgo;
    }).length;

    const jobsInProgress = jobs.filter(job => job.status === 'In Progress').length;
    const completedJobs = jobs.filter(job => job.status === 'Completed').length;

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-between items-center"
            >
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
                    <p className="text-gray-600">Welcome back, {currentUser?.role}</p>
                </div>
            </motion.div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KpiCard
                    title="Total Ships"
                    value={totalShips}
                    icon={<FaShip className="text-blue-500 text-xl" />}
                    change={2.5}
                />
                <KpiCard
                    title="Overdue Components"
                    value={overdueComponents}
                    icon={<FaWrench className="text-yellow-500 text-xl" />}
                    change={-1.2}
                />
                <KpiCard
                    title="Jobs in Progress"
                    value={jobsInProgress}
                    icon={<FaTools className="text-orange-500 text-xl" />}
                    change={5.7}
                />
                <KpiCard
                    title="Completed Jobs"
                    value={completedJobs}
                    icon={<FaCheckCircle className="text-green-500 text-xl" />}
                    change={3.8}
                />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <HoverGlowCard>
                    <div className="h-96">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Maintenance Overview</h2>
                        <MaintenanceChart jobs={jobs} />
                    </div>
                </HoverGlowCard>

                <HoverGlowCard>
                    <div className="h-96">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Job Status Distribution</h2>
                        {/* <StatusPieChart jobs={jobs} /> */}
                    </div>
                </HoverGlowCard>
            </div>

            {/* Recent Activity */}
            <HoverGlowCard>
                <div>
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Maintenance Activities</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ship</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Component</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {jobs.slice(0, 5).map(job => (
                                    <tr key={job.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{job.type}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {ships.find(s => s.id === job.shipId)?.name || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {components.find(c => c.id === job.componentId)?.name || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${job.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                                    job.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-blue-100 text-blue-800'
                                                }`}>
                                                {job.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(job.scheduledDate).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </HoverGlowCard>
        </div>
    );
};

export default DashboardPage;