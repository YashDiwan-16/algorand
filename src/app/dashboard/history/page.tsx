'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiClock, 
  FiDownload, 
  FiFilter, 
  FiSearch, 
  FiCalendar,
  FiCheckCircle, 
  FiXCircle, 
  FiFileText,
  FiExternalLink,
  FiShare2,
  FiPrinter,
  FiChevronDown,
  FiBarChart2,
  FiDatabase,
  FiUser,
  FiShield,
  FiInfo,
  FiBox,
  FiHeart,
  FiVideo,
  FiTag,
  FiX,
  FiChevronUp,
  FiCheck
} from 'react-icons/fi';
import { useWallet } from '@/providers/WalletContext';
import ConnectWallet from '@/components/ConnectWallet';
import Link from 'next/link';
import Image from 'next/image';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Sample history data
const historyData = [
  {
    id: 'event-001',
    type: 'consent_granted',
    title: 'Consent Granted to DigiLocker',
    description: 'You granted consent to access your Aadhaar-verified identity from DigiLocker via Pera Wallet',
    organization: 'DigiLocker',
    date: '2025-04-28T14:32:11',
    icon: <FiCheckCircle className="text-green-600" />,
    category: 'identity',
    verifiedByAadhaar: true,
    txHash: '0xb7d20e23f80f4c927881e2d9fd775d1be6d7ddcfcde7d0dd67df287225543985',
    blockchainVerified: true,
    walletType: 'Pera Wallet'
  },
  {
    id: 'event-002',
    type: 'consent_granted',
    title: 'Consent Granted to HDFC Bank',
    description: 'You granted consent for HDFC Bank to access your PAN Card details via Pera Wallet',
    organization: 'HDFC Bank',
    date: '2025-04-28T09:15:43',
    icon: <FiCheckCircle className="text-green-600" />,
    category: 'financial',
    verifiedByAadhaar: true,
    txHash: '0xa1de6c6d7bd88dd2b4f87268c9be5c8a8f3be6d18e1dfd7dd4ae4e9e4a7a9b9e',
    blockchainVerified: true,
    walletType: 'Pera Wallet'
  },
  {
    id: 'event-003',
    type: 'consent_revoked',
    title: 'Consent Revoked from Flipkart',
    description: 'You revoked consent for Flipkart to access your delivery address via Pera Wallet',
    organization: 'Flipkart',
    date: '2025-04-27T16:05:22',
    icon: <FiXCircle className="text-red-600" />,
    category: 'shopping',
    verifiedByAadhaar: false,
    txHash: '0xc3f6d8b9edb0c3f3f2d7a9e8d5d2f3a1d2f3a4d5f6a7d8a9e8d7a6f5d4a3d2f1',
    blockchainVerified: true,
    walletType: 'Pera Wallet'
  },
  {
    id: 'event-004',
    type: 'document_accessed',
    title: 'Document Accessed by Apollo Hospitals',
    description: 'Apollo Hospitals accessed your health records via DigiLocker and Pera Wallet',
    organization: 'Apollo Hospitals',
    date: '2025-04-27T11:22:56',
    icon: <FiFileText className="text-blue-600" />,
    category: 'health',
    verifiedByAadhaar: true,
    txHash: '0xd4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5',
    blockchainVerified: true,
    walletType: 'Pera Wallet'
  },
  {
    id: 'event-005',
    type: 'identity_verified',
    title: 'Identity Verified with Aadhaar',
    description: 'Your identity was verified using Aadhaar e-KYC integration via Pera Wallet',
    organization: 'UIDAI',
    date: '2025-04-26T10:08:33',
    icon: <FiUser className="text-purple-600" />,
    category: 'identity',
    verifiedByAadhaar: true,
    txHash: '0xe5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6',
    blockchainVerified: true,
    walletType: 'Pera Wallet'
  },
  {
    id: 'event-006',
    type: 'document_added',
    title: 'Document Added to DigiLocker',
    description: 'You added your PAN Card to your DigiLocker verified documents via Pera Wallet',
    organization: 'Income Tax Department',
    date: '2025-04-26T14:30:11',
    icon: <FiFileText className="text-green-600" />,
    category: 'document',
    verifiedByAadhaar: true,
    txHash: '0xf6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7',
    blockchainVerified: true,
    walletType: 'Pera Wallet'
  },
  {
    id: 'event-007',
    type: 'consent_granted',
    title: 'Consent Granted to Income Tax Portal',
    description: 'You granted consent to Income Tax Portal to access your DigiLocker PAN Card via Pera Wallet',
    organization: 'Income Tax Department',
    date: '2025-04-25T09:15:29',
    icon: <FiCheckCircle className="text-green-600" />,
    category: 'financial',
    verifiedByAadhaar: true,
    txHash: '0xa7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8',
    blockchainVerified: true,
    walletType: 'Pera Wallet'
  },
  {
    id: 'event-008',
    type: 'consent_expired',
    title: 'Consent Expired for Hotstar',
    description: 'Your consent for Hotstar to access your billing information has expired, recorded via Pera Wallet',
    organization: 'Hotstar',
    date: '2025-04-24T23:59:59',
    icon: <FiClock className="text-yellow-600" />,
    category: 'entertainment',
    verifiedByAadhaar: false,
    txHash: '0xb8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9',
    blockchainVerified: true,
    walletType: 'Pera Wallet'
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      duration: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

const logoVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.5, 
      type: "spring", 
      stiffness: 100 
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

// Format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).format(date);
};

// Data sharing stats
const dataStats = [
  { name: 'Active Consents', value: 324, icon: <FiCheckCircle className="text-green-500" /> },
  { name: 'Pending Approvals', value: 18, icon: <FiClock className="text-orange-500" /> },
  { name: 'Total Users', value: 952, icon: <FiUser className="text-blue-500" /> },
  { name: 'Security Score', value: '97%', icon: <FiShield className="text-purple-500" /> },
];

// Recent activity data
const recentActivity = [
  { 
    id: 'act-001', 
    initials: 'RK', 
    name: 'Rajesh Kumar', 
    action: 'granted consent for Data Processing via Pera Wallet', 
    time: '10 minutes ago',
    color: 'bg-blue-500' 
  },
  { 
    id: 'act-002', 
    initials: 'SP', 
    name: 'Sunita Patel', 
    action: 'revoked consent for Marketing Communications via Pera Wallet', 
    time: '2 hours ago',
    color: 'bg-red-500' 
  },
  { 
    id: 'act-003', 
    initials: 'AS', 
    name: 'Amit Sharma', 
    action: 'updated consent for Cookie Usage via Pera Wallet', 
    time: 'Yesterday at 15:30',
    color: 'bg-green-500' 
  },
  { 
    id: 'act-004', 
    initials: 'PG', 
    name: 'Priya Gupta', 
    action: 'requested approval for API Access via Pera Wallet', 
    time: 'Yesterday at 10:15',
    color: 'bg-purple-500' 
  },
];

// Category badges
const getCategoryBadge = (category) => {
  const categories = {
    identity: { color: 'bg-purple-100 text-purple-800', icon: <FiUser className="mr-1" /> },
    financial: { color: 'bg-green-100 text-green-800', icon: <FiBarChart2 className="mr-1" /> },
    shopping: { color: 'bg-orange-100 text-orange-800', icon: <FiBox className="mr-1" /> },
    health: { color: 'bg-red-100 text-red-800', icon: <FiHeart className="mr-1" /> },
    document: { color: 'bg-blue-100 text-blue-800', icon: <FiFileText className="mr-1" /> },
    entertainment: { color: 'bg-pink-100 text-pink-800', icon: <FiVideo className="mr-1" /> }
  };

  return categories[category] || { color: 'bg-gray-100 text-gray-800', icon: <FiTag className="mr-1" /> };
};

// Export to PDF
const exportToPDF = async (filteredData) => {
  try {
    // Dynamic import for client-side only libraries
    await import('jspdf-autotable');
    
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text('Consent and Document Activity History', 14, 20);
    
    // Add timestamp
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })}`, 14, 30);
    
    // Add verification info
    doc.setFontSize(10);
    doc.text('Verified with Aadhaar & DigiLocker integration', 14, 40);
    doc.text('Secured by Algorand blockchain', 14, 45);
    
    // Prepare table data
    const tableData = filteredData.map(item => [
      formatDate(item.date),
      item.type.charAt(0).toUpperCase() + item.type.slice(1),
      item.title,
      item.organization,
      item.description,
      item.verifiedByAadhaar ? <FiCheck className="text-green-500" /> : <FiX className="text-red-500" />,
      item.blockchainVerified ? <FiCheck className="text-green-500" /> : <FiX className="text-red-500" />
    ]);
    
    // Add table
    (doc as any).autoTable({
      head: [['Date', 'Type', 'Title', 'Organization', 'Description', 'Aadhaar Verified', 'Blockchain Verified']],
      body: tableData,
      startY: 50,
      theme: 'grid',
      styles: {
        textColor: [0, 0, 0],
        fontSize: 8
      },
      headStyles: {
        fillColor: [200, 200, 200],
        textColor: [0, 0, 0],
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240]
      }
    });
    
    // Save the PDF
    doc.save('consent-history.pdf');
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Could not generate PDF. Please try again later.');
  }
};

// CSV export function (mock)
const exportToCsv = (filteredData) => {
  alert('Exporting to CSV: ' + filteredData.length + ' records would be exported in a production environment');
};

// Print function (mock)
const printHistory = (filteredData) => {
  alert('Printing: ' + filteredData.length + ' records would be sent to printer in a production environment');
};

export default function HistoryPage() {
  const { walletInfo } = useWallet();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [detailEvent, setDetailEvent] = useState(null);
  const [exportMenuOpen, setExportMenuOpen] = useState(false);
  const exportMenuRef = useRef(null);
  const [processingTx, setProcessingTx] = useState(true);

  // Simulate processing transaction on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setProcessingTx(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle click outside export menu
  useEffect(() => {
    function handleClickOutside(event) {
      if (exportMenuRef.current && !exportMenuRef.current.contains(event.target)) {
        setExportMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filter data based on search term, category, and date range
  const filteredData = historyData.filter(item => {
    const matchesSearch = 
      searchTerm === '' || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.organization.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    
    let matchesDate = true;
    const itemDate = new Date(item.date);
    const now = new Date();
    
    if (dateRange === 'today') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      matchesDate = itemDate >= today;
    } else if (dateRange === 'week') {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      matchesDate = itemDate >= weekAgo;
    } else if (dateRange === 'month') {
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      matchesDate = itemDate >= monthAgo;
    }
    
    return matchesSearch && matchesCategory && matchesDate;
  });

  // Unique categories for filter
  const categories = ['all', ...new Set(historyData.map(item => item.category))];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {!walletInfo ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-xl text-center max-w-2xl mx-auto mt-12 shadow-md"
        >
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiClock className="text-blue-600 text-2xl" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Connect Your Pera Wallet</h2>
          <p className="text-gray-800 mb-6">You need to connect your Pera Wallet to access your consent history and manage permissions.</p>
          <ConnectWallet />
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Logo and Header Bar */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-between mb-6"
          >
            <motion.div 
              variants={logoVariants}
              className="flex items-center"
            >
              <Image 
                src="/logo.png" 
                alt="ConsentManager" 
                width={150} 
                height={40}
                className="h-8 w-auto mr-4"
              />
              <div className="h-6 w-px bg-gray-300 mx-3"></div>
              <h2 className="text-xl font-bold text-gray-800">Consent History</h2>
            </motion.div>
          </motion.div>

          {/* AlgoBharat Hack Series Banner */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
            className="bg-gradient-to-r from-indigo-700 to-blue-600 p-4 rounded-lg shadow-lg mb-6 text-white"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FiShield className="text-white mr-3 text-2xl" />
                <h2 className="text-lg font-bold">AlgoBharat Hack Series #1 - April 2025</h2>
              </div>
              <Link href="/roadmap" className="text-white hover:underline text-sm flex items-center">
                <span>View Roadmap</span>
                <FiExternalLink className="ml-1" />
              </Link>
            </div>
            <p className="text-white text-sm mt-1 opacity-90">
              Blockchain-powered consent management system with Pera Wallet, Aadhaar and DigiLocker integration
            </p>
          </motion.div>

          {/* Processing Transaction Notification */}
          {processingTx && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg shadow-sm"
            >
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="inline-block relative">
                    <div className="animate-spin h-5 w-5 border-2 border-yellow-500 border-t-transparent rounded-full"></div>
                  </div>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">Processing Transaction</h3>
                  <div className="mt-1 text-sm text-yellow-700">
                    <p>Your recent Pera Wallet transaction is being recorded on the Algorand blockchain. This should take only a few seconds.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Consent History</h1>
              <p className="text-gray-800">Track all your consent activities and data access events</p>
            </div>
            
            <div className="relative" ref={exportMenuRef}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 flex items-center transition-colors duration-200"
                onClick={() => setExportMenuOpen(!exportMenuOpen)}
              >
                <FiDownload className="mr-2" />
                Export
                <FiChevronDown className="ml-2" />
              </motion.button>
              
              <AnimatePresence>
                {exportMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10"
                  >
                    <div className="py-1">
                      <motion.button 
                        whileHover={{ backgroundColor: "#f3f4f6" }}
                        className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center"
                        onClick={() => exportToPDF(filteredData)}
                      >
                        <FiFileText className="mr-2 text-red-500" />
                        Export as PDF
                      </motion.button>
                      <motion.button 
                        whileHover={{ backgroundColor: "#f3f4f6" }}
                        className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center"
                        onClick={() => exportToCsv(filteredData)}
                      >
                        <FiDatabase className="mr-2 text-green-500" />
                        Export as CSV
                      </motion.button>
                      <motion.button 
                        whileHover={{ backgroundColor: "#f3f4f6" }}
                        className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center"
                        onClick={() => printHistory(filteredData)}
                      >
                        <FiPrinter className="mr-2 text-blue-500" />
                        Print History
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Filters */}
          <motion.div 
            variants={itemVariants} 
            whileHover={{ y: -2 }}
            className="bg-white p-4 rounded-lg shadow-sm flex flex-col md:flex-row gap-4 items-center"
          >
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-500" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                placeholder="Search in history..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex items-center">
                <FiFilter className="text-gray-500 mr-2" />
                <select
                  className="block w-40 py-2 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center">
                <FiCalendar className="text-gray-500 mr-2" />
                <select
                  className="block w-40 py-2 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">Last 7 Days</option>
                  <option value="month">Last 30 Days</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Privacy Overview */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -3 }}
            className="bg-white rounded-lg shadow-md p-6 mt-6"
          >
            <h2 className="text-xl font-bold mb-4 text-black">Your Privacy Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {dataStats.map((stat, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={statCardVariants}
                  whileHover={{ y: -5, scale: 1.03 }}
                  className="bg-white border border-gray-200 p-4 rounded-lg transform transition-all duration-200"
                >
                  <div className="flex items-center mb-2">
                    {stat.icon}
                    <span className="ml-2 text-sm font-bold text-black">{stat.name}</span>
                  </div>
                  <div className="text-3xl font-black text-black">{stat.value}</div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="mt-6 bg-white border border-gray-200 p-4 rounded-lg flex items-start"
              whileHover={{ scale: 1.01 }}
            >
              <FiInfo className="text-indigo-600 mt-1 mr-3 flex-shrink-0" />
              <p className="text-sm text-black font-semibold">
                Your data is stored securely on Algorand blockchain using your Pera Wallet signatures and zero-knowledge proofs.
                All active consents are managed through smart contracts, giving you full control over your personal data.
              </p>
            </motion.div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-lg shadow-sm p-6 mt-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-black">Recent Activity</h2>
              <Link href="/dashboard/history" className="text-sm font-medium text-blue-600 hover:text-blue-800">
                View all
              </Link>
            </div>
            
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <motion.div 
                  key={activity.id}
                  whileHover={{ x: 2, backgroundColor: "#F9FAFB" }}
                  className="flex items-center p-2 rounded-lg cursor-pointer border-b border-gray-200 pb-3"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${activity.color}`}>
                    <span className="font-medium">{activity.initials}</span>
                  </div>
                  <div className="ml-3 flex-grow">
                    <p className="text-black">
                      <span className="font-bold">{activity.name}</span> {activity.action}
                    </p>
                    <p className="text-xs text-gray-600 mt-0.5">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* History List */}
          {filteredData.length === 0 ? (
            <motion.div 
              variants={itemVariants}
              className="bg-white rounded-lg shadow-sm p-8 text-center"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiClock className="text-gray-400 text-2xl" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No history records found</h3>
              <p className="text-gray-700">Try adjusting your search or filter criteria</p>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {filteredData.map((event, index) => (
                <motion.div
                  key={event.id}
                  custom={index}
                  variants={itemVariants}
                  whileHover={{ y: -3, boxShadow: '0 6px 15px rgba(0,0,0,0.1)' }}
                  whileTap={{ scale: 0.99 }}
                  className="bg-white rounded-lg shadow-sm p-5 cursor-pointer transition-all"
                  onClick={() => setDetailEvent(event)}
                >
                  <div className="flex items-start">
                    <motion.div 
                      className="p-2 rounded-full bg-gray-100 flex-shrink-0"
                      whileHover={{ scale: 1.1, backgroundColor: "#EEF2FF" }}
                    >
                      {event.icon}
                    </motion.div>
                    <div className="ml-4 flex-grow">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <h3 className="font-semibold text-gray-900">{event.title}</h3>
                        <div className="text-sm text-gray-600">{formatDate(event.date)}</div>
                      </div>
                      <p className="text-gray-700 mt-1 mb-2">{event.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mt-2">
                        <motion.span 
                          whileHover={{ scale: 1.05 }}
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryBadge(event.category).color}`}
                        >
                          {getCategoryBadge(event.category).icon}
                          {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                        </motion.span>
                        
                        {event.verifiedByAadhaar && (
                          <motion.span 
                            whileHover={{ scale: 1.05 }}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                          >
                            <FiShield className="mr-1" />
                            Aadhaar Verified
                          </motion.span>
                        )}
                        
                        <motion.span 
                          whileHover={{ scale: 1.05 }}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          <FiDatabase className="mr-1" />
                          Blockchain Verified
                        </motion.span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      )}
      
      {/* Event Detail Modal */}
      <AnimatePresence>
        {detailEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setDetailEvent(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="bg-white rounded-xl max-w-2xl w-full p-6 overflow-hidden shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <motion.div 
                    className="p-2 rounded-full bg-gray-100"
                    whileHover={{ scale: 1.1, backgroundColor: "#EEF2FF" }}
                  >
                    {detailEvent.icon}
                  </motion.div>
                  <h2 className="text-xl font-bold text-gray-900 ml-3">{detailEvent.title}</h2>
                </div>
                <motion.button 
                  className="text-gray-500 hover:text-gray-700"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setDetailEvent(null)}
                >
                  <FiX size={24} />
                </motion.button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-gray-800">{detailEvent.description}</p>
                  <p className="text-sm text-gray-600 mt-2">
                    <FiCalendar className="inline mr-1" /> {formatDate(detailEvent.date)}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-2">
                  <motion.span 
                    whileHover={{ scale: 1.05 }}
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryBadge(detailEvent.category).color}`}
                  >
                    {getCategoryBadge(detailEvent.category).icon}
                    {detailEvent.category.charAt(0).toUpperCase() + detailEvent.category.slice(1)}
                  </motion.span>
                  
                  {detailEvent.verifiedByAadhaar && (
                    <motion.span 
                      whileHover={{ scale: 1.05 }}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                    >
                      <FiShield className="mr-1" />
                      Aadhaar Verified
                    </motion.span>
                  )}
                </div>
                
                <motion.div 
                  className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-4"
                  whileHover={{ y: -2, boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}
                >
                  <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                    <FiUser className="mr-2" /> Pera Wallet Integration
                  </h3>
                  <p className="text-sm text-gray-700 mb-2">
                    This transaction was signed using your Pera Wallet, providing a secure and verifiable record
                    of your consent action on the Algorand blockchain.
                  </p>
                  <div className="flex items-center text-sm">
                    <span className="font-medium mr-2">Wallet Address:</span>
                    <code className="bg-gray-100 px-2 py-1 rounded font-mono text-xs">
                      {walletInfo?.address ? walletInfo.address.slice(0, 8) + '...' + walletInfo.address.slice(-6) : 'Not connected'}
                    </code>
                  </div>
                </motion.div>
                
                <div className="flex justify-end gap-3 mt-4">
                  <motion.button 
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center"
                    whileHover={{ scale: 1.05, backgroundColor: "#F9FAFB" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setDetailEvent(null)}
                  >
                    Close
                  </motion.button>
                  <motion.button 
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                    whileHover={{ scale: 1.05, backgroundColor: "#2563EB" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => alert('Downloading verification certificate for ' + detailEvent.id)}
                  >
                    <FiDownload className="mr-2" />
                    Download Certificate
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 