import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const MaintenanceChart = ({ jobs }) => {
  // Generate data for the last 12 months
  const months = [];
  const now = new Date();
  for (let i = 11; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push(date.toLocaleString('default', { month: 'short' }));
  }

  // Count jobs by month
  const jobCounts = new Array(12).fill(0);
  const completedCounts = new Array(12).fill(0);
  
  jobs.forEach(job => {
    const jobDate = new Date(job.scheduledDate);
    const monthDiff = (now.getFullYear() - jobDate.getFullYear()) * 12 + now.getMonth() - jobDate.getMonth();
    
    if (monthDiff >= 0 && monthDiff < 12) {
      jobCounts[11 - monthDiff]++;
      if (job.status === 'Completed') {
        completedCounts[11 - monthDiff]++;
      }
    }
  });

  const data = {
    labels: months,
    datasets: [
      {
        label: 'Scheduled Jobs',
        data: jobCounts,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        tension: 0.3,
        fill: true
      },
      {
        label: 'Completed Jobs',
        data: completedCounts,
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderWidth: 2,
        tension: 0.3,
        fill: true
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    },
    animation: {
      duration: 2000,
      easing: 'easeOutQuart'
    }
  };

  return (
    <div className="h-full">
      <Line data={data} options={options} />
    </div>
  );
};

export default MaintenanceChart;