import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useWallet } from '../context/WalletContext';
import { getConsentRequests, updateConsentRequest } from '../services/consentService';
import { getFromIPFS, getIPFSGatewayURL } from '../services/ipfsService';
import { formatDistanceToNow } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom';
import { DocumentTextIcon, XMarkIcon, DocumentDuplicateIcon, ClockIcon, UserIcon, IdentificationIcon, ExclamationTriangleIcon, EyeIcon, CalendarIcon, ArrowsPointingInIcon, ArrowsPointingOutIcon, PhotoIcon, TableCellsIcon, PresentationChartLineIcon, ArrowTopRightOnSquareIcon, ArrowUpTrayIcon, ShieldExclamationIcon, ArrowDownTrayIcon, CheckCircleIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { Toaster, toast } from 'react-hot-toast';
import { Dialog } from '@headlessui/react';

const truncateAddress = (address) => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const ConsentedDocuments = () => {
  const { address } = useWallet();
  const [consentedDocuments, setConsentedDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [viewMode, setViewMode] = useState('list');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSecurityWarning, setShowSecurityWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const navigate = useNavigate();
  const previewRef = useRef(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      if (!address) return;
      
      try {
        setIsLoading(true);
        // Fetch both sent and received requests
        const [sentRequests, receivedRequests] = await Promise.all([
          getConsentRequests(address, 'sender'),
          getConsentRequests(address, 'recipient')
        ]);
        
        // Combine and filter granted requests
        const allRequests = [...sentRequests, ...receivedRequests];
        const grantedRequests = allRequests.filter(req => 
          req.status === 'granted' && 
          (req.sender === address || req.recipient === address)
        );
        
        // Sort requests by granted date (newest first)
        const sortedRequests = grantedRequests.sort((a, b) => {
          const dateA = new Date(a.grantedAt || a.updatedAt);
          const dateB = new Date(b.grantedAt || b.updatedAt);
          return dateB - dateA;
        });

        // Ensure documents are populated
        const populatedRequests = await Promise.all(
          sortedRequests.map(async (request) => {
            if (request.documents && request.documents.length > 0) {
              // If documents are already populated, return as is
              if (typeof request.documents[0] === 'object') {
                return request;
              }
              // Otherwise, fetch document details
              try {
                const response = await fetch(`/api/consent/${request.requestId}/documents`);
                const data = await response.json();
                return {
                  ...request,
                  documents: data.documents
                };
              } catch (error) {
                console.error('Error fetching document details:', error);
                return request;
              }
            }
            return request;
          })
        );
        
        setConsentedDocuments(populatedRequests);
      } catch (err) {
        console.error('Error fetching documents:', err);
        setError('Failed to load documents');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocuments();
  }, [address]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedDocument && !selectedDocument.permissions?.screenshot) {
        // Check for screenshot shortcuts (Mac: Cmd+Shift+3, Cmd+Shift+4, Cmd+Shift+5)
        if ((e.metaKey || e.ctrlKey) && e.shiftKey && (e.key === '3' || e.key === '4' || e.key === '5')) {
          e.preventDefault();
          setShowSecurityWarning(true);
        }
        // Check for print screen
        if (e.key === 'PrintScreen') {
          e.preventDefault();
          setShowSecurityWarning(true);
        }
      }
    };

    const handleContextMenu = (e) => {
      if (selectedDocument && !selectedDocument.permissions?.download) {
        e.preventDefault();
        setShowSecurityWarning(true);
      }
    };

    const handleCopy = (e) => {
      if (selectedDocument && !selectedDocument.permissions?.copy) {
        e.preventDefault();
        setShowSecurityWarning(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('copy', handleCopy);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('copy', handleCopy);
    };
  }, [selectedDocument]);

  const handleRevokeConsent = async (requestId) => {
    try {
      // Update the request status in the backend
      await updateConsentRequest(requestId, {
        status: 'revoked',
        revokedAt: new Date().toISOString()
      });

      // Update local state
      setConsentedDocuments(prev => 
        prev.map(doc => 
          doc.requestId === requestId 
            ? { ...doc, status: 'revoked' }
            : doc
        )
      );

      // Refresh the documents list
      const [sentRequests, receivedRequests] = await Promise.all([
        getConsentRequests(address, 'sender'),
        getConsentRequests(address, 'recipient')
      ]);
      
      const allRequests = [...sentRequests, ...receivedRequests];
      const grantedRequests = allRequests.filter(req => 
        req.status === 'granted' && 
        (req.sender === address || req.recipient === address)
      );
      
      setConsentedDocuments(grantedRequests);
    } catch (err) {
      console.error('Error revoking consent:', err);
      setError('Failed to revoke consent');
    }
  };

  const handleSecurityViolation = (type) => {
    let message = '';
    switch(type) {
      case 'screenshot':
        message = 'Screenshots are not permitted for security reasons.';
        break;
      case 'download':
        message = 'Downloading is not permitted for this document.';
        break;
      case 'copy':
        message = 'Copying content is not permitted for this document.';
        break;
      default:
        message = 'This action is not permitted for security reasons.';
    }
    setWarningMessage(message);
    setShowSecurityWarning(true);
  };

  const handleViewDetails = (document) => {
    // If the document has multiple documents, use the first one
    const docToView = document.documents?.[0] || document;
    
    // Ensure we have the document with IPFS hash
    const docWithIPFS = {
      ...docToView,
      name: docToView.name || document.documentName,
      type: docToView.type || document.documentType,
      ipfsHash: docToView.ipfsHash || document.ipfsHash,
      size: docToView.size || document.documentSize
    };
    
    setSelectedDocument(docWithIPFS);
    setViewMode('details');
  };

  const handleViewDocument = (document) => {
    if (!document.permissions?.view) {
      handleSecurityViolation('view');
      return;
    }

    // If the document has multiple documents, use the first one
    const docToView = document.documents?.[0] || document;
    
    // Ensure we have the document with IPFS hash
    const docWithIPFS = {
      ...docToView,
      name: docToView.name || document.documentName,
      type: docToView.type || document.documentType,
      ipfsHash: docToView.ipfsHash || document.ipfsHash,
      size: docToView.size || document.documentSize
    };
    
    setSelectedDocument(docWithIPFS);
    setViewMode('document');
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Not specified';
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Not specified';
    }
  };

  const getDocumentType = (type) => {
    if (!type) return 'Document';
    const mimeTypes = {
      'image/jpeg': 'JPEG Image',
      'image/jpg': 'JPEG Image',
      'image/png': 'PNG Image',
      'image/gif': 'GIF Image',
      'image/webp': 'WebP Image',
      'application/pdf': 'PDF Document',
      'application/msword': 'Word Document',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'Word Document',
      'application/vnd.ms-excel': 'Excel Spreadsheet',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'Excel Spreadsheet',
      'application/vnd.ms-powerpoint': 'PowerPoint Presentation',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'PowerPoint Presentation',
      'text/plain': 'Text File',
      'text/csv': 'CSV File',
      'application/json': 'JSON File',
      'application/zip': 'ZIP Archive',
      'application/x-rar-compressed': 'RAR Archive',
      'application/x-7z-compressed': '7Z Archive',
      'text/html': 'HTML Document',
      'text/css': 'CSS File',
      'application/javascript': 'JavaScript File',
      'application/xml': 'XML File',
      'application/x-yaml': 'YAML File',
      'application/x-markdown': 'Markdown File',
      'text/markdown': 'Markdown File'
    };
    return mimeTypes[type] || type.split('/').pop().toUpperCase();
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 B';
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
  };

  const getIPFSHashDisplay = (hash) => {
    if (!hash) return 'Not available';
    return `${hash.substring(0, 6)}...${hash.substring(hash.length - 4)}`;
  };

  const getDocumentIcon = (type) => {
    if (!type) return <DocumentTextIcon className="w-6 h-6" />;
    if (type.startsWith('image/')) return <PhotoIcon className="w-6 h-6" />;
    if (type === 'application/pdf') return <DocumentTextIcon className="w-6 h-6" />;
    if (type.startsWith('text/')) return <DocumentTextIcon className="w-6 h-6" />;
    if (type.includes('word')) return <DocumentTextIcon className="w-6 h-6" />;
    if (type.includes('excel') || type.includes('spreadsheet')) return <TableCellsIcon className="w-6 h-6" />;
    if (type.includes('powerpoint') || type.includes('presentation')) return <PresentationChartLineIcon className="w-6 h-6" />;
    return <DocumentTextIcon className="w-6 h-6" />;
  };

  const getDocumentColor = (type) => {
    if (!type) return 'bg-blue-500';
    if (type.startsWith('image/')) return 'bg-purple-500';
    if (type === 'application/pdf') return 'bg-red-500';
    if (type.startsWith('text/')) return 'bg-green-500';
    if (type.includes('word')) return 'bg-blue-500';
    if (type.includes('excel') || type.includes('spreadsheet')) return 'bg-green-500';
    if (type.includes('powerpoint') || type.includes('presentation')) return 'bg-orange-500';
    return 'bg-gray-500';
  };

  const filteredAndSortedDocuments = useMemo(() => {
    let filtered = consentedDocuments;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(doc => 
        doc.documents?.[0]?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.reason?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(doc => 
        doc.documents?.[0]?.type?.startsWith(filterType)
      );
    }

    // Apply sorting
    return filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt || a.updatedAt);
      const dateB = new Date(b.createdAt || b.updatedAt);
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
  }, [consentedDocuments, searchTerm, filterType, sortOrder]);

  const uploadToIPFS = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      // Show uploading alert
      toast.info('Uploading file to Pinata...', {
        duration: 5000,
        position: 'top-right',
      });

      console.log('Starting upload to Pinata:', {
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type
      });

      // Pinata API endpoint with direct API keys
      const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
        method: 'POST',
        headers: {
          'pinata_api_key': '3f1d7b8d429ea84f7263',
          'pinata_secret_api_key': 'b69c9825904625b797546ae1745851ae0a7508174844519e02d543512eb3dc9e',
          'Accept': '*/*',
        },
        body: formData,
      });

      console.log('Pinata response status:', response.status);
      const responseText = await response.text();
      console.log('Pinata raw response:', responseText);

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error('Failed to parse Pinata response:', e);
        throw new Error('Invalid response from Pinata');
      }

      console.log('Pinata parsed response:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Pinata upload failed');
      }

      if (!data.IpfsHash) {
        throw new Error('No IPFS hash received from Pinata');
      }

      // Show success alert
      toast.success('File uploaded successfully!', {
        duration: 3000,
        position: 'top-right',
      });

      return data.IpfsHash;
    } catch (error) {
      console.error('Pinata upload error:', error);
      // Show error alert
      toast.error(`Upload failed: ${error.message}`, {
        duration: 5000,
        position: 'top-right',
      });
      throw error;
    }
  };

  const handleFileUpload = async (file) => {
    if (!file) return;

    try {
      setIsUploading(true);
      setUploadProgress(0);

      // Upload to Pinata
      console.log('Starting file upload process:', {
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type
      });

      const ipfsHash = await uploadToIPFS(file);
      console.log('Received IPFS hash from Pinata:', ipfsHash);

      if (!ipfsHash) {
        throw new Error('No IPFS hash received');
      }

      // Show creating consent alert
      toast.info('Creating consent request...', {
        duration: 3000,
        position: 'top-right',
      });

      // Create consent request
      const consentResponse = await fetch('/api/consent/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          documentName: file.name,
          documentType: file.type,
          documentSize: file.size,
          ipfsHash: ipfsHash,
          permissions: {
            view: true,
            edit: false,
            download: false,
            screenshot: false
          },
          reason: 'Document Access',
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
        }),
      });

      console.log('Consent response status:', consentResponse.status);
      const consentResponseText = await consentResponse.text();
      console.log('Consent raw response:', consentResponseText);

      if (!consentResponse.ok) {
        throw new Error(consentResponseText || 'Failed to create consent request');
      }

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
          position: 'top-right',
        }
      );

      // Refresh documents list
      fetchDocuments();

    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error.message || 'Failed to upload file. Please try again.');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
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

    handleFileUpload(file);
  };

  const DocumentPreview = ({ doc, onClose }) => {
    const [showSecurityWarning, setShowSecurityWarning] = useState(false);
    const [warningMessage, setWarningMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const previewRef = useRef(null);

    const handleSecurityViolation = (action) => {
      const warnings = {
        copy: 'Copying content is not permitted. This document is protected.',
        download: 'Downloading is not permitted. This document is protected.',
        screenshot: 'Taking screenshots is not permitted. This document is protected.',
        rightClick: 'Right-click is disabled. This document is protected.',
        print: 'Printing is not permitted. This document is protected.',
        save: 'Saving is not permitted. This document is protected.',
        open: 'Opening in new tab is not permitted. This document is protected.'
      };
      setWarningMessage(warnings[action] || 'This action is not permitted. This document is protected.');
      setShowSecurityWarning(true);
    };

    useEffect(() => {
      const handleKeyDown = (e) => {
        // Prevent screenshots
        if ((e.metaKey || e.ctrlKey) && e.shiftKey && (e.key === '3' || e.key === '4' || e.key === '5')) {
          e.preventDefault();
          handleSecurityViolation('screenshot');
        }
        // Prevent print screen
        if (e.key === 'PrintScreen') {
          e.preventDefault();
          handleSecurityViolation('screenshot');
        }
        // Prevent copy
        if ((e.metaKey || e.ctrlKey) && e.key === 'c') {
          e.preventDefault();
          handleSecurityViolation('copy');
        }
        // Prevent save
        if ((e.metaKey || e.ctrlKey) && e.key === 's') {
          e.preventDefault();
          handleSecurityViolation('save');
        }
      };

      const handleContextMenu = (e) => {
        e.preventDefault();
        handleSecurityViolation('rightClick');
      };

      const handleCopy = (e) => {
        e.preventDefault();
        handleSecurityViolation('copy');
      };

      const handleBeforePrint = () => {
        handleSecurityViolation('print');
        return false;
      };

      // Add event listeners to the entire document
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('contextmenu', handleContextMenu);
      document.addEventListener('copy', handleCopy);
      window.addEventListener('beforeprint', handleBeforePrint);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('contextmenu', handleContextMenu);
        document.removeEventListener('copy', handleCopy);
        window.removeEventListener('beforeprint', handleBeforePrint);
      };
    }, []);

    const getPreviewUrl = () => {
      if (!doc.ipfsHash) {
        setError('No IPFS hash found for this document');
        return null;
      }
      return `https://gateway.pinata.cloud/ipfs/${doc.ipfsHash}`;
    };

    const renderPreview = () => {
      const previewUrl = getPreviewUrl();
      if (!previewUrl) {
        return (
          <div className="text-white text-center p-4">
            <ShieldExclamationIcon className="w-12 h-12 mx-auto mb-2 text-red-500" />
            <p>Failed to load document</p>
            <p className="text-sm text-gray-400">{error}</p>
          </div>
        );
      }

      if (doc.type?.includes('image')) {
        return (
          <div className="flex items-center justify-center h-full">
            <img 
              ref={previewRef}
              src={previewUrl} 
              alt={doc.name}
              className="max-w-full max-h-full object-contain"
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false);
                setError('Failed to load image');
              }}
              onContextMenu={(e) => {
                e.preventDefault();
                handleSecurityViolation('rightClick');
              }}
              style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
            />
          </div>
        );
      }

      if (doc.type === 'application/pdf') {
        return (
          <iframe
            ref={previewRef}
            src={`${previewUrl}#toolbar=0&navpanes=0&scrollbar=0`}
            className="w-full h-full"
            title={doc.name}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setError('Failed to load PDF');
            }}
            onContextMenu={(e) => {
              e.preventDefault();
              handleSecurityViolation('rightClick');
            }}
            style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
          />
        );
      }

      return (
        <div className="text-white text-center p-4">
          <DocumentTextIcon className="w-12 h-12 mx-auto mb-2 text-gray-400" />
          <p>Preview not available for this file type</p>
          <p className="text-sm text-gray-400 mt-2">
            Document Type: {doc.type}
          </p>
          <a
            href={previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-blue-400 hover:text-blue-300"
            onClick={(e) => {
              e.preventDefault();
              handleSecurityViolation('open');
            }}
          >
            Open Document
          </a>
        </div>
      );
    };

    return (
      <div 
        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
        onContextMenu={(e) => {
          e.preventDefault();
          handleSecurityViolation('rightClick');
        }}
      >
        <div className="bg-gray-900 rounded-lg w-full max-w-4xl h-[80vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-medium text-white">{doc.name}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <ShieldCheckIcon className="w-4 h-4" />
                <span>Protected Document</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleSecurityViolation('download')}
                className="p-2 text-gray-400 hover:text-white"
              >
                <ArrowDownTrayIcon className="w-5 h-5" />
              </button>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Security Notice */}
          <div className="bg-blue-900/30 border-b border-blue-800 p-2">
            <div className="flex items-center justify-center gap-2 text-sm text-blue-300">
              <ShieldExclamationIcon className="w-4 h-4" />
              <span>This document is protected. Copying, downloading, and screenshots are disabled.</span>
            </div>
          </div>

          {/* Document Content */}
          <div 
            ref={previewRef}
            className="flex-1 overflow-auto p-4 relative"
            onContextMenu={(e) => {
              e.preventDefault();
              handleSecurityViolation('rightClick');
            }}
            onCopy={(e) => {
              e.preventDefault();
              handleSecurityViolation('copy');
            }}
            style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
          >
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            )}
            {renderPreview()}
          </div>
        </div>

        {/* Security Warning Modal */}
        {showSecurityWarning && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
              <div className="flex items-center gap-3 mb-4">
                <ShieldExclamationIcon className="w-6 h-6 text-red-500" />
                <h3 className="text-lg font-medium text-white">Security Restriction</h3>
              </div>
              <p className="text-gray-300 mb-6">{warningMessage}</p>
              <button
                onClick={() => setShowSecurityWarning(false)}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                I Understand
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 text-center">
            <ExclamationTriangleIcon className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-red-400 mb-2">Error Loading Documents</h2>
            <p className="text-gray-400 mb-4">{error}</p>
            <button
              onClick={() => {
                setError(null);
                setIsLoading(true);
                fetchDocuments();
              }}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
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
          info: {
            iconTheme: {
              primary: '#3B82F6',
              secondary: '#fff',
            },
          },
        }}
      />
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Consented Documents</h1>
          <p className="text-gray-400">View and manage documents shared with you</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-gray-800 rounded-lg p-4 mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-4">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              <option value="image">Images</option>
              <option value="application/pdf">PDFs</option>
              <option value="text">Text Files</option>
            </select>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredAndSortedDocuments.length === 0 ? (
          <div className="text-center py-12 bg-gray-800 rounded-lg">
            <DocumentTextIcon className="w-16 h-16 mx-auto text-gray-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Documents Found</h3>
            <p className="text-gray-400">No documents have been shared with you yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {filteredAndSortedDocuments.map((doc) => (
              <div
                key={doc.requestId}
                className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02] animate-fadeIn"
              >
                <div className="p-4">
                  {/* Reason at the top */}
                  <div className="mb-3">
                    <span className="text-sm font-medium text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">
                      {doc.reason || 'Document Access'}
                    </span>
                  </div>

                  {/* Document Info */}
                  <div className="flex items-start gap-3">
                    <div className="p-3 rounded-lg bg-blue-500/10">
                      <DocumentTextIcon className="w-6 h-6 text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium truncate">
                        {doc.documentName || doc.documents?.[0]?.name || 'Document'}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {getDocumentType(doc.documentType || doc.documents?.[0]?.type)} • {formatFileSize(doc.documentSize || doc.documents?.[0]?.size)}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {formatDate(doc.createdAt || doc.documents?.[0]?.createdAt)}
                      </p>
                      <p className="text-sm text-blue-400 mt-1 font-mono">
                        IPFS: {getIPFSHashDisplay(doc.ipfsHash || doc.documents?.[0]?.ipfsHash)}
                      </p>
                    </div>
                  </div>

                  {/* Status and Dates */}
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Status</span>
                      <span className="text-sm font-medium text-green-400">Granted</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Granted</span>
                      <span className="text-sm">{formatDate(doc.grantedAt)}</span>
                    </div>
                    {doc.expiresAt && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Expires</span>
                        <span className="text-sm">{formatDate(doc.expiresAt)}</span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedDocument(doc);
                        setViewMode('details');
                      }}
                      className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleViewDocument(doc)}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Document Details Modal */}
        {selectedDocument && viewMode === 'details' && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 animate-fadeIn">
            <div className="bg-gray-800 rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-auto animate-slideIn">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Request Information</h2>
                <button
                  onClick={() => {
                    setSelectedDocument(null);
                    setViewMode('list');
                    setShowSecurityWarning(false);
                  }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">Request ID</h3>
                  <p className="text-white font-mono text-sm">{selectedDocument.requestId}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">Status</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {selectedDocument.status}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">Reason</h3>
                  <p className="text-white">{selectedDocument.reason}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">Sender</h3>
                  <div className="flex items-center gap-2 bg-gray-900/50 px-3 py-2 rounded-lg">
                    <IdentificationIcon className="w-4 h-4 text-blue-400" />
                    <span className="text-gray-300 font-mono text-sm">
                      {selectedDocument.sender}
                    </span>
                    <button
                      onClick={() => navigator.clipboard.writeText(selectedDocument.sender)}
                      className="ml-auto text-gray-500 hover:text-gray-300 transition-colors"
                      title="Copy address"
                    >
                      <DocumentDuplicateIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">Recipient</h3>
                  <div className="flex items-center gap-2 bg-gray-900/50 px-3 py-2 rounded-lg">
                    <IdentificationIcon className="w-4 h-4 text-blue-400" />
                    <span className="text-gray-300 font-mono text-sm">
                      {selectedDocument.recipient}
                    </span>
                    <button
                      onClick={() => navigator.clipboard.writeText(selectedDocument.recipient)}
                      className="ml-auto text-gray-500 hover:text-gray-300 transition-colors"
                      title="Copy address"
                    >
                      <DocumentDuplicateIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">Created</h3>
                  <p className="text-white">{formatDate(selectedDocument.createdAt)}</p>
                </div>

                {selectedDocument.expiry && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-1">Expires</h3>
                    <p className="text-white">{formatDate(selectedDocument.expiry)}</p>
                  </div>
                )}

                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">Granted At</h3>
                  <p className="text-white">{formatDate(selectedDocument.grantedAt || selectedDocument.updatedAt)}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Permissions</h3>
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex items-center justify-between bg-gray-900/50 px-3 py-2 rounded-lg">
                      <span className="text-gray-300">View</span>
                      <span className={`text-sm ${selectedDocument.permissions?.view ? 'text-green-400' : 'text-red-400'}`}>
                        {selectedDocument.permissions?.view ? 'Allowed' : 'Not Allowed'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between bg-gray-900/50 px-3 py-2 rounded-lg">
                      <span className="text-gray-300">Edit</span>
                      <span className={`text-sm ${selectedDocument.permissions?.edit ? 'text-green-400' : 'text-red-400'}`}>
                        {selectedDocument.permissions?.edit ? 'Allowed' : 'Not Allowed'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between bg-gray-900/50 px-3 py-2 rounded-lg">
                      <span className="text-gray-300">Download</span>
                      <span className={`text-sm ${selectedDocument.permissions?.download ? 'text-green-400' : 'text-red-400'}`}>
                        {selectedDocument.permissions?.download ? 'Allowed' : 'Not Allowed'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between bg-gray-900/50 px-3 py-2 rounded-lg">
                      <span className="text-gray-300">Screenshot</span>
                      <span className={`text-sm ${selectedDocument.permissions?.screenshot ? 'text-green-400' : 'text-red-400'}`}>
                        {selectedDocument.permissions?.screenshot ? 'Allowed' : 'Not Allowed'}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Shared Documents</h3>
                  {selectedDocument.documents?.map((doc, index) => (
                    <div key={index} className="bg-gray-900/50 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <div className="p-3 rounded-lg bg-blue-500/10">
                          <DocumentTextIcon className="w-6 h-6 text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-medium mb-1">{doc.name || selectedDocument.documentName}</h4>
                          <p className="text-sm text-gray-400">
                            {getDocumentType(doc.type || selectedDocument.documentType)} • {formatFileSize(doc.size)}
                          </p>
                          <div className="mt-2 text-sm text-gray-500">
                            <p className="flex items-center gap-2">
                              <span className="text-gray-400">IPFS Hash:</span>
                              <span className="text-blue-400 font-mono break-all">{doc.ipfsHash || selectedDocument.ipfsHash}</span>
                              <button
                                onClick={() => navigator.clipboard.writeText(doc.ipfsHash || selectedDocument.ipfsHash)}
                                className="text-gray-500 hover:text-gray-300 transition-colors"
                                title="Copy IPFS hash"
                              >
                                <DocumentDuplicateIcon className="w-4 h-4" />
                              </button>
                            </p>
                            <p className="mt-1">
                              <span className="text-gray-400">Uploaded:</span> {formatDate(doc.createdAt || selectedDocument.createdAt)}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => handleViewDocument(selectedDocument)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                          >
                            <DocumentDuplicateIcon className="w-4 h-4" />
                            View Document
                          </button>
                          <a
                            href={getIPFSGatewayURL(doc.ipfsHash || selectedDocument.ipfsHash)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1"
                          >
                           
                          
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Document View Modal */}
        {selectedDocument && viewMode === 'document' && (
          <DocumentPreview doc={selectedDocument} onClose={() => {
            setSelectedDocument(null);
            setViewMode(null);
          }} />
        )}

        {/* Security Warning Modal */}
        {showSecurityWarning && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gray-800 border border-red-500/50 rounded-xl p-6 max-w-md w-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">Security Warning</h3>
                <button
                  onClick={() => setShowSecurityWarning(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
              <p className="text-red-400 mb-4">{warningMessage}</p>
              <button
                onClick={() => setShowSecurityWarning(false)}
                className="w-full px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
              >
                I Understand
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Add these styles to your global CSS or create a new CSS module
const styles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideIn {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out;
  }

  .animate-slideIn {
    animation: slideIn 0.3s ease-out;
  }
`;

export default ConsentedDocuments;