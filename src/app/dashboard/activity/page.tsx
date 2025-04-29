"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  FiActivity, 
  FiCheckCircle, 
  FiXCircle, 
  FiAlertTriangle, 
  FiRefreshCw,
  FiSearch,
  FiFilter,
  FiCalendar,
  FiDownload,
  FiUser,
  FiFileText,
  FiDatabase,
  FiShield,
  FiLock,
  FiEye
} from "react-icons/fi";
import Image from "next/image";

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

// Demo activity data
const activityData = [
  {
    id: "act-001",
    type: "consent_granted",
    user: {
      id: "user1",
      name: "Rajesh Kumar",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    target: "HDFC Bank",
    description: "Granted consent for KYC document access",
    timestamp: "2023-07-15T08:30:00Z",
    ipAddress: "192.168.1.101",
    metadata: {
      consentId: "consent-12345",
      dataCategories: ["Personal Identification", "Financial Information"],
      duration: "1 year"
    }
  },
  {
    id: "act-002",
    type: "consent_revoked",
    user: {
      id: "user2",
      name: "Priya Sharma",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    target: "Amazon India",
    description: "Revoked consent for marketing communications",
    timestamp: "2023-07-14T14:45:00Z",
    ipAddress: "192.168.1.102",
    metadata: {
      consentId: "consent-67890",
      reason: "No longer required"
    }
  },
  {
    id: "act-003",
    type: "document_shared",
    user: {
      id: "user5",
      name: "Vikram Singh",
      avatar: "https://randomuser.me/api/portraits/men/78.jpg"
    },
    target: "Income Tax Department",
    description: "Shared PAN card via DigiLocker",
    timestamp: "2023-07-14T11:20:00Z",
    ipAddress: "192.168.1.105",
    metadata: {
      documentType: "PAN Card",
      documentId: "ABCPD1234X",
      accessType: "one-time"
    }
  },
  {
    id: "act-004",
    type: "user_registered",
    user: {
      id: "user3",
      name: "Amit Patel",
      avatar: "https://randomuser.me/api/portraits/men/55.jpg"
    },
    target: "System",
    description: "Registered new account",
    timestamp: "2023-07-13T09:15:00Z",
    ipAddress: "192.168.1.103",
    metadata: {
      registrationType: "Email"
    }
  },
  {
    id: "act-005",
    type: "aadhaar_verified",
    user: {
      id: "user4",
      name: "Sunita Gupta",
      avatar: "https://randomuser.me/api/portraits/women/67.jpg"
    },
    target: "System",
    description: "Verified identity with Aadhaar",
    timestamp: "2023-07-12T16:05:00Z",
    ipAddress: "192.168.1.104",
    metadata: {
      verificationMethod: "OTP",
      aadhaarLastFour: "6789"
    }
  },
  {
    id: "act-006",
    type: "digilocker_linked",
    user: {
      id: "user1",
      name: "Rajesh Kumar",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    target: "DigiLocker",
    description: "Linked DigiLocker account",
    timestamp: "2023-07-12T10:30:00Z",
    ipAddress: "192.168.1.101",
    metadata: {
      documentsAvailable: 8
    }
  },
  {
    id: "act-007",
    type: "consent_updated",
    user: {
      id: "user2",
      name: "Priya Sharma",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    target: "SBI Bank",
    description: "Updated consent parameters",
    timestamp: "2023-07-11T13:45:00Z",
    ipAddress: "192.168.1.102",
    metadata: {
      consentId: "consent-24680",
      changes: ["Duration extended", "Additional data category added"]
    }
  },
  {
    id: "act-008",
    type: "login",
    user: {
      id: "user5",
      name: "Vikram Singh",
      avatar: "https://randomuser.me/api/portraits/men/78.jpg"
    },
    target: "System",
    description: "Logged in successfully",
    timestamp: "2023-07-11T08:10:00Z",
    ipAddress: "192.168.1.105",
    metadata: {
      loginMethod: "Password",
      browser: "Chrome",
      device: "Desktop"
    }
  }
];

// Get activity icon based on type
const getActivityIcon = (type: string) => {
  switch (type) {
    case "consent_granted":
      return <FiCheckCircle className="text-green-500" />;
    case "consent_revoked":
      return <FiXCircle className="text-red-500" />;
    case "consent_updated":
      return <FiRefreshCw className="text-orange-500" />;
    case "document_shared":
      return <FiFileText className="text-blue-500" />;
    case "user_registered":
      return <FiUser className="text-purple-500" />;
    case "aadhaar_verified":
      return <FiShield className="text-emerald-500" />;
    case "digilocker_linked":
      return <FiDatabase className="text-indigo-500" />;
    case "login":
      return <FiLock className="text-gray-500" />;
    default:
      return <FiActivity className="text-gray-500" />;
  }
};

// Format timestamp
const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(date);
};

export default function ActivityPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedTimeframe, setSelectedTimeframe] = useState("All");

  // Filter activities
  const filteredActivities = activityData.filter(activity => {
    const matchesSearch = 
      activity.user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.target.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === "All" || activity.type === selectedType;
    
    // Timeframe filtering logic would go here
    
    return matchesSearch && matchesType;
  });

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Activity Log</h1>
          <p className="text-gray-600">Track all system and user activities</p>
        </div>
        <button
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <FiDownload className="mr-2" />
          Export Activity
        </button>
      </motion.div>

      {/* Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { title: "Consent Changes", value: 15, icon: FiRefreshCw, color: "bg-blue-500" },
          { title: "Documents Shared", value: 32, icon: FiFileText, color: "bg-green-500" },
          { title: "Aadhaar Verifications", value: 8, icon: FiShield, color: "bg-purple-500" },
          { title: "Login Activities", value: 124, icon: FiLock, color: "bg-orange-500" }
        ].map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <div className={`w-12 h-12 rounded-full ${stat.color} text-white flex items-center justify-center mb-3`}>
              <stat.icon size={20} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{stat.title}</h3>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </motion.div>

      {/* Search and filters */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search activities..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <FiFilter className="text-gray-500" />
          <select
            className="block pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="All">All Activities</option>
            <option value="consent_granted">Consent Granted</option>
            <option value="consent_revoked">Consent Revoked</option>
            <option value="consent_updated">Consent Updated</option>
            <option value="document_shared">Document Shared</option>
            <option value="user_registered">User Registered</option>
            <option value="aadhaar_verified">Aadhaar Verified</option>
            <option value="digilocker_linked">DigiLocker Linked</option>
            <option value="login">Login</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <FiCalendar className="text-gray-500" />
          <select
            className="block pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
          >
            <option value="All">All Time</option>
            <option value="Today">Today</option>
            <option value="Yesterday">Yesterday</option>
            <option value="Last7Days">Last 7 Days</option>
            <option value="Last30Days">Last 30 Days</option>
            <option value="Custom">Custom Range</option>
          </select>
        </div>
      </motion.div>

      {/* Activity Timeline */}
      <motion.div variants={itemVariants} className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900">Activity Timeline</h3>
        </div>
        <div className="p-4">
          <div className="flow-root">
            <ul className="-mb-8">
              {filteredActivities.map((activity, index) => (
                <li key={activity.id}>
                  <div className="relative pb-8">
                    {index !== filteredActivities.length - 1 ? (
                      <span
                        className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                    ) : null}
                    <div className="relative flex items-start space-x-3">
                      <div className="relative">
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center ring-8 ring-white">
                          {getActivityIcon(activity.type)}
                        </div>
                      </div>
                      <div className="min-w-0 flex-1 py-1.5">
                        <div className="flex items-center gap-2">
                          <div className="text-sm text-gray-500">
                            <span className="font-medium text-gray-900">{activity.user.name}</span> {activity.description}
                            {activity.target !== "System" && (
                              <span> with <span className="font-medium text-gray-900">{activity.target}</span></span>
                            )}
                          </div>
                        </div>
                        <div className="mt-2 flex justify-between">
                          <div className="flex items-center text-sm text-gray-500">
                            <span>{formatTimestamp(activity.timestamp)}</span>
                            <span className="mx-2">•</span>
                            <span>IP: {activity.ipAddress}</span>
                          </div>
                          <button
                            className="inline-flex items-center text-xs font-medium text-blue-600 hover:text-blue-800"
                          >
                            <FiEye className="mr-1" size={14} />
                            View Details
                          </button>
                        </div>
                        {activity.metadata && (
                          <div className="mt-2 text-xs text-gray-500 bg-gray-50 p-2 rounded-md">
                            {Object.entries(activity.metadata).map(([key, value]) => (
                              <div key={key} className="flex gap-1">
                                <span className="font-medium">{key.split(/(?=[A-Z])/).join(" ").replace(/^\w/, (c) => c.toUpperCase())}:</span>
                                <span>{Array.isArray(value) ? value.join(", ") : value.toString()}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
} 