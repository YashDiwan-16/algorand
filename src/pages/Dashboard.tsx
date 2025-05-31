import React from 'react';
import { motion } from 'framer-motion';
import {
  ChartBarIcon,
  DocumentCheckIcon,
  ClockIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

interface Stat {
  title: string;
  value: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
}

interface Activity {
  id: number;
  type: string;
  description: string;
  timestamp: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const Dashboard: React.FC = () => {
  const stats: Stat[] = [
    {
      title: 'Active Consents',
      value: '12',
      icon: DocumentCheckIcon,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Pending Requests',
      value: '3',
      icon: ClockIcon,
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      title: 'Total Recipients',
      value: '8',
      icon: UserGroupIcon,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Security Score',
      value: '98%',
      icon: ShieldCheckIcon,
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const recentActivity: Activity[] = [
    {
      id: 1,
      type: 'Consent Given',
      description: 'Approved medical records access for Hospital A',
      timestamp: '2 hours ago',
      icon: ArrowPathIcon
    },
    {
      id: 2,
      type: 'Consent Requested',
      description: 'New request for financial data from Bank B',
      timestamp: '5 hours ago',
      icon: DocumentCheckIcon
    },
    {
      id: 3,
      type: 'Consent Expired',
      description: 'Research data access expired for University C',
      timestamp: '1 day ago',
      icon: ClockIcon
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
            Dashboard
          </h1>
          <p className="text-xl text-gray-400">
            Monitor your consent management activities
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{stat.title}</p>
                  <p className="text-2xl font-semibold text-white mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50"
          >
            <h2 className="text-xl font-semibold text-white mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="flex items-start space-x-4 p-4 bg-gray-700/30 rounded-lg"
                >
                  <div className="p-2 bg-gray-600/50 rounded-lg">
                    <activity.icon className="h-5 w-5 text-gray-300" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">{activity.type}</p>
                    <p className="text-gray-400 text-sm">{activity.description}</p>
                    <p className="text-gray-500 text-xs mt-1">{activity.timestamp}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50"
          >
            <h2 className="text-xl font-semibold text-white mb-6">Consent Analytics</h2>
            <div className="h-64 flex items-center justify-center">
              <ChartBarIcon className="h-32 w-32 text-gray-600" />
              {/* Add your chart component here */}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 