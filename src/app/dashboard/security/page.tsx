"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiShield,
  FiAlertTriangle,
  FiCheckCircle,
  FiLock,
  FiKey,
  FiEye,
  FiEyeOff,
  FiRefreshCw,
  FiUsers,
  FiServer,
  FiDatabase,
  FiBarChart2,
  FiDownload,
  FiSettings,
  FiInfo,
  FiFileText
} from "react-icons/fi";

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

// Demo security stats
const securityStats = [
  { title: "Security Score", value: "92%", icon: FiBarChart2, color: "bg-emerald-500", change: "+5%" },
  { title: "Active Sessions", value: "48", icon: FiUsers, color: "bg-blue-500", change: "+12%" },
  { title: "Blockchain Nodes", value: "5", icon: FiServer, color: "bg-indigo-500", change: "Stable" },
  { title: "Encrypted Consents", value: "324", icon: FiLock, color: "bg-purple-500", change: "+18%" }
];

// Demo security alerts
const securityAlerts = [
  {
    id: "alert-001",
    type: "critical",
    title: "Multiple Failed Login Attempts",
    description: "Multiple failed login attempts detected for user account 'rajesh.kumar@example.com'",
    timestamp: "2023-07-15T10:45:00Z",
    status: "active",
    actions: ["block_ip", "force_password_reset"]
  },
  {
    id: "alert-002",
    type: "warning",
    title: "Unusual Access Pattern",
    description: "Unusual document access pattern detected for user 'sunita.gupta@example.com'",
    timestamp: "2023-07-15T08:30:00Z",
    status: "active",
    actions: ["investigate", "monitor"]
  },
  {
    id: "alert-003",
    type: "info",
    title: "System Update Required",
    description: "Security update available for consent management system",
    timestamp: "2023-07-14T15:20:00Z",
    status: "pending",
    actions: ["update", "schedule"]
  },
  {
    id: "alert-004",
    type: "resolved",
    title: "Suspicious IP Detected",
    description: "Access from unrecognized IP address for admin account",
    timestamp: "2023-07-13T14:10:00Z",
    status: "resolved",
    resolvedAt: "2023-07-13T14:45:00Z",
    actions: []
  }
];

// Security compliance statuses
const complianceStatuses = [
  {
    id: "compliance-001",
    title: "Data Encryption",
    description: "All data at rest and in transit is encrypted",
    status: "compliant",
    lastChecked: "2023-07-15T09:00:00Z",
    standard: "ISO 27001, GDPR"
  },
  {
    id: "compliance-002",
    title: "Two-Factor Authentication",
    description: "Admin accounts require 2FA",
    status: "compliant",
    lastChecked: "2023-07-15T09:00:00Z",
    standard: "NIST"
  },
  {
    id: "compliance-003",
    title: "Audit Logging",
    description: "All system actions are logged and auditable",
    status: "compliant",
    lastChecked: "2023-07-15T09:00:00Z",
    standard: "SOC 2, GDPR"
  },
  {
    id: "compliance-004",
    title: "Data Protection Impact Assessment",
    description: "DPIA conducted and documented",
    status: "attention",
    lastChecked: "2023-07-15T09:00:00Z",
    standard: "GDPR Article 35",
    attention: "Review needed in 15 days"
  },
  {
    id: "compliance-005",
    title: "Vulnerability Scanning",
    description: "Regular scanning of system components",
    status: "compliant",
    lastChecked: "2023-07-15T09:00:00Z",
    standard: "ISO 27001, SOC 2"
  },
  {
    id: "compliance-006",
    title: "Data Retention Policy",
    description: "Automated data deletion based on policy",
    status: "compliant",
    lastChecked: "2023-07-15T09:00:00Z",
    standard: "GDPR, India Data Protection Bill"
  }
];

export default function SecurityPage() {
  const [showApiKeys, setShowApiKeys] = useState(false);
  const [selectedSection, setSelectedSection] = useState("overview");

  // Format timestamp
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(date);
  };

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
          <h1 className="text-2xl font-bold text-gray-900">Security Dashboard</h1>
          <p className="text-gray-600">Monitor and manage system security</p>
        </div>
        <div className="flex gap-3">
          <button
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FiDownload className="mr-2" />
            Security Report
          </button>
          <button
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FiSettings className="mr-2" />
            Security Settings
          </button>
        </div>
      </motion.div>

      {/* Navigation Tabs */}
      <motion.div variants={itemVariants} className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: "overview", name: "Overview", icon: FiShield },
            { id: "alerts", name: "Alerts", icon: FiAlertTriangle },
            { id: "compliance", name: "Compliance", icon: FiCheckCircle },
            { id: "keys", name: "API Keys", icon: FiKey },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedSection(tab.id)}
              className={`
                group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm
                ${selectedSection === tab.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}
              `}
            >
              <tab.icon
                className={`mr-2 h-5 w-5 ${
                  selectedSection === tab.id ? "text-blue-500" : "text-gray-400 group-hover:text-gray-500"
                }`}
              />
              {tab.name}
            </button>
          ))}
        </nav>
      </motion.div>

      {/* Overview Section */}
      {selectedSection === "overview" && (
        <>
          {/* Stats */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {securityStats.map((stat, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow border border-gray-200">
                <div className={`w-12 h-12 rounded-full ${stat.color} text-white flex items-center justify-center mb-3`}>
                  <stat.icon size={20} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{stat.title}</h3>
                <div className="flex items-center justify-between">
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <span className={`text-sm font-medium ${
                    stat.change === 'Stable' ? 'text-gray-500' : 
                    stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Security Summary */}
          <motion.div variants={itemVariants} className="bg-white rounded-lg shadow overflow-hidden border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">System Security Overview</h3>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <FiDatabase className="text-indigo-500 mr-2" size={20} />
                    <h4 className="font-medium text-gray-900">Blockchain Security</h4>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <FiCheckCircle className="text-green-500 mr-2" size={16} />
                      All consent transactions recorded on Algorand blockchain
                    </li>
                    <li className="flex items-center">
                      <FiCheckCircle className="text-green-500 mr-2" size={16} />
                      Zero-knowledge proofs for privacy preservation
                    </li>
                    <li className="flex items-center">
                      <FiCheckCircle className="text-green-500 mr-2" size={16} />
                      5 active validator nodes in consensus
                    </li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <FiFileText className="text-blue-500 mr-2" size={20} />
                    <h4 className="font-medium text-gray-900">Document Security</h4>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <FiCheckCircle className="text-green-500 mr-2" size={16} />
                      End-to-end encryption of all DigiLocker documents
                    </li>
                    <li className="flex items-center">
                      <FiCheckCircle className="text-green-500 mr-2" size={16} />
                      Selective disclosure via cryptographic credentials
                    </li>
                    <li className="flex items-center">
                      <FiCheckCircle className="text-green-500 mr-2" size={16} />
                      Tamper-evident document verification
                    </li>
                  </ul>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <FiUsers className="text-emerald-500 mr-2" size={20} />
                  <h4 className="font-medium text-gray-900">User Security</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div>
                    <h5 className="font-medium text-gray-800 mb-2">Authentication</h5>
                    <ul className="space-y-1">
                      <li className="flex items-center">
                        <FiCheckCircle className="text-green-500 mr-2" size={14} />
                        Aadhaar biometric verification
                      </li>
                      <li className="flex items-center">
                        <FiCheckCircle className="text-green-500 mr-2" size={14} />
                        Multifactor authentication
                      </li>
                      <li className="flex items-center">
                        <FiCheckCircle className="text-green-500 mr-2" size={14} />
                        DigiLocker secure integration
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-800 mb-2">Privacy</h5>
                    <ul className="space-y-1">
                      <li className="flex items-center">
                        <FiCheckCircle className="text-green-500 mr-2" size={14} />
                        Consent-based data sharing
                      </li>
                      <li className="flex items-center">
                        <FiCheckCircle className="text-green-500 mr-2" size={14} />
                        Anonymized analytics
                      </li>
                      <li className="flex items-center">
                        <FiCheckCircle className="text-green-500 mr-2" size={14} />
                        Data minimization principles
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-800 mb-2">Access Control</h5>
                    <ul className="space-y-1">
                      <li className="flex items-center">
                        <FiCheckCircle className="text-green-500 mr-2" size={14} />
                        Role-based permissions
                      </li>
                      <li className="flex items-center">
                        <FiCheckCircle className="text-green-500 mr-2" size={14} />
                        Automatic session expiry
                      </li>
                      <li className="flex items-center">
                        <FiCheckCircle className="text-green-500 mr-2" size={14} />
                        IP-based restrictions
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}

      {/* Alerts Section */}
      {selectedSection === "alerts" && (
        <motion.div variants={itemVariants} className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
          <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Security Alerts</h3>
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center">
              <FiRefreshCw className="mr-1" size={14} />
              Refresh Alerts
            </button>
          </div>
          <div className="divide-y divide-gray-200">
            {securityAlerts.map((alert) => (
              <div key={alert.id} className={`p-4 ${
                alert.status === 'resolved' ? 'bg-gray-50' : 
                alert.type === 'critical' ? 'bg-red-50' :
                alert.type === 'warning' ? 'bg-yellow-50' : 'bg-blue-50'
              }`}>
                <div className="flex items-start gap-4">
                  <div className={`rounded-full p-2 ${
                    alert.status === 'resolved' ? 'bg-gray-100 text-gray-500' : 
                    alert.type === 'critical' ? 'bg-red-100 text-red-500' :
                    alert.type === 'warning' ? 'bg-yellow-100 text-yellow-500' : 'bg-blue-100 text-blue-500'
                  }`}>
                    {alert.status === 'resolved' ? (
                      <FiCheckCircle size={18} />
                    ) : alert.type === 'critical' ? (
                      <FiAlertTriangle size={18} />
                    ) : alert.type === 'warning' ? (
                      <FiAlertTriangle size={18} />
                    ) : (
                      <FiInfo size={18} />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className={`font-medium ${
                        alert.status === 'resolved' ? 'text-gray-700' : 
                        alert.type === 'critical' ? 'text-red-700' :
                        alert.type === 'warning' ? 'text-yellow-700' : 'text-blue-700'
                      }`}>{alert.title}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        alert.status === 'resolved' ? 'bg-gray-200 text-gray-800' : 
                        alert.status === 'active' ? 'bg-red-200 text-red-800' : 'bg-yellow-200 text-yellow-800'
                      }`}>
                        {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-gray-600 mt-1">{alert.description}</p>
                    <div className="mt-2 flex justify-between items-center text-sm">
                      <span className="text-gray-500">
                        {alert.status === 'resolved' ? `Resolved: ${formatTimestamp(alert.resolvedAt!)}` : formatTimestamp(alert.timestamp)}
                      </span>
                      {alert.status !== 'resolved' && alert.actions.length > 0 && (
                        <div className="flex gap-2">
                          {alert.actions.map((action) => (
                            <button
                              key={action}
                              className="px-2 py-1 text-xs font-medium rounded bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                            >
                              {action.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Compliance Section */}
      {selectedSection === "compliance" && (
        <motion.div variants={itemVariants} className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-lg font-medium text-gray-900">Compliance Status</h3>
          </div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {complianceStatuses.map((item) => (
              <div key={item.id} className="border rounded-lg overflow-hidden">
                <div className={`p-3 flex justify-between items-center ${
                  item.status === 'compliant' ? 'bg-green-50 border-b border-green-100' : 'bg-yellow-50 border-b border-yellow-100'
                }`}>
                  <h4 className="font-medium text-gray-900">{item.title}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    item.status === 'compliant' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {item.status === 'compliant' ? 'Compliant' : 'Needs Attention'}
                  </span>
                </div>
                <div className="p-3">
                  <p className="text-sm text-gray-600">{item.description}</p>
                  <div className="mt-2 flex justify-between text-xs text-gray-500">
                    <div>
                      <span className="font-medium">Standards:</span> {item.standard}
                    </div>
                    <div>
                      <span className="font-medium">Last checked:</span> {formatTimestamp(item.lastChecked)}
                    </div>
                  </div>
                  {item.attention && (
                    <div className="mt-2 text-xs text-yellow-600 bg-yellow-50 p-2 rounded">
                      <FiAlertTriangle className="inline mr-1" size={12} />
                      {item.attention}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* API Keys Section */}
      {selectedSection === "keys" && (
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-gray-900">API Keys</h3>
              <button
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <FiKey className="mr-2" />
                Generate New Key
              </button>
            </div>

            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Key Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">API Key</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Used</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                    { id: "key-1", name: "Production API Key", key: "ap1_k3y_1234567890abcdef", created: "2023-05-10T10:00:00Z", lastUsed: "2023-07-15T08:45:00Z", status: "active" },
                    { id: "key-2", name: "Development API Key", key: "ap1_k3y_0987654321fedcba", created: "2023-06-20T14:30:00Z", lastUsed: "2023-07-14T16:20:00Z", status: "active" },
                    { id: "key-3", name: "Testing API Key", key: "ap1_k3y_abcdef1234567890", created: "2023-07-05T09:15:00Z", lastUsed: "2023-07-13T11:10:00Z", status: "active" },
                    { id: "key-4", name: "Deprecated API Key", key: "ap1_k3y_fedcba0987654321", created: "2023-04-15T08:00:00Z", lastUsed: "2023-06-30T12:45:00Z", status: "revoked" }
                  ].map((apiKey) => (
                    <tr key={apiKey.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {apiKey.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <span className="font-mono">
                            {showApiKeys ? apiKey.key : apiKey.key.substring(0, 8) + "••••••••••••••"}
                          </span>
                          <button
                            onClick={() => setShowApiKeys(!showApiKeys)}
                            className="ml-2 text-gray-400 hover:text-gray-500"
                          >
                            {showApiKeys ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatTimestamp(apiKey.created)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatTimestamp(apiKey.lastUsed)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          apiKey.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {apiKey.status.charAt(0).toUpperCase() + apiKey.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">Copy</button>
                          {apiKey.status === 'active' ? (
                            <button className="text-red-600 hover:text-red-900">Revoke</button>
                          ) : (
                            <button className="text-red-600 hover:text-red-900">Delete</button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">API Documentation</h3>
            <p className="text-sm text-gray-600 mb-4">
              Use these API keys to securely interact with the Consent Management API. Our RESTful API allows you to programmatically manage consents, verify identities, and access documents with proper authorization.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: "Authentication", description: "Learn how to authenticate API requests", icon: FiLock },
                { title: "Consent Endpoints", description: "Manage consents programmatically", icon: FiShield },
                { title: "Identity Verification", description: "Verify Aadhaar and DigiLocker identities", icon: FiUsers }
              ].map((doc, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center mb-2">
                    <doc.icon className="text-blue-500 mr-2" size={18} />
                    <h4 className="font-medium text-gray-900">{doc.title}</h4>
                  </div>
                  <p className="text-sm text-gray-600">{doc.description}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
} 