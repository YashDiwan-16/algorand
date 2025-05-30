import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardDocumentListIcon, UserGroupIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

const RequestConsent = () => {
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
            Request Consent
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Create and manage consent requests for data sharing
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50"
          >
            <h2 className="text-2xl font-semibold text-white mb-6">New Consent Request</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-2">Data Type</label>
                <select className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500">
                  <option>Personal Information</option>
                  <option>Health Records</option>
                  <option>Financial Data</option>
                  <option>Location Data</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Duration</label>
                <select className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500">
                  <option>1 Month</option>
                  <option>3 Months</option>
                  <option>6 Months</option>
                  <option>1 Year</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Purpose</label>
                <textarea
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                  rows="4"
                  placeholder="Describe the purpose of data access..."
                ></textarea>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg px-6 py-3 font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
              >
                Create Request
              </motion.button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50">
              <h3 className="text-xl font-semibold text-white mb-4">Recent Requests</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="bg-gray-700/30 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <DocumentTextIcon className="h-6 w-6 text-blue-400" />
                        <div>
                          <p className="text-white font-medium">Health Records Access</p>
                          <p className="text-gray-400 text-sm">Requested 2 days ago</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                        Pending
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50">
              <h3 className="text-xl font-semibold text-white mb-4">Statistics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-700/30 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <UserGroupIcon className="h-6 w-6 text-green-400" />
                    <div>
                      <p className="text-gray-400 text-sm">Total Requests</p>
                      <p className="text-white font-medium text-xl">24</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-700/30 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <ClipboardDocumentListIcon className="h-6 w-6 text-purple-400" />
                    <div>
                      <p className="text-gray-400 text-sm">Active Requests</p>
                      <p className="text-white font-medium text-xl">8</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RequestConsent; 