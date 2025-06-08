import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DocumentIcon, 
  ArrowDownTrayIcon, 
  ArrowUpTrayIcon,
  TrashIcon,
  EyeIcon,
  IdentificationIcon,
  AcademicCapIcon,
  UserIcon,
  DocumentTextIcon,
  DocumentDuplicateIcon,
  DocumentCheckIcon,
  DocumentMagnifyingGlassIcon,
  DocumentArrowDownIcon,
  DocumentPlusIcon,
  ExclamationCircleIcon,
  ArrowPathIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const PINATA_API_KEY = '3f1d7b8d429ea84f7263';
const PINATA_API_SECRET = 'b69c9825904625b797546ae1745851ae0a7508174844519e02d543512eb3dc9e';

const getDocumentIcon = (name) => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes('aadhaar')) return <IdentificationIcon className="w-6 h-6 text-white" />;
  if (lowerName.includes('pan')) return <DocumentTextIcon className="w-6 h-6 text-white" />;
  if (lowerName.includes('marksheet') || lowerName.includes('certificate')) return <AcademicCapIcon className="w-6 h-6 text-white" />;
  if (lowerName.includes('license')) return <DocumentCheckIcon className="w-6 h-6 text-white" />;
  if (lowerName.includes('passport')) return <DocumentDuplicateIcon className="w-6 h-6 text-white" />;
  if (lowerName.includes('voter')) return <UserIcon className="w-6 h-6 text-white" />;
  if (lowerName.includes('ration')) return <DocumentMagnifyingGlassIcon className="w-6 h-6 text-white" />;
  if (lowerName.includes('birth')) return <DocumentArrowDownIcon className="w-6 h-6 text-white" />;
  return <DocumentIcon className="w-6 h-6 text-white" />;
};

const mockDocuments = [
  {
    id: '1',
    name: 'Aadhaar Card',
    type: 'PDF',
    size: '2.5 MB',
    date: '2024-03-15',
    source: 'digilocker',
    ipfsHash: 'QmX1...'
  },
  {
    id: '2',
    name: 'PAN Card',
    type: 'PDF',
    size: '1.8 MB',
    date: '2024-03-15',
    source: 'digilocker',
    ipfsHash: 'QmX2...'
  },
  {
    id: '3',
    name: '10th Marksheet',
    type: 'PDF',
    size: '3.2 MB',
    date: '2024-03-15',
    source: 'digilocker',
    ipfsHash: 'QmX3...'
  },
  {
    id: '4',
    name: '12th Marksheet',
    type: 'PDF',
    size: '3.5 MB',
    date: '2024-03-15',
    source: 'digilocker',
    ipfsHash: 'QmX4...'
  },
  {
    id: '5',
    name: 'Graduation Certificate',
    type: 'PDF',
    size: '4.1 MB',
    date: '2024-03-15',
    source: 'digilocker',
    ipfsHash: 'QmX5...'
  },
  {
    id: '6',
    name: 'Driving License',
    type: 'PDF',
    size: '2.8 MB',
    date: '2024-03-15',
    source: 'digilocker',
    ipfsHash: 'QmX6...'
  },
  {
    id: '7',
    name: 'Passport',
    type: 'PDF',
    size: '3.0 MB',
    date: '2024-03-15',
    source: 'digilocker',
    ipfsHash: 'QmX7...'
  },
  {
    id: '8',
    name: 'Voter ID',
    type: 'PDF',
    size: '2.2 MB',
    date: '2024-03-15',
    source: 'digilocker',
    ipfsHash: 'QmX8...'
  },
  {
    id: '9',
    name: 'Ration Card',
    type: 'PDF',
    size: '2.0 MB',
    date: '2024-03-15',
    source: 'digilocker',
    ipfsHash: 'QmX9...'
  },
  {
    id: '10',
    name: 'Birth Certificate',
    type: 'PDF',
    size: '1.5 MB',
    date: '2024-03-15',
    source: 'digilocker',
    ipfsHash: 'QmX10...'
  }
];

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showViewer, setShowViewer] = useState(false);
  const [isDigiLockerConnected, setIsDigiLockerConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const [documentName, setDocumentName] = useState('');
  const [documentType, setDocumentType] = useState('PDF');

  useEffect(() => {
    // Check if DigiLocker is connected
    const checkDigiLockerConnection = async () => {
      try {
        setIsConnecting(true);
        // Simulate DigiLocker connection check
        // In a real app, this would be an API call to verify the connection
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
        const isConnected = localStorage.getItem('digilocker_connected') === 'true';
        setIsDigiLockerConnected(isConnected);
        
        if (isConnected) {
          setDocuments(mockDocuments);
        }
      } catch (error) {
        console.error('Error checking DigiLocker connection:', error);
        setError('Failed to check DigiLocker connection');
      } finally {
        setIsConnecting(false);
      }
    };

    checkDigiLockerConnection();
  }, []);

  const handleDigiLockerConnect = async () => {
    try {
      setIsConnecting(true);
      // Simulate DigiLocker connection
      // In a real app, this would redirect to DigiLocker OAuth
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate OAuth delay
      localStorage.setItem('digilocker_connected', 'true');
      setIsDigiLockerConnected(true);
      setDocuments(mockDocuments);
    } catch (error) {
      console.error('Error connecting to DigiLocker:', error);
      setError('Failed to connect to DigiLocker');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleUploadClick = () => {
    setShowUploadModal(true);
    setUploadFile(null);
    setDocumentName('');
    setDocumentType('PDF');
    setError(null);
  };

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadFile(file);
      // Only set default document name if no name is currently set
      if (!documentName) {
        setDocumentName(file.name.split('.')[0]);
      }
      // Set document type based on file extension
      const extension = file.name.split('.').pop().toLowerCase();
      if (['jpg', 'jpeg', 'png'].includes(extension)) {
        setDocumentType('Image');
      } else if (['doc', 'docx'].includes(extension)) {
        setDocumentType('Word');
      } else {
        setDocumentType('PDF');
      }
    }
  };

  const handleUpload = async () => {
    if (!uploadFile || !documentName.trim()) {
      setError('Please select a file and enter a document name');
      return;
    }

    setIsLoading(true);
    setUploadProgress(0);
    setError(null);

    try {
      // Create form data for Pinata upload
      const formData = new FormData();
      formData.append('file', uploadFile);

      // Add metadata with proper structure
      const metadata = {
        name: documentName,
        keyvalues: {
          type: documentType,
          date: new Date().toISOString().split('T')[0],
          originalName: uploadFile.name
        }
      };
      formData.append('pinataMetadata', JSON.stringify(metadata));

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 200);

      // Upload to Pinata using API key and secret
      const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
        method: 'POST',
        headers: {
          'pinata_api_key': PINATA_API_KEY,
          'pinata_secret_api_key': PINATA_API_SECRET
        },
        body: formData
      });

      clearInterval(progressInterval);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.details || 'Failed to upload to IPFS');
      }

      const data = await response.json();
      console.log('Pinata Response:', data); // Debug log

      // Add new document to the list with the exact name provided
      const newDocument = {
        id: data.IpfsHash,
        name: documentName, // Use the exact name provided by user
        type: documentType,
        size: `${(uploadFile.size / (1024 * 1024)).toFixed(2)} MB`,
        date: new Date().toISOString().split('T')[0],
        source: 'upload',
        ipfsHash: data.IpfsHash
      };

      setDocuments(prev => [newDocument, ...prev]);
      setUploadProgress(100);
      
      // Close modal and show success message
      setShowUploadModal(false);
      alert(`File uploaded successfully! IPFS Hash: ${data.IpfsHash}`);
    } catch (error) {
      console.error('Error uploading file:', error);
      setError(error.message || 'Failed to upload file. Please try again.');
    } finally {
      setIsLoading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  const handleDownload = async (ipfsHash, fileName, fileType) => {
    try {
      const response = await fetch(`https://gateway.pinata.cloud/ipfs/${ipfsHash}`);
      if (!response.ok) {
        throw new Error('Failed to download file');
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      
      // Set correct file extension based on type
      let extension = '.pdf';
      if (fileType === 'Image') {
        extension = '.jpg';
      } else if (fileType === 'Word') {
        extension = '.docx';
      }
      
      a.download = `${fileName}${extension}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading file:', error);
      alert('Failed to download file. Please try again.');
    }
  };

  const handleView = async (doc) => {
    try {
      // Open in new tab with Pinata gateway
      const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${doc.ipfsHash}`;
      window.open(ipfsUrl, '_blank');
    } catch (error) {
      console.error('Error viewing file:', error);
      alert('Failed to view file. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      try {
        // In a real app, this would also delete from IPFS
        setDocuments(prev => prev.filter(doc => doc.id !== id));
        alert('Document deleted successfully!');
      } catch (error) {
        console.error('Error deleting document:', error);
        alert('Failed to delete document. Please try again.');
      }
    }
  };

  if (isConnecting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg p-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 text-blue-500 mx-auto mb-4"
              >
                <ArrowPathIcon className="w-full h-full" />
              </motion.div>
              <h2 className="text-2xl font-bold text-white mb-4">Connecting to DigiLocker</h2>
              <p className="text-gray-400">
                Please wait while we connect to your DigiLocker account...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isDigiLockerConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg p-8">
              <ExclamationCircleIcon className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-4">Connect to DigiLocker</h2>
              <p className="text-gray-400 mb-6">
                Please connect your DigiLocker account to view and manage your documents.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDigiLockerConnect}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
              >
                Connect DigiLocker
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Your Documents
            </h1>
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleUploadClick}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <DocumentPlusIcon className="w-5 h-5" />
                Upload Document
              </motion.button>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500">
              {error}
            </div>
          )}

          {uploadProgress > 0 && (
            <div className="mb-8">
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                  initial={{ width: 0 }}
                  animate={{ width: `${uploadProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          )}

          <div className="grid gap-4">
            {documents.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                No documents found. Upload your first document!
              </div>
            ) : (
              <AnimatePresence>
                {documents.map((doc) => (
                  <motion.div
                    key={doc.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4 hover:border-blue-500/50 transition-all duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          {getDocumentIcon(doc.name)}
                        </div>
                        <div>
                          <h4 className="text-white font-medium">{doc.name}</h4>
                          <p className="text-gray-400 text-sm">
                            {doc.type} • {doc.size} • {doc.date}
                          </p>
                          <p className="text-gray-500 text-xs mt-1">
                            IPFS: {doc.ipfsHash.substring(0, 10)}...
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-700/50 text-gray-300">
                          {doc.source}
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleView(doc)}
                          className="p-2 text-gray-400 hover:text-white transition-colors"
                          title="View on IPFS"
                        >
                          <EyeIcon className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDownload(doc.ipfsHash, doc.name, doc.type)}
                          className="p-2 text-gray-400 hover:text-white transition-colors"
                          title="Download Document"
                        >
                          <ArrowDownTrayIcon className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDelete(doc.id)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                          title="Delete Document"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-gray-900 rounded-lg w-full max-w-md p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Upload Document</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Document Name
                </label>
                <input
                  type="text"
                  value={documentName}
                  onChange={(e) => setDocumentName(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  placeholder="Enter document name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Document Type
                </label>
                <select
                  value={documentType}
                  onChange={(e) => setDocumentType(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="PDF">PDF</option>
                  <option value="Image">Image</option>
                  <option value="Word">Word Document</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Select File
                </label>
                <input
                  type="file"
                  onChange={handleFileSelect}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              {uploadProgress > 0 && (
                <div className="mt-4">
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                      initial={{ width: 0 }}
                      animate={{ width: `${uploadProgress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-4 mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleUpload}
                  disabled={isLoading || !uploadFile || !documentName.trim()}
                  className={`px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2 ${
                    (isLoading || !uploadFile || !documentName.trim()) ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <ArrowPathIcon className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <ArrowUpTrayIcon className="w-5 h-5" />
                  )}
                  {isLoading ? 'Uploading...' : 'Upload'}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Documents; 