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
import { getConsentRequests, getConsentRequest } from '../services/mongoService';
import { uploadToIPFS, getFromIPFS } from '../services/ipfsService';
import { QRCodeSVG } from 'qrcode.react';

const ViewConsent = () => {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const { address } = useWallet();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const fetchRequest = async () => {
      if (!address || !requestId) return;
      
      try {
        setLoading(true);
        setError(null);
        
        // Try to get the specific request first
        const request = await getConsentRequest(requestId);
        if (request) {
          setRequest(request);
        } else {
          setError('Request not found');
        }
      } catch (error) {
        console.error('Error fetching request:', error);
        setError('Failed to load request. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchRequest();
  }, [address, requestId]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Consent Details
          </h1>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
          >
            Back to Dashboard
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-400">Loading consent details...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Back to Dashboard
            </button>
          </div>
        ) : request ? (
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold text-white mb-4">Request Information</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-400">Request ID</p>
                    <p className="text-white">{request.requestId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Status</p>
                    <p className="text-white capitalize">{request.status}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Reason</p>
                    <p className="text-white">{request.reason || 'No reason provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Sender</p>
                    <p className="text-white break-all">{request.sender}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Recipient</p>
                    <p className="text-white break-all">{request.recipient}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Created</p>
                    <p className="text-white">{formatDate(request.createdAt)}</p>
                  </div>
                  {request.expiry && (
                    <div>
                      <p className="text-sm text-gray-400">Expires</p>
                      <p className="text-white">{formatDate(request.expiry)}</p>
                    </div>
                  )}
                  {request.grantedAt && (
                    <div>
                      <p className="text-sm text-gray-400">Granted At</p>
                      <p className="text-white">{formatDate(request.grantedAt)}</p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-white mb-4">Permissions</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <p className="text-sm text-gray-400">View</p>
                    <p className="text-white">{request.permissions?.view ? 'Allowed' : 'Not Allowed'}</p>
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <p className="text-sm text-gray-400">Edit</p>
                    <p className="text-white">{request.permissions?.edit ? 'Allowed' : 'Not Allowed'}</p>
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <p className="text-sm text-gray-400">Download</p>
                    <p className="text-white">{request.permissions?.download ? 'Allowed' : 'Not Allowed'}</p>
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <p className="text-sm text-gray-400">Screenshot</p>
                    <p className="text-white">{request.permissions?.screenshot ? 'Allowed' : 'Not Allowed'}</p>
                  </div>
                </div>
              </div>
            </div>

            {request.documents && request.documents.length > 0 ? (
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-white mb-4">Shared Documents</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {request.documents.map((doc) => (
                    <div
                      key={doc._id}
                      className="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700/70 transition-colors cursor-pointer"
                      onClick={() => {
                        setSelectedDocument(doc);
                        setShowPreview(true);
                      }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-2xl">
                            📄
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white font-medium truncate">{doc.name}</h3>
                          <p className="text-sm text-gray-400 mt-1">
                            {doc.type} • {formatFileSize(doc.size)}
                          </p>
                          <div className="mt-2">
                            <p className="text-sm text-gray-400">IPFS Hash:</p>
                            <p className="text-sm text-blue-400 break-all font-mono">
                              {doc.ipfsHash}
                            </p>
                          </div>
                          {doc.createdAt && (
                            <p className="text-sm text-gray-400 mt-1">
                              Uploaded: {formatDate(doc.createdAt)}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mt-8 text-center py-8 bg-gray-800/50 rounded-lg">
                <p className="text-gray-400">No documents shared in this consent request</p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">No consent request found</p>
            <button
              onClick={() => navigate('/dashboard')}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Back to Dashboard
            </button>
          </div>
        )}
      </div>

      {showPreview && selectedDocument && (
        <SecurePreview
          doc={selectedDocument}
          onClose={() => {
            setShowPreview(false);
            setSelectedDocument(null);
          }}
        />
      )}
    </div>
  );
};

const SecurePreview = ({ doc, onClose }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    // Disable right-click
    const handleContextMenu = (e) => e.preventDefault();
    document.addEventListener('contextmenu', handleContextMenu);

    // Disable keyboard shortcuts
    const handleKeyDown = (e) => {
      if (
        (e.ctrlKey || e.metaKey) && (
          e.key === 'c' || // Copy
          e.key === 's' || // Save
          e.key === 'p' || // Print
          e.key === 'u'    // View source
        )
      ) {
        e.preventDefault();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const getPreviewUrl = (ipfsHash) => {
    return `https://ipfs.io/ipfs/${ipfsHash}`;
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="min-h-screen px-4 text-center">
        <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm" />

        <div className="inline-block w-full max-w-4xl p-6 my-8 text-left align-middle transition-all transform bg-gray-900 shadow-xl rounded-2xl">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-xl font-semibold text-white">
              {doc.name}
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          <div className="relative bg-gray-800 rounded-lg overflow-hidden">
            <iframe
              ref={iframeRef}
              src={getPreviewUrl(doc.ipfsHash)}
              className="w-full h-[70vh]"
              style={{
                pointerEvents: 'none',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                MozUserSelect: 'none',
                msUserSelect: 'none'
              }}
              sandbox="allow-same-origin"
            />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-gray-900/50 to-transparent" />
          </div>

          <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-gray-800 rounded-full">
                IPFS: {doc.ipfsHash.slice(0, 6)}...{doc.ipfsHash.slice(-4)}
              </span>
              <span className="px-2 py-1 bg-gray-800 rounded-full">
                {formatFileSize(doc.size)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-gray-800 rounded-full">
                Preview Only
              </span>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ViewConsent; 