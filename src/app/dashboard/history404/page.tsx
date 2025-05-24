"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiSearch, FiCalendar, FiDownload, FiFilter, 
  FiChevronDown, FiChevronUp, FiCheck, FiX, 
  FiFileText, FiUser, FiLock, FiCreditCard, FiClock
} from 'react-icons/fi';

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
    transition: { 
      type: 'spring',
      stiffness: 100,
      damping: 15
    }
  }
};

// Sample history data
const historyData = [
  {
    id: 1,
    type: 'consent',
    action: 'granted',
    user: 'Rahul Sharma',
    target: 'SBI Bank',
    description: 'Provided consent for accessing KYC data via Pera Wallet',
    timestamp: new Date(2025, 3, 28, 14, 23), // April 28, 2025
    status: 'completed',
    verified: true,
    aadhaarVerified: true,
    digilockerLinked: true,
    blockchainTxId: 'DNUOZHKTPLWNFK5RGSJREVX4JKTNQCCQ6CTDBTLXYAZCPEFXZB7A',
    walletType: 'Pera Wallet'
  },
  {
    id: 2,
    type: 'document',
    action: 'shared',
    user: 'Priya Patel',
    target: 'HDFC Insurance',
    description: 'Shared address proof document through Pera Wallet',
    timestamp: new Date(2025, 3, 28, 9, 15), // April 28, 2025
    status: 'completed',
    verified: true,
    aadhaarVerified: true,
    digilockerLinked: true,
    blockchainTxId: 'GPVF2UODPDAYKM3YJEOJVGMYZFBPLQRF4QC54UGLRH7BSEVLJDRA',
    walletType: 'Pera Wallet'
  },
  {
    id: 3,
    type: 'consent',
    action: 'revoked',
    user: 'Amit Singh',
    target: 'Axis Bank',
    description: 'Revoked consent for financial data access via Pera Wallet',
    timestamp: new Date(2025, 3, 27, 16, 45), // April 27, 2025
    status: 'completed',
    verified: true,
    aadhaarVerified: true,
    digilockerLinked: false,
    blockchainTxId: 'CZUPBMF5S5VTKRKSN7RDQMCCAFKEWBAMGKDX45RU762AZBYCSCAQ',
    walletType: 'Pera Wallet'
  },
  {
    id: 4,
    type: 'account',
    action: 'verified',
    user: 'Sunita Gupta',
    target: 'Aadhaar',
    description: 'Account verified with Aadhaar through Pera Wallet',
    timestamp: new Date(2025, 3, 27, 11, 30), // April 27, 2025
    status: 'completed',
    verified: true,
    aadhaarVerified: true,
    digilockerLinked: false,
    blockchainTxId: 'IUZXC3DGLNPRY4HKMBSWFQNVBPWQCJK5SALGQTWZR3XNCLE2TZ4Q',
    walletType: 'Pera Wallet'
  },
  {
    id: 5,
    type: 'account',
    action: 'linked',
    user: 'Vikram Desai',
    target: 'DigiLocker',
    description: 'Account linked with DigiLocker via Pera Wallet',
    timestamp: new Date(2025, 3, 26, 10, 20), // April 26, 2025
    status: 'completed',
    verified: true,
    aadhaarVerified: true,
    digilockerLinked: true,
    blockchainTxId: 'PVDJ3MQYGS7AQWEROPNXUBSTFYKZLHRN4CIVA5DGHBWJM2XET3HA',
    walletType: 'Pera Wallet'
  },
  {
    id: 6,
    type: 'document',
    action: 'uploaded',
    user: 'Neha Kumar',
    target: 'Income Certificate',
    description: 'Uploaded document to DigiLocker and verified via Pera Wallet',
    timestamp: new Date(2025, 3, 26, 15, 10), // April 26, 2025
    status: 'completed',
    verified: true,
    aadhaarVerified: true,
    digilockerLinked: true,
    blockchainTxId: 'FQRTZ3SUVWXYKLMOP2A7N9BCHDE6JGKI5VP4S8QUHYMZNLC3WKDA',
    walletType: 'Pera Wallet'
  },
  {
    id: 7,
    type: 'consent',
    action: 'requested',
    user: 'Arun Mehta',
    target: 'ICICI Bank',
    description: 'Request for consent to access identity verification via Pera Wallet',
    timestamp: new Date(2025, 3, 25, 9, 45), // April 25, 2025
    status: 'pending',
    verified: true,
    aadhaarVerified: true,
    digilockerLinked: true,
    blockchainTxId: 'LMCZSDNQ4PA3KBGHVWXRYJEF7T6U8I5O9Z2YMUVFXCS1QRT7EWHA',
    walletType: 'Pera Wallet'
  },
  {
    id: 8,
    type: 'consent',
    action: 'expired',
    user: 'Kiran Reddy',
    target: 'Max Life Insurance',
    description: 'Consent for document access expired, recorded via Pera Wallet',
    timestamp: new Date(2025, 3, 24, 14, 30), // April 24, 2025
    status: 'expired',
    verified: true,
    aadhaarVerified: true,
    digilockerLinked: true,
    blockchainTxId: 'AXYZ2KLMNO1PQ9RS8TUVW7XYZ6ABCDE3FGH5IJKL4MNOP7QRST6U',
    walletType: 'Pera Wallet'
  }
];

export default function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const [processingItems, setProcessingItems] = useState<number[]>([]);
  
  // Filter data based on search, type, and time period
  const filteredData = historyData.filter(item => {
    const matchesSearch = 
      item.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesType = selectedType === 'all' || item.type === selectedType;
    
    let matchesPeriod = true;
    if (selectedPeriod !== 'all') {
      const now = new Date();
      const itemDate = new Date(item.timestamp);
      
      if (selectedPeriod === 'today') {
        matchesPeriod = itemDate.toDateString() === now.toDateString();
      } else if (selectedPeriod === 'week') {
        const weekAgo = new Date(now.setDate(now.getDate() - 7));
        matchesPeriod = itemDate >= weekAgo;
      } else if (selectedPeriod === 'month') {
        const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
        matchesPeriod = itemDate >= monthAgo;
      }
    }
    
    return matchesSearch && matchesType && matchesPeriod;
  }).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  // Format date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Simulate blockchain verification for newly added records
  useEffect(() => {
    // Simulate a record that is still being processed
    setProcessingItems([9]);
    
    // After 5 seconds, mark the record as verified
    const timer = setTimeout(() => {
      setProcessingItems([]);
      // Could add the verified record to the history data here
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  // Export to PDF
  const exportToPDF = async () => {
    try {
      // Dynamic import for client-side only libraries
      const jsPDFModule = await import('jspdf');
      const jsPDF = jsPDFModule.default;
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
        formatDate(item.timestamp),
        item.type.charAt(0).toUpperCase() + item.type.slice(1),
        item.action.charAt(0).toUpperCase() + item.action.slice(1),
        item.user,
        item.target,
        item.description,
        item.status.charAt(0).toUpperCase() + item.status.slice(1)
      ]);
      
      // Add table
      (doc as any).autoTable({
        head: [['Date', 'Type', 'Action', 'User', 'Target', 'Description', 'Status']],
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

  // Get icon based on action type
  const getActionIcon = (type: string) => {
    switch(type) {
      case 'consent': return <FiFileText className="text-blue-700" />;
      case 'document': return <FiFileText className="text-green-700" />;
      case 'account': return <FiUser className="text-purple-700" />;
      default: return <FiFileText className="text-gray-700" />;
    }
  };
  
  // Get background color based on status
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Add progress status indicator
  const getStatusMessage = (status, id) => {
    if (processingItems.includes(id)) {
      return "Processing on Algorand blockchain...";
    }
    if (status === 'completed') {
      return "Verified and recorded on Algorand blockchain";
    }
    if (status === 'pending') {
      return "Awaiting approval via Pera Wallet";
    }
    if (status === 'expired') {
      return "Expiration recorded on Algorand blockchain";
    }
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <motion.div 
      className="p-6 max-w-7xl mx-auto bg-white text-black"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Activity History</h1>
        <p className="text-gray-700 mt-2">
          View and manage your consent, document, and account activities
        </p>
      </motion.div>
      
      {/* Filters and Export */}
      <motion.div 
        variants={itemVariants}
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4"
      >
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search activity..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
        
        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <select
              className="appearance-none pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="consent">Consent</option>
              <option value="document">Document</option>
              <option value="account">Account</option>
            </select>
            <FiFilter className="absolute left-3 top-3 text-gray-400" />
            <FiChevronDown className="absolute right-3 top-3 text-gray-400" />
          </div>
          
          <div className="relative">
            <select
              className="appearance-none pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
            </select>
            <FiCalendar className="absolute left-3 top-3 text-gray-400" />
            <FiChevronDown className="absolute right-3 top-3 text-gray-400" />
          </div>
          
          <button 
            onClick={exportToPDF}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FiDownload /> Export PDF
          </button>
        </div>
      </motion.div>
      
      {/* Verification Notice */}
      <motion.div 
        variants={itemVariants}
        className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-md"
      >
        <div className="flex items-start gap-3">
          <div className="mt-1 text-blue-500">
            <FiLock size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Pera Wallet Integration</h3>
            <p className="text-gray-700 text-sm mt-1">
              All activities are securely signed through Pera Wallet, verified with Aadhaar and DigiLocker integration, 
              and immutably recorded on the Algorand blockchain for maximum security and compliance.
            </p>
          </div>
        </div>
      </motion.div>
      
      {/* Processing Record Indicator */}
      {processingItems.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-md"
        >
          <div className="flex items-start gap-3">
            <div className="mt-1 text-yellow-500">
              <FiClock size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Processing Transaction</h3>
              <p className="text-gray-700 text-sm mt-1">
                Your recent Pera Wallet transaction is being processed and recorded on the Algorand blockchain.
                This typically takes 3-5 seconds to complete.
              </p>
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Activity Timeline */}
      <motion.div variants={itemVariants} className="space-y-4">
        {/* New pending transaction - always at the top */}
        {processingItems.length > 0 && (
          <motion.div 
            key="processing-item"
            className="border border-yellow-200 rounded-lg overflow-hidden bg-yellow-50 shadow-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-yellow-100">
                    <FiClock className="text-yellow-700" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      Processing consent grant
                    </h3>
                    <p className="text-sm text-gray-500">{formatDate(new Date())}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Processing
                  </span>
                  <div className="animate-spin h-4 w-4 border-2 border-yellow-500 border-t-transparent rounded-full"></div>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-700">
                  Your consent grant to SBI Bank via Pera Wallet is being recorded on the Algorand blockchain...
                </p>
              </div>
            </div>
          </motion.div>
        )}
      
        {filteredData.length === 0 ? (
          <div className="text-center py-10 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No activities found matching your filters.</p>
          </div>
        ) : (
          filteredData.map((item) => (
            <motion.div 
              key={item.id}
              className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -2, boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}
            >
              <div 
                className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-gray-100">
                      {getActionIcon(item.type)}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {item.action.charAt(0).toUpperCase() + item.action.slice(1)} {item.type}
                      </h3>
                      <p className="text-sm text-gray-500">{formatDate(item.timestamp)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
                    {expandedItem === item.id ? <FiChevronUp /> : <FiChevronDown />}
                  </div>
                </div>
              </div>
              
              {expandedItem === item.id && (
                <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">User</h4>
                      <p className="text-gray-900">{item.user}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Target</h4>
                      <p className="text-gray-900">{item.target}</p>
                    </div>
                    <div className="md:col-span-2">
                      <h4 className="text-sm font-medium text-gray-500">Description</h4>
                      <p className="text-gray-900">{item.description}</p>
                    </div>
                    <div className="md:col-span-2">
                      <h4 className="text-sm font-medium text-gray-500">Blockchain Transaction</h4>
                      <p className="text-sm font-mono bg-gray-100 p-2 rounded mt-1 break-all">
                        {item.blockchainTxId}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {getStatusMessage(item.status, item.id)}
                      </p>
                    </div>
                    <div className="md:col-span-2">
                      <h4 className="text-sm font-medium text-gray-500">Verification</h4>
                      <div className="flex flex-wrap items-center mt-1 gap-4">
                        <div className="flex items-center gap-1">
                          {item.aadhaarVerified ? (
                            <FiCheck className="text-green-500" />
                          ) : (
                            <FiX className="text-red-500" />
                          )}
                          <span className={item.aadhaarVerified ? 'text-green-700' : 'text-red-700'}>
                            Aadhaar Verified
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          {item.digilockerLinked ? (
                            <FiCheck className="text-green-500" />
                          ) : (
                            <FiX className="text-red-500" />
                          )}
                          <span className={item.digilockerLinked ? 'text-green-700' : 'text-red-700'}>
                            DigiLocker Linked
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FiCheck className="text-green-500" />
                          <span className="text-green-700">Signed with {item.walletType}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))
        )}
      </motion.div>
    </motion.div>
  );
} 