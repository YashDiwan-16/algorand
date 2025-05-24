"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  FiPlus, 
  FiCheck, 
  FiX, 
  FiInfo, 
  FiFilter, 
  FiCheckCircle, 
  FiAlertTriangle, 
  FiClock,
  FiEdit,
  FiGlobe,
  FiUserCheck,
  FiLock
} from "react-icons/fi";
import { useWallet } from "@/providers/WalletContext";

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

// Sample consent data
const consents = [
  {
    id: "1",
    organization: "Aadhaar UIDAI",
    purpose: "Identity verification",
    dataAccessed: ["Name", "Date of Birth", "Aadhaar Number", "Photo"],
    status: "active",
    grantedDate: "2025-04-15",
    expiryDate: "2025-10-15",
    txId: "KXSVWZ7JDSBTQMYVGLH3CG6AGQ6SMJF4LUOZONAEYE4SL4DOBFUQ",
  },
  {
    id: "2",
    organization: "DigiLocker",
    purpose: "Document access",
    dataAccessed: ["PAN Card", "Driving License", "Educational Certificates"],
    status: "active",
    grantedDate: "2025-03-10",
    expiryDate: "2025-09-10",
    txId: "Q3BKGZHNNVHQTC2YZMVGZVEXRFM5NHDFXBDCLGCL6MCKEHHI4ISA",
  },
  {
    id: "3",
    organization: "State Bank of India",
    purpose: "KYC verification",
    dataAccessed: ["Name", "Address", "PAN Number", "Phone Number"],
    status: "expired",
    grantedDate: "2024-10-05",
    expiryDate: "2025-04-05",
    txId: "QQHF53XZ36VDJSBMAFPMC4OSYC6JX7NZYWRV3OLKHJBW5XPASJBQ",
  },
  {
    id: "4",
    organization: "Apollo Hospitals",
    purpose: "Medical records access",
    dataAccessed: ["Medical History", "Prescriptions", "Lab Reports"],
    status: "revoked",
    grantedDate: "2025-01-20",
    expiryDate: "2025-07-20",
    revokedDate: "2025-03-15",
    txId: "BSVJEJM2NW3R6JURDU65E33A5BAZSDSUUQTFJVXBATN44KHNTEGA",
  },
  {
    id: "5",
    organization: "Airtel Telecom",
    purpose: "Service provisioning",
    dataAccessed: ["Name", "Address", "Phone Number", "Email"],
    status: "active",
    grantedDate: "2025-02-28",
    expiryDate: "2026-02-28",
    txId: "PJDN5T62Q2ABJLPVVRW6XHXNIEDM5LMNOHHOMJ23NWKWD7M7WHXQ",
  }
];

export default function ConsentsPage() {
  const { walletInfo } = useWallet();
  const [filter, setFilter] = useState("all");
  const [showAddConsentModal, setShowAddConsentModal] = useState(false);
  const [showConsentDetails, setShowConsentDetails] = useState<string | null>(null);

  // Filter consents based on status
  const filteredConsents = filter === "all" 
    ? consents 
    : consents.filter(consent => consent.status === filter);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto px-4 py-8"
    >
      <motion.div variants={itemVariants} className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Consent Management</h1>
          <p className="text-gray-600 mt-1">Manage your data sharing consents with organizations</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddConsentModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm flex items-center font-medium transition-colors"
        >
          <FiPlus className="mr-2" />
          Grant New Consent
        </motion.button>
      </motion.div>

      {/* Blockchain Address */}
      <motion.div 
        variants={itemVariants} 
        className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 mb-8 flex items-center"
      >
        <div className="p-2 bg-indigo-100 rounded-full mr-4">
          <FiLock className="text-indigo-700" size={20} />
        </div>
        <div>
          <p className="text-sm text-indigo-700 font-medium">Blockchain Identity</p>
          <p className="text-indigo-900 font-mono">
            {walletInfo?.address || "ZLNTXJNPGBWZJPZGCWF5WXDWBARJLPLU7KX3XY6JHMFHAKZLH6CXUMTEGU"}
          </p>
        </div>
      </motion.div>

      {/* Filter Controls */}
      <motion.div variants={itemVariants} className="mb-6 flex items-center space-x-2">
        <FiFilter className="text-gray-500 mr-1" />
        <span className="text-gray-700 font-medium">Filter:</span>
        <div className="flex space-x-2">
          {["all", "active", "expired", "revoked"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1 rounded-full text-sm ${
                filter === status
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              } transition-colors`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Consent Cards */}
      <div className="grid grid-cols-1 gap-4">
        {filteredConsents.map((consent) => (
          <motion.div
            key={consent.id}
            variants={itemVariants}
            className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${
                  consent.status === "active" ? "bg-green-100" : 
                  consent.status === "expired" ? "bg-yellow-100" : "bg-red-100"
                }`}>
                  {consent.status === "active" ? (
                    <FiCheckCircle className="text-green-600" size={20} />
                  ) : consent.status === "expired" ? (
                    <FiClock className="text-yellow-600" size={20} />
                  ) : (
                    <FiX className="text-red-600" size={20} />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{consent.organization}</h3>
                  <p className="text-gray-600 text-sm">{consent.purpose}</p>
                </div>
              </div>
              <div className={`text-xs px-2 py-1 rounded-full ${
                consent.status === "active" ? "bg-green-100 text-green-800" : 
                consent.status === "expired" ? "bg-yellow-100 text-yellow-800" : 
                "bg-red-100 text-red-800"
              }`}>
                {consent.status.charAt(0).toUpperCase() + consent.status.slice(1)}
              </div>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2 text-sm text-gray-600">
              <div>
                <span className="block text-xs text-gray-500">Granted</span>
                <span>{consent.grantedDate}</span>
              </div>
              <div>
                <span className="block text-xs text-gray-500">Expires</span>
                <span>{consent.expiryDate}</span>
              </div>
              <div>
                <span className="block text-xs text-gray-500">Data Elements</span>
                <span>{consent.dataAccessed.length}</span>
              </div>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <span className="text-xs text-gray-500 font-mono truncate max-w-xs">
                Tx: {consent.txId.substring(0, 8)}...
              </span>
              <button 
                onClick={() => setShowConsentDetails(consent.id)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
              >
                View Details
                <FiInfo className="ml-1" size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredConsents.length === 0 && (
        <motion.div 
          variants={itemVariants}
          className="bg-gray-50 rounded-lg p-8 text-center border border-gray-200"
        >
          <FiInfo className="mx-auto text-gray-400 mb-3" size={24} />
          <h3 className="text-gray-700 font-medium mb-1">No consents found</h3>
          <p className="text-gray-500 text-sm">
            {filter === "all" 
              ? "You haven't granted any consents yet." 
              : `You don't have any ${filter} consents.`}
          </p>
        </motion.div>
      )}

      {/* Consent Detail Modal */}
      {showConsentDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col"
          >
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 flex justify-between items-center">
              <h3 className="font-bold text-lg">Consent Details</h3>
              <button 
                onClick={() => setShowConsentDetails(null)}
                className="p-1 hover:bg-white hover:bg-opacity-20 rounded-full"
              >
                <FiX size={20} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              {consents.filter(c => c.id === showConsentDetails).map(consent => (
                <div key={consent.id}>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900">{consent.organization}</h4>
                      <p className="text-gray-600">{consent.purpose}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      consent.status === "active" ? "bg-green-100 text-green-800" : 
                      consent.status === "expired" ? "bg-yellow-100 text-yellow-800" : 
                      "bg-red-100 text-red-800"
                    }`}>
                      {consent.status.charAt(0).toUpperCase() + consent.status.slice(1)}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                      <h5 className="text-sm font-medium text-gray-500 mb-1">Granted On</h5>
                      <p className="font-medium text-gray-900">{consent.grantedDate}</p>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-gray-500 mb-1">Expires On</h5>
                      <p className="font-medium text-gray-900">{consent.expiryDate}</p>
                    </div>
                    {consent.status === "revoked" && (
                      <div>
                        <h5 className="text-sm font-medium text-gray-500 mb-1">Revoked On</h5>
                        <p className="font-medium text-gray-900">{consent.revokedDate}</p>
                      </div>
                    )}
                    <div>
                      <h5 className="text-sm font-medium text-gray-500 mb-1">Blockchain Transaction</h5>
                      <p className="font-mono text-sm text-blue-600 break-all">{consent.txId}</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h5 className="text-sm font-medium text-gray-500 mb-3">Data Elements Shared</h5>
                    <div className="grid grid-cols-2 gap-2">
                      {consent.dataAccessed.map((data, idx) => (
                        <div key={idx} className="bg-gray-50 p-2 rounded flex items-center">
                          <FiCheck className="text-green-500 mr-2" size={16} />
                          <span className="text-gray-700">{data}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6 mb-6">
                    <h5 className="text-sm font-medium text-gray-500 mb-3">Consent Timeline</h5>
                    <div className="relative pl-8 pb-2">
                      <div className="absolute top-0 bottom-0 left-3 w-0.5 bg-gray-200"></div>
                      <div className="relative mb-5">
                        <div className="absolute left-[-30px] top-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                          <FiUserCheck className="text-green-600" size={14} />
                        </div>
                        <div>
                          <h6 className="font-medium">Consent Granted</h6>
                          <p className="text-sm text-gray-500">{consent.grantedDate}</p>
                        </div>
                      </div>
                      {consent.status === "revoked" && (
                        <div className="relative mb-5">
                          <div className="absolute left-[-30px] top-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                            <FiX className="text-red-600" size={14} />
                          </div>
                          <div>
                            <h6 className="font-medium">Consent Revoked</h6>
                            <p className="text-sm text-gray-500">{consent.revokedDate}</p>
                          </div>
                        </div>
                      )}
                      {consent.status !== "revoked" && (
                        <div className="relative">
                          <div className="absolute left-[-30px] top-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                            <FiClock className="text-blue-600" size={14} />
                          </div>
                          <div>
                            <h6 className="font-medium">Consent Expires</h6>
                            <p className="text-sm text-gray-500">{consent.expiryDate}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 p-4 flex justify-end space-x-3">
              {consents.find(c => c.id === showConsentDetails)?.status === "active" && (
                <button className="px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium flex items-center">
                  <FiX className="mr-2" />
                  Revoke Consent
                </button>
              )}
              <button 
                onClick={() => setShowConsentDetails(null)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Add Consent Modal */}
      {showAddConsentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden"
          >
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 flex justify-between items-center">
              <h3 className="font-bold text-lg">Grant New Consent</h3>
              <button 
                onClick={() => setShowAddConsentModal(false)}
                className="p-1 hover:bg-white hover:bg-opacity-20 rounded-full"
              >
                <FiX size={20} />
              </button>
            </div>
            
            <div className="p-6">
              <form>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Organization Name
                  </label>
                  <input 
                    type="text" 
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="E.g., State Bank of India"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Purpose of Data Sharing
                  </label>
                  <input 
                    type="text" 
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="E.g., KYC verification"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Expiry Duration
                  </label>
                  <select className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="90">3 months</option>
                    <option value="180">6 months</option>
                    <option value="365">1 year</option>
                    <option value="730">2 years</option>
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Data Elements to Share
                  </label>
                  <div className="space-y-2">
                    {["Name", "Date of Birth", "Address", "Phone Number", "Email", "PAN Number"].map((item) => (
                      <div key={item} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`data-${item}`}
                          className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`data-${item}`} className="text-gray-700">
                          {item}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4 mt-6 flex justify-end space-x-3">
                  <button 
                    type="button"
                    onClick={() => setShowAddConsentModal(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center"
                  >
                    <FiCheck className="mr-2" />
                    Grant Consent
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
} 