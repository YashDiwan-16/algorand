'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { motion } from 'framer-motion';
import { 
  FiUser, FiLock, FiCheckCircle, FiXCircle, 
  FiUpload, FiShield, FiKey, FiLink, FiX,
  FiAlertTriangle, FiInfo
} from 'react-icons/fi';
import { useWallet } from '@/providers/WalletContext';

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
      stiffness: 300,
      damping: 24
    }
  }
};

// Demo identity data
const identityDocuments = [
  {
    id: 'aadhaar',
    name: 'Aadhaar Card',
    status: 'Verified',
    lastVerified: '2023-12-10',
    issuer: 'UIDAI',
    linked: true,
    icon: FiUser
  },
  {
    id: 'pan',
    name: 'PAN Card',
    status: 'Verified',
    lastVerified: '2023-11-15',
    issuer: 'Income Tax Department',
    linked: true,
    icon: FiKey
  },
  {
    id: 'dl',
    name: 'Driving License',
    status: 'Pending',
    lastVerified: '-',
    issuer: 'Transport Department',
    linked: false,
    icon: FiShield
  },
  {
    id: 'passport',
    name: 'Passport',
    status: 'Not Verified',
    lastVerified: '-',
    issuer: 'Ministry of External Affairs',
    linked: false,
    icon: FiLock
  }
];

export default function IdentityPage() {
  const { walletInfo } = useWallet();
  const [aadhaarLinked, setAadhaarLinked] = useState(true);
  const [digiLockerLinked, setDigiLockerLinked] = useState(true);
  const [isLinking, setIsLinking] = useState(false);
  const [linkingStep, setLinkingStep] = useState(0);
  
  // Mock OTP verification
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [otp, setOtp] = useState('');
  
  const handleAadhaarLink = () => {
    if (aadhaarLinked) {
      setAadhaarLinked(false);
    } else {
      setShowOtpVerification(true);
    }
  };
  
  const handleDigiLockerLink = () => {
    if (digiLockerLinked) {
      setDigiLockerLinked(false);
    } else {
      setIsLinking(true);
      setLinkingStep(0);
      
      // Simulate DigiLocker linking process
      setTimeout(() => setLinkingStep(1), 1500);
      setTimeout(() => setLinkingStep(2), 3000);
      setTimeout(() => {
        setLinkingStep(3);
        setDigiLockerLinked(true);
        setIsLinking(false);
      }, 4500);
    }
  };
  
  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (otp.length === 6) {
      // Mock successful verification
      setAadhaarLinked(true);
      setShowOtpVerification(false);
      setOtp('');
    }
  };
  
  return (
    <DashboardLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <h1 className="text-2xl font-bold text-gray-900">Identity Management</h1>
        
        {/* Identity Overview */}
        <motion.div 
          variants={itemVariants}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Identity Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-4">
              <div className="flex-none mt-1">
                <FiUser className="text-blue-500 w-6 h-6" />
              </div>
              <div>
                <h3 className="font-medium">Blockchain Identity</h3>
                <p className="text-sm text-gray-500 mb-1">Algorand Address</p>
                <p className="text-sm text-gray-700 font-mono bg-gray-100 p-1 rounded">
                  {walletInfo?.address?.substring(0, 8)}...{walletInfo?.address?.substring(walletInfo.address.length - 8)}
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="flex-none mt-1">
                <FiShield className="text-green-500 w-6 h-6" />
              </div>
              <div>
                <h3 className="font-medium">Self-Sovereign Identity Status</h3>
                <p className="text-sm text-gray-500 mb-1">Identity Verification</p>
                <div className="flex items-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <FiCheckCircle className="mr-1" /> Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Integration Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Aadhaar Integration */}
          <motion.div 
            variants={itemVariants}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <div className="flex-none mr-3">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <FiUser className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Aadhaar Integration</h3>
                  <p className="text-sm text-gray-600">Link your Aadhaar for secure identity verification</p>
                </div>
              </div>
              <div className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${aadhaarLinked ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                {aadhaarLinked ? 'Linked' : 'Not Linked'}
              </div>
            </div>
            
            <div className="mt-6">
              <button
                onClick={handleAadhaarLink}
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white 
                  ${aadhaarLinked 
                    ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500' 
                    : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2`}
              >
                {aadhaarLinked 
                  ? <><FiX className="mr-2" /> Unlink Aadhaar</> 
                  : <><FiLink className="mr-2" /> Link Aadhaar</>
                }
              </button>
            </div>
            
            {aadhaarLinked && (
              <div className="mt-4 p-3 bg-blue-50 rounded-md">
                <div className="flex items-start">
                  <FiInfo className="mt-0.5 mr-2 text-blue-500" />
                  <div className="text-sm text-blue-700">
                    <p className="font-medium">Aadhaar Verification Status</p>
                    <p>Your Aadhaar has been verified and linked to your account.</p>
                    <p className="mt-1">Last verified: 23 Apr 2023</p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
          
          {/* DigiLocker Integration */}
          <motion.div 
            variants={itemVariants}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <div className="flex-none mr-3">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <FiLock className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">DigiLocker Integration</h3>
                  <p className="text-sm text-gray-600">Access and share your verified documents securely</p>
                </div>
              </div>
              <div className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${digiLockerLinked ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                {digiLockerLinked ? 'Linked' : 'Not Linked'}
              </div>
            </div>
            
            <div className="mt-6">
              {isLinking ? (
                <div className="space-y-3">
                  <div className="bg-gray-100 p-3 rounded-md">
                    <h4 className="font-medium text-sm mb-2">Linking DigiLocker Account</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${linkingStep >= 0 ? 'bg-blue-500' : 'bg-gray-300'}`}>
                          {linkingStep > 0 ? <FiCheckCircle className="text-white w-4 h-4" /> : <div className="w-2 h-2 bg-white rounded-full"></div>}
                        </div>
                        <div className={`ml-2 text-sm ${linkingStep >= 0 ? 'text-blue-500 font-medium' : 'text-gray-500'}`}>Initiating connection</div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${linkingStep >= 1 ? 'bg-blue-500' : 'bg-gray-300'}`}>
                          {linkingStep > 1 ? <FiCheckCircle className="text-white w-4 h-4" /> : <div className="w-2 h-2 bg-white rounded-full"></div>}
                        </div>
                        <div className={`ml-2 text-sm ${linkingStep >= 1 ? 'text-blue-500 font-medium' : 'text-gray-500'}`}>Connecting to DigiLocker</div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${linkingStep >= 2 ? 'bg-blue-500' : 'bg-gray-300'}`}>
                          {linkingStep > 2 ? <FiCheckCircle className="text-white w-4 h-4" /> : <div className="w-2 h-2 bg-white rounded-full"></div>}
                        </div>
                        <div className={`ml-2 text-sm ${linkingStep >= 2 ? 'text-blue-500 font-medium' : 'text-gray-500'}`}>Verifying credentials</div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${linkingStep >= 3 ? 'bg-blue-500' : 'bg-gray-300'}`}>
                          {linkingStep > 2 ? <FiCheckCircle className="text-white w-4 h-4" /> : <div className="w-2 h-2 bg-white rounded-full"></div>}
                        </div>
                        <div className={`ml-2 text-sm ${linkingStep >= 3 ? 'text-blue-500 font-medium' : 'text-gray-500'}`}>Completing integration</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleDigiLockerLink}
                  className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white 
                    ${digiLockerLinked 
                      ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500' 
                      : 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500'
                    } focus:outline-none focus:ring-2 focus:ring-offset-2`}
                >
                  {digiLockerLinked 
                    ? <><FiX className="mr-2" /> Unlink DigiLocker</> 
                    : <><FiLink className="mr-2" /> Link DigiLocker</>
                  }
                </button>
              )}
            </div>
            
            {digiLockerLinked && !isLinking && (
              <div className="mt-4 p-3 bg-purple-50 rounded-md">
                <div className="flex items-start">
                  <FiInfo className="mt-0.5 mr-2 text-purple-500" />
                  <div className="text-sm text-purple-700">
                    <p className="font-medium">DigiLocker Sync Status</p>
                    <p>Your DigiLocker account is linked and documents are available for sharing.</p>
                    <p className="mt-1">Last synced: Today at 10:32 AM</p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
        
        {/* Documents Section */}
        <motion.div 
          variants={itemVariants}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Identity Documents</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issuer</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Verified</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {identityDocuments.map((doc) => (
                  <tr key={doc.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-blue-100 rounded-full">
                          <doc.icon className="text-blue-600 h-5 w-5" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{doc.issuer}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${doc.status === 'Verified' 
                          ? 'bg-green-100 text-green-800' 
                          : doc.status === 'Pending' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                        {doc.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {doc.lastVerified}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                        View
                      </button>
                      {doc.linked ? (
                        <button className="text-red-600 hover:text-red-900">
                          Unlink
                        </button>
                      ) : (
                        <button className="text-green-600 hover:text-green-900">
                          Link
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6">
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <FiUpload className="mr-2" /> Add New Document
            </button>
          </div>
        </motion.div>
      </motion.div>
      
      {/* OTP Verification Modal */}
      {showOtpVerification && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl"
          >
            <h2 className="text-lg font-bold text-gray-900 mb-4">Verify your Aadhaar</h2>
            <p className="text-sm text-gray-600 mb-4">Enter the 6-digit OTP sent to your registered mobile number linked with Aadhaar.</p>
            
            <form onSubmit={handleOtpSubmit}>
              <div className="mb-4">
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">OTP</label>
                <input
                  type="text"
                  id="otp"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').substring(0, 6))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-center font-mono text-lg tracking-widest"
                  placeholder="******"
                  required
                />
              </div>
              
              <div className="flex items-center justify-between mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowOtpVerification(false);
                    setOtp('');
                  }}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  disabled={otp.length !== 6}
                >
                  <FiCheckCircle className="mr-2" /> Verify OTP
                </button>
              </div>
            </form>
            
            <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-500 flex items-center justify-center">
              <FiAlertTriangle className="mr-2 text-yellow-500" />
              <span>For demo purposes, any 6 digits will work</span>
            </div>
          </motion.div>
        </div>
      )}
    </DashboardLayout>
  );
} 