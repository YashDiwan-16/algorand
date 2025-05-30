import React from 'react';
import { motion } from 'framer-motion';
import { DocumentCheckIcon, ClockIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const GiveConsent = () => {
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
            Give Consent
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Review and manage incoming consent requests
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {[1, 2, 3].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + item * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-500/10 p-3 rounded-lg">
                      <DocumentCheckIcon className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">Health Records Access</h3>
                      <p className="text-gray-400 mt-1">Requested by: Medical Center XYZ</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center text-gray-400">
                          <ClockIcon className="h-4 w-4 mr-1" />
                          <span className="text-sm">3 days remaining</span>
                        </div>
                        <div className="flex items-center text-gray-400">
                          <ShieldCheckIcon className="h-4 w-4 mr-1" />
                          <span className="text-sm">Secure Access</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300"
                    >
                      Approve
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-2 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-all duration-300"
                    >
                      Reject
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-xl font-semibold text-white mb-4">Consent Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Pending Requests</span>
                  <span className="text-white font-semibold">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Approved</span>
                  <span className="text-green-400 font-semibold">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Rejected</span>
                  <span className="text-red-400 font-semibold">5</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-4 py-2 bg-blue-500/10 text-blue-400 rounded-lg font-semibold hover:bg-blue-500/20 transition-all duration-300"
                >
                  View All Requests
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-4 py-2 bg-purple-500/10 text-purple-400 rounded-lg font-semibold hover:bg-purple-500/20 transition-all duration-300"
                >
                  Manage Permissions
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-4 py-2 bg-green-500/10 text-green-400 rounded-lg font-semibold hover:bg-green-500/20 transition-all duration-300"
                >
                  Export History
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default GiveConsent; 