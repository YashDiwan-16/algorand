'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiLock, 
  FiShield, 
  FiEye, 
  FiEyeOff, 
  FiTrash2, 
  FiDownload,
  FiAlertCircle,
  FiCheckCircle,
  FiFileText,
  FiInfo,
  FiGlobe,
  FiDatabase
} from 'react-icons/fi';
import { useWallet } from '@/providers/WalletContext';
import ConnectWallet from '@/components/ConnectWallet';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15
    }
  }
};

// Privacy category component
const PrivacyCategory = ({ title, description, icon, children }) => {
  return (
    <motion.div 
      variants={itemVariants}
      className="bg-white rounded-lg shadow-sm p-6"
    >
      <div className="flex items-center mb-4">
        <div className="bg-indigo-50 p-2 rounded-lg mr-3">
          {icon}
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </motion.div>
  );
};

// Toggle switch component
const ToggleSwitch = ({ enabled, onChange, label, description }) => {
  return (
    <div className="flex items-start justify-between py-3 border-b border-gray-100">
      <div>
        <div className="font-medium text-gray-800">{label}</div>
        {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
      </div>
      <button 
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
          enabled ? 'bg-indigo-600' : 'bg-gray-200'
        }`}
      >
        <span
          className={`inline-block w-4 h-4 transform transition-transform bg-white rounded-full ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
};

// Data sharing stats
const dataStats = [
  { name: 'Active Consents', value: 8, icon: <FiCheckCircle className="text-green-500" /> },
  { name: 'Data Controllers', value: 5, icon: <FiDatabase className="text-blue-500" /> },
  { name: 'Consent Changes', value: 12, icon: <FiEye className="text-indigo-500" /> },
  { name: 'Data Categories', value: 3, icon: <FiFileText className="text-purple-500" /> },
];

export default function PrivacyPage() {
  const { walletInfo } = useWallet();

  // Privacy settings state
  const [privacySettings, setPrivacySettings] = useState({
    enhancedPrivacy: true,
    blockTracking: true,
    anonymizeData: false,
    dataMinimization: true,
    thirdPartySharing: false,
    automaticDeletion: true
  });

  // Handler for privacy toggle changes
  const handleToggleChange = (setting, value) => {
    setPrivacySettings({
      ...privacySettings,
      [setting]: value
    });
  };

  // Data deletion states
  const [showDeletionConfirm, setShowDeletionConfirm] = useState(false);
  const [deletionReason, setDeletionReason] = useState('');
  const [confirmationText, setConfirmationText] = useState('');

  // Handle delete account request
  const handleDeleteRequest = () => {
    if (confirmationText.toLowerCase() === 'delete my data') {
      alert('Data deletion request submitted. This would initiate the data deletion process in a production app.');
      setShowDeletionConfirm(false);
      setConfirmationText('');
      setDeletionReason('');
    } else {
      alert('Please type "delete my data" to confirm');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {!walletInfo ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-xl text-center max-w-2xl mx-auto mt-12 shadow-md"
        >
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiLock className="text-indigo-600 text-2xl" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Connect Your Wallet</h2>
          <p className="text-gray-600 mb-6">You need to connect your wallet to access your privacy settings.</p>
          <ConnectWallet />
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto space-y-6"
        >
          <motion.div variants={itemVariants}>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Privacy Controls</h1>
            <p className="text-gray-600">
              Manage how your data is used, shared, and stored on the blockchain consent management platform.
            </p>
          </motion.div>

          {/* Privacy Overview */}
          <motion.div 
            variants={itemVariants}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-md p-6 text-white"
          >
            <h2 className="text-xl font-semibold mb-4">Your Privacy Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {dataStats.map((stat, index) => (
                <div key={index} className="bg-white bg-opacity-10 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    {stat.icon}
                    <span className="ml-2 text-sm font-medium">{stat.name}</span>
                  </div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-white bg-opacity-10 p-4 rounded-lg flex items-start">
              <FiInfo className="text-white mt-1 mr-3 flex-shrink-0" />
              <p className="text-sm">
                Your data is stored securely on Algorand blockchain using zero-knowledge proofs to protect your privacy.
                All active consents are managed through smart contracts, giving you full control.
              </p>
            </div>
          </motion.div>
          
          {/* Privacy Settings */}
          <PrivacyCategory 
            title="Privacy Settings" 
            description="Manage how your data is handled by the platform"
            icon={<FiShield className="text-indigo-600" size={20} />}
          >
            <ToggleSwitch
              enabled={privacySettings.enhancedPrivacy}
              onChange={(value) => handleToggleChange('enhancedPrivacy', value)}
              label="Enhanced Privacy Mode"
              description="Increases privacy protection by using additional encryption for consent details"
            />
            
            <ToggleSwitch
              enabled={privacySettings.blockTracking}
              onChange={(value) => handleToggleChange('blockTracking', value)}
              label="Block Analytics Tracking"
              description="Prevents third-party services from tracking your interactions with the platform"
            />
            
            <ToggleSwitch
              enabled={privacySettings.anonymizeData}
              onChange={(value) => handleToggleChange('anonymizeData', value)}
              label="Anonymize Data"
              description="Replaces identifiable information with anonymized identifiers when possible"
            />
          </PrivacyCategory>
          
          {/* Data Sharing Controls */}
          <PrivacyCategory 
            title="Data Sharing Controls" 
            description="Manage how your data is shared with third parties"
            icon={<FiGlobe className="text-indigo-600" size={20} />}
          >
            <ToggleSwitch
              enabled={privacySettings.dataMinimization}
              onChange={(value) => handleToggleChange('dataMinimization', value)}
              label="Data Minimization"
              description="Only share the minimum data necessary for each consent purpose"
            />
            
            <ToggleSwitch
              enabled={privacySettings.thirdPartySharing}
              onChange={(value) => handleToggleChange('thirdPartySharing', value)}
              label="Third-Party Data Sharing"
              description="Allow consented data to be shared with additional third parties (with notification)"
            />
            
            <div className="bg-yellow-50 p-4 rounded-md">
              <div className="flex items-start">
                <FiAlertCircle className="text-yellow-600 mt-1 mr-3 flex-shrink-0" />
                <div className="text-sm text-yellow-700">
                  <p className="font-medium">Third-Party Sharing Warning</p>
                  <p>Enabling third-party sharing may result in your data being used by organizations beyond your initial consent. Each third-party will be listed in the consent details.</p>
                </div>
              </div>
            </div>
          </PrivacyCategory>
          
          {/* Data Retention */}
          <PrivacyCategory 
            title="Data Retention" 
            description="Manage how long your data is stored"
            icon={<FiDatabase className="text-indigo-600" size={20} />}
          >
            <ToggleSwitch
              enabled={privacySettings.automaticDeletion}
              onChange={(value) => handleToggleChange('automaticDeletion', value)}
              label="Automatic Consent Expiration"
              description="Automatically revoke consents after their expiration date"
            />
            
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <div className="font-medium text-gray-800">Default Consent Duration</div>
                <p className="text-sm text-gray-500 mt-1">Set the default time period for new consents</p>
              </div>
              <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" defaultValue="1year">
                <option value="3months">3 months</option>
                <option value="6months">6 months</option>
                <option value="1year">1 year</option>
                <option value="2years">2 years</option>
                <option value="indefinite">Indefinite</option>
              </select>
            </div>
            
            <div className="py-3">
              <button className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50 flex items-center">
                <FiDownload className="mr-2" />
                Download All Your Data
              </button>
            </div>
          </PrivacyCategory>
          
          {/* Data Deletion */}
          <PrivacyCategory 
            title="Data Deletion" 
            description="Request permanent deletion of your data"
            icon={<FiTrash2 className="text-red-600" size={20} />}
          >
            <div className="bg-red-50 p-4 rounded-md mb-4">
              <div className="flex items-start">
                <FiAlertCircle className="text-red-600 mt-1 mr-3 flex-shrink-0" />
                <div className="text-sm text-red-700">
                  <p className="font-medium">Data Deletion Warning</p>
                  <p>Requesting data deletion will permanently remove all your consent records and personal information from our platform. This action cannot be undone.</p>
                  <p className="mt-2">Blockchain records of your consents will remain immutable on the blockchain, but all links to your identifiable information will be severed.</p>
                </div>
              </div>
            </div>
            
            {!showDeletionConfirm ? (
              <button 
                onClick={() => setShowDeletionConfirm(true)} 
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
              >
                <FiTrash2 className="mr-2" />
                Request Data Deletion
              </button>
            ) : (
              <div className="border border-red-200 rounded-md p-4">
                <h3 className="font-medium text-red-600 mb-3">Confirm Data Deletion Request</h3>
                
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reason for deletion (optional)
                  </label>
                  <select 
                    value={deletionReason}
                    onChange={(e) => setDeletionReason(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="">Select a reason</option>
                    <option value="no-longer-use">No longer using the service</option>
                    <option value="privacy-concerns">Privacy concerns</option>
                    <option value="data-breach">Concerned about data breach</option>
                    <option value="too-many-consents">Too many active consents</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type "delete my data" to confirm
                  </label>
                  <input
                    type="text"
                    value={confirmationText}
                    onChange={(e) => setConfirmationText(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="delete my data"
                  />
                </div>
                
                <div className="flex space-x-3">
                  <button 
                    onClick={handleDeleteRequest}
                    disabled={confirmationText.toLowerCase() !== 'delete my data'}
                    className={`px-4 py-2 bg-red-600 text-white rounded-md flex items-center ${
                      confirmationText.toLowerCase() !== 'delete my data' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700'
                    }`}
                  >
                    <FiTrash2 className="mr-2" />
                    Confirm Deletion
                  </button>
                  <button 
                    onClick={() => setShowDeletionConfirm(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </PrivacyCategory>
        </motion.div>
      )}
    </div>
  );
} 