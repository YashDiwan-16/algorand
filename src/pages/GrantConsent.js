import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { Dialog } from '@headlessui/react';
import { 
  ClockIcon,
  CalendarIcon,
  ShieldCheckIcon,
  ShieldExclamationIcon,
  DocumentCheckIcon,
  DocumentXMarkIcon,
  EyeIcon,
  PencilIcon,
  ArrowDownTrayIcon,
  CameraIcon,
  DocumentPlusIcon,
  DocumentTextIcon,
  XMarkIcon,
  ShareIcon,
  DocumentDuplicateIcon,
  CheckIcon,
  CheckCircleIcon,
  ArrowUpTrayIcon
} from '@heroicons/react/24/outline';
import { useWallet } from '../context/WalletContext';
import { getConsentRequests, updateConsentRequest, getDocuments, storeDocument } from '../services/mongoService';
import { uploadToIPFS } from '../services/ipfsService';
import { QRCodeSVG } from 'qrcode.react';
import toast, { Toaster } from 'react-hot-toast';

const SecurePreview = ({ doc, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPermitted, setIsPermitted] = useState(false);
  const previewRef = useRef(null);

  useEffect(() => {
    // Check if user has permission to download
    const checkPermission = async () => {
      try {
        const response = await fetch(`/api/consent-requests/check-permission/${doc._id}`);
        const data = await response.json();
        setIsPermitted(data.hasPermission);
      } catch (error) {
        console.error('Error checking permission:', error);
        setIsPermitted(false);
      }
    };
    checkPermission();
  }, [doc._id]);

  // Prevent right-click
  const handleContextMenu = (e) => {
    e.preventDefault();
    toast.error('Right-click is disabled for security');
  };

  // Prevent drag and drop
  const handleDragStart = (e) => {
    e.preventDefault();
    toast.error('Drag and drop is disabled for security');
  };

  // Prevent keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Prevent common screenshot shortcuts
      if ((e.metaKey || e.ctrlKey) && (e.key === 's' || e.key === 'p' || e.key === '5')) {
        e.preventDefault();
        toast.error('Screenshots are not permitted');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent print
  useEffect(() => {
    const handleBeforePrint = () => {
      toast.error('Printing is not permitted');
      window.print = () => {};
    };

    window.addEventListener('beforeprint', handleBeforePrint);
    return () => window.removeEventListener('beforeprint', handleBeforePrint);
  }, []);

  const handleDownload = async () => {
    if (!isPermitted) {
      toast.error('You do not have permission to download this document');
      return;
    }

    try {
      const response = await fetch(`/api/documents/${doc._id}/download`);
      if (!response.ok) throw new Error('Download failed');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = doc.name;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading document:', error);
      toast.error('Failed to download document');
    }
  };

  const getPreviewUrl = () => {
    // For images, use direct IPFS gateway URL
    if (doc.type.startsWith('image/')) {
      return `https://ipfs.io/ipfs/${doc.ipfsHash}`;
    }
    // For PDFs and other documents, use our preview endpoint
    return `/api/documents/${doc._id}/preview`;
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="min-h-screen px-4 text-center">
        <Dialog.Overlay className="fixed inset-0 bg-black/75" />

        <div className="inline-block w-full max-w-4xl p-6 my-8 text-left align-middle transition-all transform bg-gray-900 shadow-xl rounded-2xl">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-xl font-semibold text-white">
              {doc.name}
            </Dialog.Title>
            <div className="flex gap-2">
              {isPermitted && (
                <button
                  onClick={handleDownload}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <ArrowDownTrayIcon className="w-5 h-5 inline-block mr-1" />
                  Download
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div 
            ref={previewRef}
            className="relative w-full h-[70vh] bg-gray-800 rounded-lg overflow-hidden"
            onContextMenu={handleContextMenu}
            onDragStart={handleDragStart}
          >
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            )}
            
            {error && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-red-500 text-center">
                  <ShieldExclamationIcon className="w-12 h-12 mx-auto mb-2" />
                  <p>Failed to load document</p>
                  <p className="text-sm text-gray-400">{error}</p>
                </div>
              </div>
            )}

            {!error && (
              <iframe
                src={getPreviewUrl()}
                className="w-full h-full"
                onLoad={() => setIsLoading(false)}
                onError={(e) => {
                  setIsLoading(false);
                  setError('Failed to load document preview');
                }}
                style={{ 
                  pointerEvents: 'none',
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  MozUserSelect: 'none',
                  msUserSelect: 'none'
                }}
                sandbox="allow-same-origin"
                referrerPolicy="no-referrer"
              />
            )}

            {/* Download button overlay for permitted users */}
            {isPermitted && (
              <div className="absolute top-4 right-4">
                <button
                  onClick={handleDownload}
                  className="p-2 bg-gray-900/80 rounded-full hover:bg-gray-800/80 transition-colors"
                  title="Download document"
                >
                  <ArrowDownTrayIcon className="w-6 h-6 text-white" />
                </button>
              </div>
            )}
          </div>

          <div className="mt-4 text-sm text-gray-400">
            <p>IPFS Hash: {doc.ipfsHash}</p>
            <p>Uploaded: {new Date(doc.uploadedAt).toLocaleString()}</p>
            {!isPermitted && (
              <p className="text-yellow-500 mt-2">
                <ShieldExclamationIcon className="w-4 h-4 inline-block mr-1" />
                Download is not permitted for this document
              </p>
            )}
          </div>
        </div>
      </div>
    </Dialog>
  );
};

const DocumentCard = ({ doc, isSelected, onSelect }) => {
  const [showPreview, setShowPreview] = useState(false);
  
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={`relative overflow-hidden rounded-xl border-2 transition-all duration-200 ${
        isSelected 
          ? 'border-blue-500 bg-blue-500/10' 
          : 'border-gray-700 bg-gray-800/50 hover:border-blue-500/50'
      }`}
    >
      <div className="p-4">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-2xl">
              📄
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-medium">{doc.name}</h3>
            <div className="mt-1 space-y-1">
              <p className="text-sm text-gray-400">
                PDF • {formatFileSize(doc.size)} • {formatDate(doc.uploadedAt)}
              </p>
              <p className="text-sm text-gray-400">
                IPFS: {doc.ipfsHash.slice(0, 6)}...{doc.ipfsHash.slice(-4)}
              </p>
              <p className="text-sm text-gray-400">
                digilocker
              </p>
            </div>
          </div>

          <div className="flex-shrink-0">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={onSelect}
                className="sr-only peer"
              />
              <div className="w-6 h-6 rounded border-2 border-gray-600 peer-checked:border-blue-500 peer-checked:bg-blue-500 flex items-center justify-center transition-colors">
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-white"
                  >
                    <CheckIcon className="w-4 h-4" />
                  </motion.div>
                )}
              </div>
            </label>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <button
            onClick={() => setShowPreview(true)}
            className="flex-1 px-3 py-2 text-sm bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <EyeIcon className="w-4 h-4" />
            Preview
          </button>
        </div>
      </div>

      {isSelected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 border-2 border-blue-500 rounded-xl pointer-events-none"
        />
      )}

      {showPreview && (
        <SecurePreview
          doc={doc}
          onClose={() => setShowPreview(false)}
        />
      )}
    </motion.div>
  );
};

const GrantConsent = () => {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const { address } = useWallet();
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showGrantModal, setShowGrantModal] = useState(false);
  const [permissions, setPermissions] = useState({
    view: true,
    edit: false,
    download: false,
    screenshot: false
  });
  const [expiryDate, setExpiryDate] = useState('');
  const [expiryTime, setExpiryTime] = useState('');
  const [loading, setLoading] = useState(true);
  const [documents, setDocuments] = useState([]);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [uploadingDoc, setUploadingDoc] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [error, setError] = useState(null);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [availableDocuments, setAvailableDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showDigiLocker, setShowDigiLocker] = useState(false);
  const [digiLockerDocuments, setDigiLockerDocuments] = useState([]);
  const [documentSource, setDocumentSource] = useState('existing'); // 'existing', 'digilocker', 'upload'
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [ipfsHash, setIpfsHash] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [previewDoc, setPreviewDoc] = useState(null);

  const fetchRequests = async () => {
    try {
      if (!address) return;
      
      const requests = await getConsentRequests(address);
      setRequests(requests);
    } catch (error) {
      console.error('Error fetching requests:', error);
      toast.error('Failed to fetch consent requests');
    }
  };

  useEffect(() => {
    if (address) {
      fetchRequests();
    }
  }, [address]);

  useEffect(() => {
    const fetchData = async () => {
      if (!address) return;
      
      try {
        setLoading(true);
        const [fetchedRequests, fetchedDocuments] = await Promise.all([
          getConsentRequests(address, 'recipient'),
          getDocuments(address)
        ]);
        
        setRequests(fetchedRequests);
        setDocuments(fetchedDocuments);

        // If requestId is provided in URL, find and select that request
        if (requestId) {
          const request = fetchedRequests.find(req => req.requestId === requestId);
          if (request) {
            setSelectedRequest(request);
            setShowGrantModal(true);
          } else {
            setError('Request not found');
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load requests');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [address, requestId]);

  useEffect(() => {
    const fetchDocuments = async () => {
      if (!address) return;
      try {
        const docs = await getDocuments(address.toString());
        setAvailableDocuments(docs);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };
    fetchDocuments();
  }, [address]);

  useEffect(() => {
    if (availableDocuments.length > 0 && !selectedDocument) {
      setSelectedDocument(availableDocuments[0]);
    }
  }, [availableDocuments]);

  const getDocumentIcon = (type) => {
    if (!type) return '📁';
    if (type.includes('image')) return '🖼️';
    if (type.includes('pdf')) return '📄';
    if (type.includes('word')) return '📝';
    return '📁';
  };

  const handleDocumentSelect = (doc) => {
    setSelectedDocuments(prev => {
      const isSelected = prev.some(d => d._id === doc._id);
      if (isSelected) {
        return prev.filter(d => d._id !== doc._id);
      } else {
        return [...prev, doc];
      }
    });
  };

  const handleFileUpload = async (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    try {
      setUploadingDoc(true);
      
      for (const file of files) {
        // Check file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
          toast.error('File size should be less than 10MB');
          continue;
        }

        // Check file type
        const allowedTypes = [
          'image/jpeg',
          'image/jpg',
          'image/png',
          'application/pdf'
        ];

        if (!allowedTypes.includes(file.type)) {
          toast.error('Only PDF, JPG, and PNG files are supported');
          continue;
        }

        setUploadProgress(prev => ({ ...prev, [file.name]: 0 }));
        
        // Show uploading alert
        toast('Uploading to Pinata...', {
          icon: '📤',
          duration: 5000,
        });

        console.log('Starting upload for file:', {
          name: file.name,
          size: file.size,
          type: file.type
        });

        // Upload to IPFS
        const ipfsHash = await uploadToIPFS(file);
        console.log('Received IPFS hash:', ipfsHash);

        if (!ipfsHash) {
          throw new Error('No IPFS hash received');
        }

        // Show success alert
        toast.success('File uploaded successfully!', {
          duration: 3000,
        });

        // Store document metadata in MongoDB
        const document = {
          name: file.name,
          type: file.type,
          size: file.size,
          ipfsHash,
          owner: address,
          uploadedAt: new Date().toISOString()
        };

        console.log('Storing document:', document);
        const savedDoc = await storeDocument(document);
        console.log('Document stored:', savedDoc);

        setDocuments(prev => [...prev, savedDoc]);
        setSelectedDocuments(prev => [...prev, savedDoc]);
        setUploadedFiles(prev => [...prev, file]);

        // Show final success message with IPFS hash
        toast.success(
          <div>
            <p className="font-medium">Document uploaded and shared successfully!</p>
            <p className="text-sm mt-1">IPFS Hash: {ipfsHash}</p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(ipfsHash);
                  toast.success('IPFS hash copied to clipboard!');
                }}
                className="text-xs text-blue-400 hover:text-blue-300"
              >
                Copy IPFS Hash
              </button>
              <a
                href={`https://gateway.pinata.cloud/ipfs/${ipfsHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-400 hover:text-blue-300"
              >
                View on Pinata
              </a>
            </div>
          </div>,
          {
            duration: 10000,
          }
        );
      }
      
      setUploadingDoc(false);
      setUploadProgress({});
    } catch (error) {
      console.error('Error uploading documents:', error);
      toast.error(error.message || 'Failed to upload documents. Please try again.');
      setUploadingDoc(false);
      setUploadProgress({});
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    console.log('File selected:', {
      name: file.name,
      size: file.size,
      type: file.type
    });

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size should be less than 10MB');
      return;
    }

    // Check file type
    const allowedTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'application/pdf'
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error('Only PDF, JPG, and PNG files are supported');
      return;
    }

    handleFileUpload(event);
  };

  const handleGrantConsent = async () => {
    try {
      if (!selectedRequest) {
        toast.error('Please select a consent request first');
        return;
      }

      if (selectedDocuments.length === 0) {
        toast.error('Please select at least one document to share');
        return;
      }

      if (!address) {
        toast.error('Please connect your wallet first');
        return;
      }

      // Show loading state
      toast.loading('Granting consent...', {
        duration: 5000,
      });

      // Update consent request status
      const updatedRequest = await updateConsentRequest(selectedRequest._id, {
        status: 'granted',
        grantedAt: new Date().toISOString(),
        documents: selectedDocuments.map(doc => doc._id)
      });

      if (!updatedRequest) {
        throw new Error('Failed to update consent request');
      }

      // Show success message
      toast.success('Consent granted successfully!', {
        duration: 5000,
      });

      // Refresh the requests list
      await fetchRequests();

      // Reset selection
      setSelectedRequest(null);
      setSelectedDocuments([]);
      setShowPreview(false);
      setPreviewDoc(null);

    } catch (error) {
      console.error('Error granting consent:', error);
      toast.error(error.message || 'Failed to grant consent. Please try again.');
    }
  };

  const handlePreviewDocument = (doc) => {
    setPreviewDoc(doc);
    setShowPreview(true);
  };

  const handleClosePreview = () => {
    setPreviewDoc(null);
    setShowPreview(false);
  };

  const handleRevokeConsent = async (requestId) => {
    try {
      await updateConsentRequest(requestId, {
        status: 'revoked',
        revokedAt: new Date().toISOString()
      });

      setRequests(prev => 
        prev.map(req => 
          req.requestId === requestId 
            ? { ...req, status: 'revoked' }
            : req
        )
      );
    } catch (error) {
      console.error('Error revoking consent:', error);
      alert('Failed to revoke consent. Please try again.');
    }
  };

  const handleShare = (platform) => {
    const message = `Please review and grant consent for the document: ${shareUrl}`;
    let shareLink = '';

    switch (platform) {
      case 'whatsapp':
        shareLink = `https://wa.me/?text=${encodeURIComponent(message)}`;
        break;
      case 'telegram':
        shareLink = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(message)}`;
        break;
      default:
        return;
    }

    window.open(shareLink, '_blank');
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900 via-gray-900 to-gray-900">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
          style: {
            background: '#1F2937',
            color: '#fff',
            border: '1px solid #374151',
            padding: '16px',
            borderRadius: '8px',
          },
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
        }}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto py-12">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Consent Requests
            </h1>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
            >
              Back to Dashboard
            </button>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6">
              <p className="text-red-500">{error}</p>
            </div>
          )}

          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Select Document Source</h2>
            
            {/* Document Source Selection */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => setDocumentSource('existing')}
                className={`p-4 rounded-lg border transition-all duration-200 ${
                  documentSource === 'existing'
                    ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                    : 'bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <DocumentTextIcon className="w-6 h-6 mx-auto mb-2" />
                <span className="text-sm">Our Documents</span>
              </button>
              
              <button
                onClick={() => setDocumentSource('upload')}
                className={`p-4 rounded-lg border transition-all duration-200 ${
                  documentSource === 'upload'
                    ? 'bg-purple-500/20 border-purple-500 text-purple-400'
                    : 'bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <ArrowUpTrayIcon className="w-6 h-6 mx-auto mb-2" />
                <span className="text-sm">Upload Document</span>
              </button>
            </div>

            {/* Document Selection Area */}
            <div className="mt-6">
              {documentSource === 'existing' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-white">Our Documents</h3>
                    <span className="text-sm text-gray-400">
                      {selectedDocuments.length} document(s) selected
                    </span>
                  </div>
                  <div className="space-y-4">
                    {availableDocuments.map((doc) => (
                      <DocumentCard
                        key={doc._id}
                        doc={doc}
                        isSelected={selectedDocuments.some(d => d._id === doc._id)}
                        onSelect={() => handleDocumentSelect(doc)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {documentSource === 'upload' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white mb-4">Upload Documents</h3>
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="document-upload"
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                    <label
                      htmlFor="document-upload"
                      className="cursor-pointer"
                    >
                      <ArrowUpTrayIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-300 mb-2">Drag and drop your files here, or click to browse</p>
                      <p className="text-sm text-gray-400">Supported formats: PDF, JPG, PNG</p>
                    </label>
                  </div>
                  {uploadedFile && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-blue-500"
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                          />
                        </div>
                        <span className="text-sm text-gray-400">{uploadedFile.name}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Selected Documents Preview */}
            {selectedDocuments.length > 0 && (
              <div className="mt-6 p-4 bg-gray-700/50 rounded-lg">
                <h3 className="text-lg font-medium text-white mb-4">Selected Documents ({selectedDocuments.length})</h3>
                <div className="space-y-3">
                  {selectedDocuments.map((doc) => (
                    <div key={doc._id} className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-xl">
                        📄
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium truncate">{doc.name}</p>
                        <p className="text-sm text-gray-400 truncate">
                          IPFS: {doc.ipfsHash.slice(0, 6)}...{doc.ipfsHash.slice(-4)}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDocumentSelect(doc)}
                        className="text-gray-400 hover:text-white"
                      >
                        <XMarkIcon className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Permissions Section */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-300 mb-4">
                Permissions
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-colors">
                  <input
                    type="checkbox"
                    checked={permissions.view}
                    onChange={(e) => setPermissions(prev => ({ ...prev, view: e.target.checked }))}
                    className="w-5 h-5 text-blue-500 rounded border-gray-700 focus:ring-blue-500"
                  />
                  <div>
                    <span className="text-white font-medium">View</span>
                    <p className="text-sm text-gray-400">Allow viewing the document</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-colors">
                  <input
                    type="checkbox"
                    checked={permissions.edit}
                    onChange={(e) => setPermissions(prev => ({ ...prev, edit: e.target.checked }))}
                    className="w-5 h-5 text-blue-500 rounded border-gray-700 focus:ring-blue-500"
                  />
                  <div>
                    <span className="text-white font-medium">Edit</span>
                    <p className="text-sm text-gray-400">Allow editing the document</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-colors">
                  <input
                    type="checkbox"
                    checked={permissions.download}
                    onChange={(e) => setPermissions(prev => ({ ...prev, download: e.target.checked }))}
                    className="w-5 h-5 text-blue-500 rounded border-gray-700 focus:ring-blue-500"
                  />
                  <div>
                    <span className="text-white font-medium">Download</span>
                    <p className="text-sm text-gray-400">Allow downloading the document</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-colors">
                  <input
                    type="checkbox"
                    checked={permissions.screenshot}
                    onChange={(e) => setPermissions(prev => ({ ...prev, screenshot: e.target.checked }))}
                    className="w-5 h-5 text-blue-500 rounded border-gray-700 focus:ring-blue-500"
                  />
                  <div>
                    <span className="text-white font-medium">Screenshot</span>
                    <p className="text-sm text-gray-400">Allow taking screenshots</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Expiry Section */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Expiry Date
                </label>
                <input
                  type="date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Expiry Time
                </label>
                <input
                  type="time"
                  value={expiryTime}
                  onChange={(e) => setExpiryTime(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setShowGrantModal(false);
                  if (requestId) {
                    navigate('/dashboard');
                  }
                }}
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleGrantConsent}
                disabled={selectedDocuments.length === 0}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedDocuments.length === 0
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white`}
              >
                Grant Consent
              </button>
            </div>
          </div>
        </div>
      </div>

      {showShareOptions && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Share Consent Request</h2>
              <button
                onClick={() => setShowShareOptions(false)}
                className="text-gray-400 hover:text-white"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-900/50 p-4 rounded-lg">
                <div className="flex justify-center mb-4">
                  <QRCodeSVG
                    value={shareUrl}
                    size={200}
                    level="H"
                    includeMargin={true}
                    className="rounded-lg"
                  />
                </div>
                <p className="text-center text-gray-400 text-sm mb-4">
                  Scan QR code to view consent request
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => handleShare('whatsapp')}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    WhatsApp
                  </button>
                  <button
                    onClick={() => handleShare('telegram')}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                    </svg>
                    Telegram
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-gray-900/50 p-3 rounded-lg">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="flex-1 bg-transparent text-gray-300 text-sm"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(shareUrl);
                    // You could add a toast notification here
                  }}
                  className="text-gray-400 hover:text-white"
                  title="Copy link"
                >
                  <DocumentDuplicateIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Document Preview Modal */}
      {showPreview && previewDoc && (
        <SecurePreview
          doc={previewDoc}
          onClose={handleClosePreview}
        />
      )}
    </div>
  );
};

export default GrantConsent; 