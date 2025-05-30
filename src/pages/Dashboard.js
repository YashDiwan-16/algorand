import React from 'react';
import { motion } from 'framer-motion';
import {
  ChartBarIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-6">
            Consent Dashboard
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Monitor and manage all consent activities
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            {
              title: 'Total Requests',
              value: '156',
              icon: DocumentTextIcon,
              color: 'blue',
              change: '+12%',
            },
            {
              title: 'Active Users',
              value: '2,845',
              icon: UserGroupIcon,
              color: 'green',
              change: '+8%',
            },
            {
              title: 'Approval Rate',
              value: '92%',
              icon: ShieldCheckIcon,
              color: 'purple',
              change: '+5%',
            },
            {
              title: 'Avg. Response Time',
              value: '2.4h',
              icon: ClockIcon,
              color: 'yellow',
              change: '-15%',
            },
          ].map((stat, index) => (
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
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                </div>
                <div className={`bg-${stat.color}-500/10 p-3 rounded-lg`}>
                  <stat.icon className={`h-6 w-6 text-${stat.color}-400`} />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <ArrowTrendingUpIcon className={`h-4 w-4 ${
                  stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                }`} />
                <span className={`text-sm ml-1 ${
                  stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                }`}>
                  {stat.change}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50"
          >
            <h3 className="text-xl font-semibold text-white mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex items-center space-x-4">
                  <div className="bg-blue-500/10 p-2 rounded-lg">
                    <DocumentTextIcon className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white">New consent request from Medical Center</p>
                    <p className="text-gray-400 text-sm">2 hours ago</p>
                  </div>
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                    Pending
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50"
          >
            <h3 className="text-xl font-semibold text-white mb-6">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-4 bg-blue-500/10 rounded-xl hover:bg-blue-500/20 transition-all duration-300"
              >
                <DocumentTextIcon className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                <span className="text-blue-400 text-sm font-medium">New Request</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-4 bg-purple-500/10 rounded-xl hover:bg-purple-500/20 transition-all duration-300"
              >
                <ChartBarIcon className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                <span className="text-purple-400 text-sm font-medium">View Reports</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-4 bg-green-500/10 rounded-xl hover:bg-green-500/20 transition-all duration-300"
              >
                <UserGroupIcon className="h-6 w-6 text-green-400 mx-auto mb-2" />
                <span className="text-green-400 text-sm font-medium">Manage Users</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-4 bg-yellow-500/10 rounded-xl hover:bg-yellow-500/20 transition-all duration-300"
              >
                <ShieldCheckIcon className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
                <span className="text-yellow-400 text-sm font-medium">Security</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 