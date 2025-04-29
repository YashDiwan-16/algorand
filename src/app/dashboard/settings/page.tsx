'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiUser, 
  FiLock, 
  FiSettings, 
  FiBell, 
  FiEye, 
  FiSun,
  FiMoon,
  FiGlobe,
  FiToggleLeft,
  FiToggleRight,
  FiShield,
  FiAlertCircle,
  FiSave
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

// Setting sections
const SettingSection = ({ title, icon, children }) => {
  return (
    <motion.div 
      variants={itemVariants}
      className="bg-white rounded-lg shadow-sm p-6"
    >
      <div className="flex items-center mb-4">
        <div className="bg-blue-50 p-2 rounded-lg mr-3">
          {icon}
        </div>
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </motion.div>
  );
};

// Toggle Switch Component
const Toggle = ({ enabled, onChange, label }) => {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-700">{label}</span>
      <button 
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
          enabled ? 'bg-blue-600' : 'bg-gray-200'
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

export default function SettingsPage() {
  const { walletInfo } = useWallet();
  
  // Account settings state
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [language, setLanguage] = useState('english');
  
  // Notification settings state
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [browserNotifications, setBrowserNotifications] = useState(false);
  const [consentNotifications, setConsentNotifications] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState(true);
  
  // Appearance settings state
  const [theme, setTheme] = useState('light');
  const [reducedMotion, setReducedMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  
  // Demo blockchain settings
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [gasOption, setGasOption] = useState('standard');
  
  // Handle settings save
  const handleSaveSettings = () => {
    alert('Settings saved successfully. In a production app, these would be persisted.');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {!walletInfo ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-xl text-center max-w-2xl mx-auto mt-12 shadow-md"
        >
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiSettings className="text-blue-600 text-2xl" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Connect Your Wallet</h2>
          <p className="text-gray-600 mb-6">You need to connect your wallet to access your settings.</p>
          <ConnectWallet />
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto space-y-6"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Settings</h1>
          
          {/* Account Settings */}
          <SettingSection title="Account Settings" icon={<FiUser className="text-blue-600" size={20} />}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">Language</label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="english">English</option>
                <option value="hindi">Hindi</option>
                <option value="tamil">Tamil</option>
                <option value="telugu">Telugu</option>
                <option value="marathi">Marathi</option>
              </select>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-md flex items-start">
              <FiLock className="text-blue-600 mt-1 mr-3 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-blue-800">Wallet Address</p>
                <p className="text-xs text-blue-700 font-mono mt-1 break-all">{walletInfo.address}</p>
              </div>
            </div>
          </SettingSection>
          
          {/* Notification Settings */}
          <SettingSection title="Notification Preferences" icon={<FiBell className="text-blue-600" size={20} />}>
            <Toggle
              enabled={emailNotifications}
              onChange={setEmailNotifications}
              label="Email Notifications"
            />
            <Toggle
              enabled={browserNotifications}
              onChange={setBrowserNotifications}
              label="Browser Notifications"
            />
            <Toggle
              enabled={consentNotifications}
              onChange={setConsentNotifications}
              label="Consent Request Alerts"
            />
            <Toggle
              enabled={securityAlerts}
              onChange={setSecurityAlerts}
              label="Security Alerts"
            />
            
            <div className="bg-yellow-50 p-4 rounded-md mt-4">
              <div className="flex items-start">
                <FiAlertCircle className="text-yellow-600 mt-1 mr-3 flex-shrink-0" />
                <div className="text-sm text-yellow-700">
                  <p className="font-medium">Important Note</p>
                  <p>Security alerts cannot be disabled for consent-related activities as they are critical for your data security.</p>
                </div>
              </div>
            </div>
          </SettingSection>
          
          {/* Appearance Settings */}
          <SettingSection title="Appearance" icon={<FiEye className="text-blue-600" size={20} />}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setTheme('light')}
                  className={`flex items-center justify-center p-4 border rounded-md ${
                    theme === 'light' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                >
                  <FiSun className={theme === 'light' ? 'text-blue-600' : 'text-gray-500'} />
                  <span className={`ml-2 ${theme === 'light' ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>Light</span>
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`flex items-center justify-center p-4 border rounded-md ${
                    theme === 'dark' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                >
                  <FiMoon className={theme === 'dark' ? 'text-blue-600' : 'text-gray-500'} />
                  <span className={`ml-2 ${theme === 'dark' ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>Dark</span>
                </button>
              </div>
            </div>
            
            <Toggle
              enabled={reducedMotion}
              onChange={setReducedMotion}
              label="Reduced Motion"
            />
            <Toggle
              enabled={highContrast}
              onChange={setHighContrast}
              label="High Contrast Mode"
            />
          </SettingSection>
          
          {/* Blockchain Settings */}
          <SettingSection title="Blockchain Settings" icon={<FiShield className="text-blue-600" size={20} />}>
            <div className="mb-4">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-700">Transaction Speed</label>
                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  {showAdvanced ? 'Hide Advanced' : 'Show Advanced'}
                </button>
              </div>
              <div className="mt-2 grid grid-cols-3 gap-3">
                <button
                  onClick={() => setGasOption('economic')}
                  className={`px-3 py-2 text-sm border rounded-md ${
                    gasOption === 'economic' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-700'
                  }`}
                >
                  Economic
                </button>
                <button
                  onClick={() => setGasOption('standard')}
                  className={`px-3 py-2 text-sm border rounded-md ${
                    gasOption === 'standard' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-700'
                  }`}
                >
                  Standard
                </button>
                <button
                  onClick={() => setGasOption('fast')}
                  className={`px-3 py-2 text-sm border rounded-md ${
                    gasOption === 'fast' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-700'
                  }`}
                >
                  Fast
                </button>
              </div>
            </div>
            
            {showAdvanced && (
              <div className="space-y-3 bg-gray-50 p-4 rounded-md">
                <p className="text-sm font-medium text-gray-700 mb-2">Advanced Settings</p>
                <Toggle
                  enabled={true}
                  onChange={() => {}}
                  label="Use Algorand Standard Asset (ASA) for consent tokens"
                />
                <Toggle
                  enabled={true}
                  onChange={() => {}}
                  label="Enable automatic revocation for expired consents"
                />
                <div className="bg-blue-50 p-3 rounded-md mt-2">
                  <p className="text-xs text-blue-700">
                    These advanced blockchain settings are optimized for the Algorand network and ensure efficient consent management.
                  </p>
                </div>
              </div>
            )}
          </SettingSection>
          
          {/* Save Button */}
          <motion.div 
            variants={itemVariants}
            className="flex justify-end"
          >
            <button
              onClick={handleSaveSettings}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 flex items-center space-x-2"
            >
              <FiSave />
              <span>Save Settings</span>
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
} 