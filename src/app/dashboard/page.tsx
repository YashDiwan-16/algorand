"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  FiUsers, 
  FiFileText, 
  FiCheckSquare, 
  FiKey, 
  FiActivity, 
  FiArrowRight,
  FiClock,
  FiShield,
  FiInfo,
  FiEye,
  FiLock,
  FiDatabase,
  FiList,
  FiLayers,
  FiRefreshCw,
  FiCheckCircle,
  FiClipboard,
  FiBook
} from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

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

const statCardVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      type: "spring",
      stiffness: 100
    }
  })
};

export default function DashboardPage() {
  const router = useRouter();
  const [isAadhaarConnected, setIsAadhaarConnected] = useState(false);
  const [isDigiLockerConnected, setIsDigiLockerConnected] = useState(false);

  const handleAadhaarVerification = () => {
    // In a real implementation, you would redirect to Aadhaar verification page
    window.open("https://uidai.gov.in/", "_blank");
    // For demo purposes, we'll set connected after a delay
    setTimeout(() => {
      setIsAadhaarConnected(true);
    }, 1000);
  };

  const handleDigiLockerConnect = () => {
    // In a real implementation, you would redirect to DigiLocker
    window.open("https://www.digilocker.gov.in/", "_blank");
    // For demo purposes, we'll set connected after a delay
    setTimeout(() => {
      setIsDigiLockerConnected(true);
    }, 1000);
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8"
    >
      {/* Header with Logo */}
      <motion.div 
        variants={itemVariants}
        className="flex items-center justify-between mb-6"
      >
        <div className="flex items-center">
          <div className="relative h-12 w-48 mr-4">
            <Image 
              src="/logo.png" 
              alt="ConsentManager" 
              fill
              style={{objectFit: "contain"}}
              priority
              className="mr-4"
            />
          </div>
          <div className="h-8 w-px bg-gray-300 mx-3"></div>
          <h1 className="text-2xl font-bold text-black">Self-Sovereign Identity Dashboard</h1>
        </div>
      </motion.div>

      {/* Banner Section */}
      <motion.div 
        variants={itemVariants}
        className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg rounded-xl p-6 text-white"
      >
        <div className="flex items-start md:items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Next-Gen Blockchain-Based Consent Management</h2>
            <p className="text-white text-opacity-90 max-w-3xl">
              Control your digital identity through Aadhaar and DigiLocker integration with Algorand blockchain. 
              Grant, revoke, and audit consent for your data with complete transparency and immutability.
            </p>
          </div>
          <div className="hidden md:block">
            <FiLock size={64} className="text-white text-opacity-20" />
          </div>
        </div>
        <div className="flex mt-6 space-x-4">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 ${isAadhaarConnected ? 'bg-green-500 text-white' : 'bg-white text-blue-700'} rounded-md font-medium flex items-center`}
            onClick={handleAadhaarVerification}
          >
            {isAadhaarConnected ? 'Aadhaar Verified ✓' : 'Verify with Aadhaar'}
            {!isAadhaarConnected && <FiArrowRight className="ml-2" />}
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 ${isDigiLockerConnected ? 'bg-green-500 text-white' : 'bg-blue-500 bg-opacity-30 text-white border border-white border-opacity-30'} rounded-md font-medium`}
            onClick={handleDigiLockerConnect}
          >
            {isDigiLockerConnected ? 'DigiLocker Connected ✓' : 'Link DigiLocker'}
          </motion.button>
        </div>
      </motion.div>

      {/* Contest info and compliance */}
      <motion.div 
        variants={itemVariants}
        className="bg-white border border-gray-200 shadow-sm rounded-xl p-6"
      >
        <h2 className="text-xl font-bold text-black mb-4">Built for Self-Sovereign Identity</h2>
        
        <div className="mb-6 bg-blue-50 border border-blue-100 p-4 rounded-lg">
          <div className="flex items-start">
            <FiInfo className="text-blue-600 mt-1 mr-3 flex-shrink-0" size={20} />
            <p className="text-sm text-black">
              <span className="font-bold">India's Aadhaar and DigiLocker systems</span> provide a foundation for identity verification 
              and document storage. This consent manager leverages these systems in a Web3 context, revolutionizing data sharing by 
              combining decentralized identity management with <span className="font-bold">Algorand blockchain transparency</span>.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { 
              name: 'Active Consents', 
              value: '8', 
              icon: <FiCheckSquare size={20} className="text-green-500" /> 
            },
            { 
              name: 'Data Controllers', 
              value: '5', 
              icon: <FiUsers size={20} className="text-blue-500" /> 
            },
            { 
              name: 'Consent Changes', 
              value: '12', 
              icon: <FiActivity size={20} className="text-orange-500" /> 
            },
            { 
              name: 'Data Categories', 
              value: '3', 
              icon: <FiLayers size={20} className="text-purple-500" /> 
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={statCardVariants}
              whileHover={{ y: -5, scale: 1.03 }}
              className="bg-white border border-gray-200 p-4 rounded-lg transform transition-all duration-200"
            >
              <div className="flex items-center mb-2">
                <div className="p-2 rounded-full bg-gray-50">
                  {stat.icon}
                </div>
                <span className="ml-2 text-sm font-bold text-black">{stat.name}</span>
              </div>
              <div className="text-3xl font-black text-black">{stat.value}</div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-4 bg-white border border-gray-200 p-4 rounded-lg flex items-start"
          whileHover={{ scale: 1.01 }}
        >
          <FiInfo className="text-indigo-600 mt-1 mr-3 flex-shrink-0" size={20} />
          <p className="text-sm text-black font-semibold">
            Your data is stored securely on Algorand blockchain using zero-knowledge proofs to protect your privacy.
            All active consents are managed through smart contracts, giving you full control.
          </p>
        </motion.div>
      </motion.div>

      {/* Consent Controls */}
      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {[
          { 
            title: "Grant & Revoke Consent", 
            description: "Control who can access your sensitive information and documents", 
            color: "bg-blue-50 border-blue-200", 
            textColor: "text-blue-700",
            icon: FiCheckCircle,
            iconBg: "bg-blue-100",
            link: "/dashboard/consents"
          },
          { 
            title: "DigiLocker Documents", 
            description: "Access and selectively share your verified documents with ZKPs", 
            color: "bg-purple-50 border-purple-200", 
            textColor: "text-purple-700",
            icon: FiFileText,
            iconBg: "bg-purple-100",
            link: "/dashboard/documents"
          },
          { 
            title: "Consent Audit Trail", 
            description: "View immutable blockchain record of all consent activities", 
            color: "bg-emerald-50 border-emerald-200", 
            textColor: "text-emerald-700",
            icon: FiActivity,
            iconBg: "bg-emerald-100",
            link: "/dashboard/history404"
          },
        ].map((action, index) => (
          <motion.div 
            key={index} 
            className={`border rounded-xl p-6 ${action.color}`}
            whileHover={{ 
              y: -5, 
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
            }}
          >
            <div className={`w-12 h-12 ${action.iconBg} rounded-lg flex items-center justify-center mb-4`}>
              <action.icon className={action.textColor} size={24} />
            </div>
            <h3 className={`text-lg font-bold mb-2 text-black`}>{action.title}</h3>
            <p className="text-gray-800 text-sm mb-4">{action.description}</p>
            <Link href={action.link}>
              <motion.button 
                className={`px-4 py-2 rounded-md text-sm font-medium ${action.textColor} bg-white hover:bg-gray-50 shadow-sm flex items-center`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Manage
                <FiArrowRight className="ml-2" size={14} />
              </motion.button>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Compliance and Regulations */}
      <motion.div 
        variants={itemVariants}
        className="bg-white border border-gray-200 shadow-sm rounded-xl p-6"
      >
        <h3 className="text-xl font-bold text-black mb-4">Regulatory Compliance</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {[
            { 
              title: "GDPR Compliant",
              description: "Adheres to European data protection standards",
              icon: FiShield,
              color: "text-blue-600"
            },
            { 
              title: "India's Data Protection",
              description: "Follows guidelines in India's Data Protection Bill",
              icon: FiLock,
              color: "text-green-600"
            },
            { 
              title: "Self-Sovereign Identity",
              description: "Aligned with SSI principles for user control",
              icon: FiKey,
              color: "text-purple-600"
            },
          ].map((item, index) => (
            <div key={index} className="flex items-start p-4 border border-gray-100 rounded-lg">
              <div className={`p-2 rounded-full bg-gray-50 mr-3 ${item.color}`}>
                <item.icon size={18} />
              </div>
              <div>
                <h4 className="font-bold text-black">{item.title}</h4>
                <p className="text-sm text-gray-700">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recent activity */}
      <motion.div 
        variants={itemVariants}
        className="bg-white border border-gray-200 shadow-sm rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-black">Recent Activity</h3>
          <Link 
            href="/dashboard/history404"
            className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center"
          >
            View all
            <FiArrowRight className="ml-1" size={14} />
          </Link>
        </div>
        <div className="space-y-5">
          {[
            { 
              user: "Rajesh Kumar", 
              initials: "RK",
              action: "granted consent for", 
              target: "KYC Document Access", 
              time: "10 minutes ago",
              color: "bg-blue-500"
            },
            { 
              user: "Sunita Patel", 
              initials: "SP",
              action: "revoked consent from", 
              target: "HDFC Bank", 
              time: "2 hours ago",
              color: "bg-red-500"
            },
            { 
              user: "Amit Sharma", 
              initials: "AS",
              action: "shared DigiLocker document with", 
              target: "Income Tax Department", 
              time: "Yesterday at 15:30",
              color: "bg-green-500"
            },
            { 
              user: "Priya Gupta", 
              initials: "PG",
              action: "updated consent duration for", 
              target: "Aadhar-linked Bank Account", 
              time: "Yesterday at 10:15",
              color: "bg-purple-500"
            },
          ].map((activity, index) => (
            <motion.div 
              key={index} 
              className="flex items-start pb-4 border-b border-gray-200 last:border-0 last:pb-0"
              whileHover={{ x: 2, backgroundColor: "#F9FAFB" }}
            >
              <div className={`h-10 w-10 rounded-full ${activity.color} flex items-center justify-center text-sm font-medium text-white`}>
                {activity.initials}
              </div>
              <div className="ml-3 flex-grow">
                <p className="text-black">
                  <span className="font-bold">{activity.user}</span>{" "}
                  <span className="text-gray-700">{activity.action}</span>{" "}
                  <span className="font-bold">{activity.target}</span>
                </p>
                <p className="text-xs text-gray-600 mt-1">{activity.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Your Data Protection */}
      <motion.div 
        variants={itemVariants}
        className="bg-white border border-gray-200 rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-black">Your Data Protection</h3>
          <div className="flex items-center text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
            <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
            <span className="text-sm font-medium">Secure</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center justify-between border border-gray-100 rounded-md p-3">
            <span className="text-black font-medium">Aadhaar Verification</span>
            <span className="flex items-center text-emerald-600">
              <span className={`w-2 h-2 ${isAadhaarConnected ? 'bg-emerald-500' : 'bg-gray-300'} rounded-full mr-2`}></span>
              {isAadhaarConnected ? 'Verified' : 'Not Verified'}
            </span>
          </div>
          <div className="flex items-center justify-between border border-gray-100 rounded-md p-3">
            <span className="text-black font-medium">DigiLocker Integration</span>
            <span className="flex items-center text-emerald-600">
              <span className={`w-2 h-2 ${isDigiLockerConnected ? 'bg-emerald-500' : 'bg-gray-300'} rounded-full mr-2`}></span>
              {isDigiLockerConnected ? 'Connected' : 'Not Connected'}
            </span>
          </div>
          <div className="flex items-center justify-between border border-gray-100 rounded-md p-3">
            <span className="text-black font-medium">Algorand Blockchain</span>
            <span className="flex items-center text-emerald-600">
              <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
              Connected
            </span>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <Link 
            href="/dashboard/security"
            className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center"
          >
            Security settings
            <FiArrowRight className="ml-1" size={14} />
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
} 