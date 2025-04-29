'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiFile, 
  FiDownload, 
  FiEye, 
  FiUpload, 
  FiTrash2, 
  FiShare2,
  FiCheck,
  FiAlertTriangle,
  FiSearch,
  FiFilter
} from 'react-icons/fi';
import { useWallet } from '@/providers/WalletContext';
import ConnectWallet from '@/components/ConnectWallet';

// Demo document data
const documents = [
  {
    id: 'doc-001',
    name: 'Aadhaar Card.pdf',
    type: 'Identity',
    issuer: 'UIDAI',
    issuedDate: '15 Jan 2020',
    validUntil: 'Permanent',
    size: '2.3 MB',
    verified: true
  },
  {
    id: 'doc-002',
    name: 'PAN Card.pdf',
    type: 'Identity',
    issuer: 'Income Tax Department',
    issuedDate: '10 Mar 2018',
    validUntil: 'Permanent',
    size: '1.5 MB',
    verified: true
  },
  {
    id: 'doc-003',
    name: 'Driving License.pdf',
    type: 'Identity',
    issuer: 'Transport Department',
    issuedDate: '05 Jun 2022',
    validUntil: '04 Jun 2042',
    size: '3.1 MB',
    verified: true
  },
  {
    id: 'doc-004',
    name: 'Passport.pdf',
    type: 'Identity',
    issuer: 'Ministry of External Affairs',
    issuedDate: '12 Aug 2021',
    validUntil: '11 Aug 2031',
    size: '4.2 MB',
    verified: true
  },
  {
    id: 'doc-005',
    name: 'Bank Statement.pdf',
    type: 'Financial',
    issuer: 'HDFC Bank',
    issuedDate: '01 Apr 2023',
    validUntil: '30 Apr 2023',
    size: '1.8 MB',
    verified: false
  },
  {
    id: 'doc-006',
    name: 'Insurance Policy.pdf',
    type: 'Insurance',
    issuer: 'LIC',
    issuedDate: '22 Nov 2022',
    validUntil: '21 Nov 2032',
    size: '2.7 MB',
    verified: true
  }
];

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

export default function DocumentsPage() {
  const { walletInfo } = useWallet();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');

  // Filter documents based on search term and type
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          doc.issuer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All' || doc.type === filterType;
    return matchesSearch && matchesType;
  });

  // Get unique document types for filter
  const documentTypes = ['All', ...new Set(documents.map(doc => doc.type))];

  // Handle document view
  const handleViewDocument = (id) => {
    alert(`Viewing document ${id}. This would open the document viewer in a production app.`);
  };

  // Handle document download
  const handleDownloadDocument = (id) => {
    alert(`Downloading document ${id}. This would start the download in a production app.`);
  };

  // Handle document share
  const handleShareDocument = (id) => {
    alert(`Setting up sharing for document ${id}. This would open sharing options in a production app.`);
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
            <FiFile className="text-blue-600 text-2xl" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Connect Your Wallet</h2>
          <p className="text-gray-600 mb-6">You need to connect your wallet to access your secure documents.</p>
          <ConnectWallet />
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Your Documents</h1>
              <p className="text-gray-600">Securely store and share your verified documents</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 flex items-center"
            >
              <FiUpload className="mr-2" />
              Upload Document
            </motion.button>
          </div>

          {/* Filters */}
          <motion.div 
            variants={itemVariants} 
            className="bg-white p-4 rounded-lg shadow-sm flex flex-col md:flex-row gap-4 items-center"
          >
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center">
              <FiFilter className="text-gray-500 mr-2" />
              <select
                className="block w-40 py-2 px-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                {documentTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </motion.div>

          {/* Documents List */}
          {filteredDocuments.length === 0 ? (
            <motion.div 
              variants={itemVariants}
              className="bg-white rounded-lg shadow-sm p-8 text-center"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiFile className="text-gray-400 text-2xl" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </motion.div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issuer</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issued Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valid Until</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredDocuments.map((doc) => (
                      <motion.tr 
                        key={doc.id}
                        variants={itemVariants}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-blue-50 rounded-lg flex items-center justify-center">
                              <FiFile className="h-5 w-5 text-blue-500" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                              <div className="text-sm text-gray-500">{doc.size}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{doc.type}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{doc.issuer}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{doc.issuedDate}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{doc.validUntil}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {doc.verified ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              <FiCheck className="mr-1" /> Verified
                            </span>
                          ) : (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              <FiAlertTriangle className="mr-1" /> Unverified
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button 
                            onClick={() => handleViewDocument(doc.id)}
                            className="text-blue-600 hover:text-blue-900 mr-3"
                          >
                            <FiEye className="inline mr-1" /> View
                          </button>
                          <button 
                            onClick={() => handleDownloadDocument(doc.id)}
                            className="text-green-600 hover:text-green-900 mr-3"
                          >
                            <FiDownload className="inline mr-1" /> Download
                          </button>
                          <button 
                            onClick={() => handleShareDocument(doc.id)}
                            className="text-purple-600 hover:text-purple-900"
                          >
                            <FiShare2 className="inline mr-1" /> Share
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
} 