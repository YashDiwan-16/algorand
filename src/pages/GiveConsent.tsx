import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon, XCircleIcon, ClockIcon } from '@heroicons/react/24/outline';

interface ConsentRequest {
  id: number;
  title: string;
  requester: string;
  dataType: string;
  duration: string;
  description: string;
}

const GiveConsent: React.FC = () => {
  const [pendingRequests, setPendingRequests] = useState<ConsentRequest[]>([
    {
      id: 1,
      title: 'Medical Records Access',
      requester: '0x1234...5678',
      dataType: 'Health Data',
      duration: '30 days',
      description: 'Requesting access to medical history for treatment purposes'
    },
    {
      id: 2,
      title: 'Financial Information',
      requester: '0x8765...4321',
      dataType: 'Financial Data',
      duration: '1 year',
      description: 'Requesting financial information for loan processing'
    }
  ]);

  const handleConsent = (id: number, approved: boolean) => {
    // Handle consent approval/rejection
    console.log(`Request ${id} ${approved ? 'approved' : 'rejected'}`);
    setPendingRequests(pendingRequests.filter(request => request.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
            Pending Consent Requests
          </h1>
          <p className="text-xl text-gray-400">
            Review and respond to data sharing requests
          </p>
        </motion.div>

        <div className="space-y-6">
          {pendingRequests.map((request, index) => (
            <motion.div
              key={request.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{request.title}</h3>
                  <p className="text-gray-400 mb-4">{request.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-300">
                      <ClockIcon className="h-5 w-5 mr-2" />
                      <span>Duration: {request.duration}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <span>Requester: {request.requester}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <span>Data Type: {request.dataType}</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleConsent(request.id, true)}
                    className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <CheckCircleIcon className="h-5 w-5 mr-2" />
                    Approve
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleConsent(request.id, false)}
                    className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <XCircleIcon className="h-5 w-5 mr-2" />
                    Reject
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}

          {pendingRequests.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-xl text-gray-400">No pending consent requests</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GiveConsent; 