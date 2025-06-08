import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DocumentTextIcon,
  DocumentCheckIcon,
  DocumentArrowUpIcon,
  XMarkIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowPathIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  ShieldExclamationIcon,
  UserGroupIcon,
  BellIcon,
  CalendarIcon,
  ArrowUpTrayIcon,
  ArrowTrendingUpIcon,
  ArrowRightIcon,
  QrCodeIcon,
  UserIcon,
  EyeIcon,
  DocumentDuplicateIcon,
  DocumentXMarkIcon
} from '@heroicons/react/24/outline';
import { useWallet } from '../context/WalletContext';
import { useNavigate, Link } from 'react-router-dom';
import WalletQR from '../components/WalletQR';
import { uploadToIPFS } from '../services/ipfsService.js';
import { storeConsentRequest, updateConsentRequest, getDocuments } from '../services/mongoService.js';
import { getConsentRequests } from '../services/consentService';
import { formatDistanceToNow } from 'date-fns';
import { Dialog } from '@headlessui/react';

const APP_ID = 740703196;
const ALGONODE_API = 'https://testnet-api.algonode.cloud';
const TARGET_WALLET = 'TUT5KEYDFMBR44DQDJ6QQT3DNAC7SYJHW4ACCEVZIYSW62GDTRX7KFJA4M';

function decodeB64(b64) {
  try {
    return atob(b64);
  } catch {
    return '';
  }
}

function decodeUint(b64) {
  try {
    const bytes = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
    let val = 0;
    for (let i = 0; i < bytes.length; i++) val = (val << 8) + bytes[i];
    return val;
  } catch {
    return 0;
  }
}

const SecurePreview = ({ doc, onClose }) => {
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
              src={`https://ipfs.io/ipfs/${doc.ipfsHash}`}
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

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};

const formatTime = (dateString) => {
  return new Date(dateString).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

const formatFileSize = (bytes) => {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
};

const Dashboard = () => {
  const { address } = useWallet();
  const [stats, setStats] = useState({
    totalRequests: 0,
    activeConsents: 0,
    pendingRequests: 0,
    revokedConsents: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [documentStats, setDocumentStats] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [consentRequests, setConsentRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showGrantModal, setShowGrantModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [expiryDate, setExpiryDate] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [ipfsHash, setIpfsHash] = useState('');
  const [availableDocuments, setAvailableDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showDigiLocker, setShowDigiLocker] = useState(false);
  const [digiLockerDocuments, setDigiLockerDocuments] = useState([]);
  const [showQRModal, setShowQRModal] = useState(false);
  const [qrCodeData, setQrCodeData] = useState(null);
  const [consentLink, setConsentLink] = useState('');
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('pending'); // 'pending', 'approved', 'rejected'
  const [error, setError] = useState(null);

  const fetchConsentRequests = async () => {
    if (!address) return;

    try {
      setLoading(true);
      console.log('Fetching consent requests for address:', address);
      
      // Fetch both sent and received requests
      const [sentRequests, receivedRequests] = await Promise.all([
        getConsentRequests(address, 'sender'),
        getConsentRequests(address, 'recipient')
      ]);

      console.log('Sent requests:', sentRequests);
      console.log('Received requests:', receivedRequests);

      // Combine and deduplicate requests
      const allRequests = [...sentRequests, ...receivedRequests];
      const uniqueRequests = Array.from(new Map(allRequests.map(req => [req.requestId, req])).values());

      console.log('All unique requests:', uniqueRequests);

      // Update stats with proper filtering
      const stats = {
        totalRequests: uniqueRequests.length,
        pendingRequests: uniqueRequests.filter(r => r.status === 'pending').length,
        approvedRequests: uniqueRequests.filter(r => r.status === 'granted').length,
        rejectedRequests: uniqueRequests.filter(r => r.status === 'revoked').length,
        activeConsents: uniqueRequests.filter(r => r.status === 'granted').length
      };
      
      console.log('Updated stats:', stats);
      console.log('Approved requests:', uniqueRequests.filter(r => r.status === 'granted'));
      
      setConsentRequests(uniqueRequests);
      setStats(stats);
      setError(null);
    } catch (err) {
      console.error('Error fetching consent requests:', err);
      setError('Failed to fetch consent requests');
    } finally {
      setLoading(false);
    }
  };

  // Add a useEffect to log stats changes
  useEffect(() => {
    console.log('Current stats:', stats);
  }, [stats]);

  // Add a useEffect to log consent requests changes
  useEffect(() => {
    console.log('Current consent requests:', consentRequests);
  }, [consentRequests]);

  useEffect(() => {
    if (!address) {
      navigate('/');
      return;
    }

    fetchConsentRequests();
    const interval = setInterval(fetchConsentRequests, 30000); // Poll every 30 seconds
    return () => clearInterval(interval);
  }, [address, navigate]);

  // Fetch available documents
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

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      const ipfsHash = await uploadToIPFS(file);
      setIpfsHash(ipfsHash);
      setUploadedFile(file);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  const handleGrantConsent = async (requestId) => {
    const request = consentRequests.find(req => req.requestId === requestId);
    setSelectedRequest(request);
    setShowGrantModal(true);
  };

  const handleRejectConsent = async (requestId) => {
    try {
      const updateData = {
        status: 'revoked',
        revokedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      console.log('Rejecting consent request with data:', updateData);
      await updateConsentRequest(requestId, updateData);
      
      // Immediately fetch updated data
      await fetchConsentRequests();
    } catch (error) {
      console.error('Error rejecting consent:', error);
      setError('Failed to reject consent');
    }
  };

  const handleGrantSubmit = async () => {
    if (!expiryDate) {
      alert('Please select an expiry date');
      return;
    }
    if (!uploadedFile && !selectedDocument) {
      alert('Please upload a document or select one from DigiLocker');
      return;
    }

    try {
      const documentData = selectedDocument || {
        name: uploadedFile.name,
        type: uploadedFile.type,
        size: uploadedFile.size,
        ipfsHash
      };

      const updateData = {
        status: 'granted',
        document: documentData,
        expiryDate,
        grantedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      console.log('Updating consent request with data:', updateData);
      await updateConsentRequest(selectedRequest.requestId, updateData);

      // Close modal and refresh data
      setShowGrantModal(false);
      setSelectedRequest(null);
      setExpiryDate('');
      setUploadedFile(null);
      setIpfsHash('');
      setSelectedDocument(null);
      
      // Immediately fetch updated data
      await fetchConsentRequests();
    } catch (error) {
      console.error('Error granting consent:', error);
      setError('Failed to grant consent');
    }
  };

  // Check for target wallet address in requests
  useEffect(() => {
    if (consentRequests.length > 0) {
      const targetRequest = consentRequests.find(req => req.requester === TARGET_WALLET);
      if (targetRequest) {
        setNotifications(prev => [{
          id: targetRequest.requestId,
          type: 'request',
          message: `New consent request from ${TARGET_WALLET.substring(0, 6)}...${TARGET_WALLET.substring(TARGET_WALLET.length - 4)}`,
          timestamp: new Date().toISOString()
        }, ...prev]);
      }
    }
  }, [consentRequests]);

  const handleRevokeConsent = async (requestId) => {
    try {
      const updateData = {
        status: 'revoked',
        revokedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      console.log('Revoking consent request with data:', updateData);
      await updateConsentRequest(requestId, updateData);
      
      // Immediately fetch updated data
      await fetchConsentRequests();
    } catch (error) {
      console.error('Error revoking consent:', error);
      setError('Failed to revoke consent');
    }
  };

  // Add function to check if consent is expired
  const isConsentExpired = (request) => {
    if (!request.expiry) return false;
    return new Date(request.expiry) < new Date();
  };

  // Add function to handle expired consents
  const handleExpiredConsents = async () => {
    const expiredRequests = consentRequests.filter(
      request => request.status === 'granted' && isConsentExpired(request)
    );

    for (const request of expiredRequests) {
      await handleRevokeConsent(request.requestId);
    }
  };

  // Check for expired consents periodically
  useEffect(() => {
    const checkExpiredConsents = async () => {
      await handleExpiredConsents();
    };

    const interval = setInterval(checkExpiredConsents, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [consentRequests]);

  const handleConsentRequest = async (request) => {
    try {
      const requestId = Date.now().toString();
      const newRequest = {
        ...request,
        requestId,
        requester: address.toString(),
        createdAt: new Date(),
        status: 'pending'
      };

      // Store in MongoDB
      await storeConsentRequest(newRequest);

      // Generate QR code and link
      const qrData = {
        requestId,
        requester: address.toString(),
        documentType: request.documentType,
        purpose: request.purpose
      };
      const qrCode = await generateQRCode(qrData);
      const link = generateConsentLink(requestId);

      // Create notification
      await createNotification({
        type: 'consent_request',
        recipient: request.recipient,
        requester: address.toString(),
        documentType: request.documentType,
        requestId,
        qrCode,
        link
      });

      setQrCodeData(qrCode);
      setConsentLink(link);
      setShowQRModal(true);

      // Refresh data
      await fetchConsentRequests();
    } catch (error) {
      console.error('Error creating consent request:', error);
    }
  };

  const handleShare = (platform) => {
    const message = `Please review and grant consent for my Aadhar card verification. Click here: ${consentLink}`;
    let shareUrl = '';

    switch (platform) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
        break;
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=${encodeURIComponent(consentLink)}&text=${encodeURIComponent(message)}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, '_blank');
  };

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 ${color} hover:bg-gray-700/50 transition-colors`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
        </div>
        <div className="p-3 rounded-full bg-gray-700/50">
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </motion.div>
  );

  const ActivityItem = ({ activity }) => {
    const getIcon = () => {
      switch (activity.type) {
        case 'grant':
          return <DocumentCheckIcon className="w-5 h-5 text-green-500" />;
        case 'request':
          return <ClockIcon className="w-5 h-5 text-blue-500" />;
        case 'revoke':
          return <XMarkIcon className="w-5 h-5 text-red-500" />;
        default:
          return null;
      }
    };

    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-4 py-3 border-b border-gray-700/50 last:border-0"
      >
        {getIcon()}
        <div>
          <p className="text-white">
            <span className="font-semibold">{activity.user}</span>
            {' '}
            {activity.type === 'grant' ? 'granted access to' : 
             activity.type === 'request' ? 'requested access to' : 
             'revoked access to'}
            {' '}
            <span className="font-semibold">{activity.document}</span>
          </p>
          <p className="text-sm text-gray-400">
            {new Date(activity.timestamp).toLocaleString()}
          </p>
        </div>
      </motion.div>
    );
  };

  if (loading && consentRequests.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-400">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  const filteredRequests = consentRequests.filter(request => {
    switch (activeTab) {
      case 'pending':
        return request.status === 'pending';
      case 'approved':
        return request.status === 'granted';
      case 'rejected':
        return request.status === 'revoked';
      default:
        return true;
    }
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50';
      case 'granted':
        return 'bg-green-500/20 text-green-500 border-green-500/50';
      case 'revoked':
        return 'bg-red-500/20 text-red-500 border-red-500/50';
      default:
        return 'bg-gray-500/20 text-gray-500 border-gray-500/50';
    }
  };

  const handleRequestClick = (request) => {
    if (request.status === 'pending') {
      navigate(`/grant-consent/${request.requestId}`);
    } else {
      navigate(`/view-consent/${request.requestId}`);
    }
  };

  const getDocumentIcon = (type) => {
    if (type?.includes('image')) return '🖼️';
    if (type?.includes('pdf')) return '📄';
    if (type?.includes('word')) return '📝';
    return '📁';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const truncateAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900 via-gray-900 to-gray-900">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Dashboard
            </h1>
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/request-consent')}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 flex items-center gap-2"
              >
                <DocumentTextIcon className="w-5 h-5" />
                Request Consent
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/scan-qr')}
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200 flex items-center gap-2"
              >
                <QrCodeIcon className="w-5 h-5" />
                Scan QR
              </motion.button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Requests"
              value={stats.totalRequests}
              icon={ChartBarIcon}
              color="hover:bg-blue-500/10 transition-colors backdrop-blur-sm"
            />
            <StatCard
              title="Pending Requests"
              value={stats.pendingRequests}
              icon={ClockIcon}
              color="hover:bg-yellow-500/10 transition-colors backdrop-blur-sm"
            />
            <StatCard
              title="Approved Requests"
              value={stats.approvedRequests}
              icon={CheckCircleIcon}
              color="hover:bg-green-500/10 transition-colors backdrop-blur-sm"
            />
            <StatCard
              title="Rejected Requests"
              value={stats.rejectedRequests}
              icon={XCircleIcon}
              color="hover:bg-red-500/10 transition-colors backdrop-blur-sm"
            />
          </div>

          {/* Granted Documents Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
                <DocumentCheckIcon className="w-6 h-6 text-green-400" />
                Granted Documents
              </h2>
              <Link
                to="/consented-documents"
                className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
              >
                View All
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {consentRequests
                .filter(request => request.status === 'granted')
                .sort((a, b) => {
                  const dateA = new Date(a.grantedAt || a.updatedAt);
                  const dateB = new Date(b.grantedAt || b.updatedAt);
                  return dateB - dateA;
                })
                .slice(0, 3)
                .map(request => (
                  <motion.div
                    key={request.requestId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-200 backdrop-blur-sm"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-2xl">
                          {getDocumentIcon(request.document?.type || request.documentType)}
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-medium truncate">
                          {request.document?.name || request.documentType || 'Document'}
                        </h3>
                        {request.reason && (
                          <p className="text-sm text-gray-400 mt-1 truncate">
                            {request.reason}
                          </p>
                        )}
                        <div className="mt-2 flex items-center gap-2">
                          <span className="px-2 py-1 text-xs rounded-full bg-gray-700/50 text-gray-300 flex items-center gap-1 backdrop-blur-sm">
                            <UserIcon className="w-3 h-3" />
                            <span className="truncate">
                              Granted to: {truncateAddress(request.recipient)}
                            </span>
                          </span>
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="px-2 py-1 text-xs rounded-full bg-gray-700/50 text-gray-300 flex items-center gap-1 backdrop-blur-sm">
                            <ClockIcon className="w-3 h-3" />
                            Expires: {request.expiry ? formatDate(request.expiry) : 'No expiry'}
                          </span>
                        </div>
                      </div>

                      <div className="flex-shrink-0">
                        <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-400 border border-green-500/50 backdrop-blur-sm">
                          Granted
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                      <button
                        onClick={() => handleRevokeConsent(request.requestId)}
                        className="flex-1 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors flex items-center justify-center gap-2 backdrop-blur-sm"
                      >
                        <XMarkIcon className="w-4 h-4" />
                        Revoke
                      </button>
                      <button
                        onClick={() => navigate(`/view-consent/${request.requestId}`)}
                        className="flex-1 px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors flex items-center justify-center gap-2 backdrop-blur-sm"
                      >
                        <EyeIcon className="w-4 h-4" />
                        View Details
                      </button>
                    </div>
                  </motion.div>
                ))}
              {consentRequests.filter(request => request.status === 'granted').length === 0 && (
                <div className="col-span-full text-center py-8 bg-gray-800/30 rounded-lg border border-gray-700/50 backdrop-blur-sm">
                  <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-500" />
                  <h3 className="mt-2 text-sm font-medium text-gray-400">No granted documents</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Documents you've granted consent for will appear here
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Consent Requests Section */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-700/50">
              <h2 className="text-xl font-semibold text-white">Consent Requests</h2>
            </div>

            {/* Status Tabs */}
            <div className="border-b border-gray-700/50">
              <nav className="flex space-x-8 px-6">
                {['pending', 'granted', 'revoked'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`${
                      activeTab === tab
                        ? 'border-blue-500 text-blue-500'
                        : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {error && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6">
                  <p className="text-red-500">{error}</p>
                </div>
              )}

              {filteredRequests.length === 0 ? (
                <div className="text-center py-12">
                  <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-500" />
                  <h3 className="mt-2 text-sm font-medium text-gray-400">No {activeTab} requests</h3>
                  <p className="mt-1 text-sm text-gray-500">Get started by creating a new consent request.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredRequests
                    .filter(request => request.status === activeTab)
                    .map((request) => (
                      <div
                        key={request.requestId}
                        onClick={() => handleRequestClick(request)}
                        className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4 hover:bg-gray-700/50 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-medium text-white">
                              {request.sender === address ? 'Sent to: ' : 'From: '}
                              {request.sender === address ? request.recipient : request.sender}
                            </h3>
                            <p className="text-sm text-gray-400">
                              Document Types: {request.documentTypes?.join(', ') || 'N/A'}
                            </p>
                            <p className="text-sm text-gray-400">
                              Reason: {request.reason || 'No reason provided'}
                            </p>
                            <p className="text-sm text-gray-400">
                              Created {request.createdAt ? formatDistanceToNow(new Date(request.createdAt), { addSuffix: true }) : 'Recently'}
                            </p>
                            {request.status === 'granted' && request.expiry && (
                              <p className="text-sm text-gray-400">
                                Expires {formatDistanceToNow(new Date(request.expiry), { addSuffix: true })}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-4">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(request.status)}`}>
                              {request.status}
                            </span>
                            {request.status === 'granted' && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRevokeConsent(request.requestId);
                                }}
                                className="px-3 py-1 text-sm font-medium text-red-400 hover:text-red-300 transition-colors"
                              >
                                Revoke
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>

          {/* Modals */}
          <AnimatePresence>
            {showGrantModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-gray-800/90 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 w-full max-w-md"
                >
                  <h3 className="text-xl font-semibold text-white mb-4">Handle Consent Request</h3>
                  <div className="space-y-4">
                    {/* Document Request Info */}
                    <div className="bg-gray-700/30 rounded-lg p-4">
                      <h4 className="text-white font-medium mb-2">Requested Document</h4>
                      <p className="text-gray-300">{selectedRequest?.documentType}</p>
                      <p className="text-sm text-gray-400 mt-2">
                        From: {selectedRequest?.sender.slice(0, 6)}...{selectedRequest?.sender.slice(-4)}
                      </p>
                    </div>

                    {/* Document Selection */}
                    <div>
                      <label className="block text-gray-300 text-sm mb-2">Select Document Source</label>
                      <div className="flex space-x-4 mb-4">
                        <button
                          onClick={() => setShowDigiLocker(false)}
                          className={`flex-1 px-4 py-2 rounded-lg ${
                            !showDigiLocker
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-700/50 text-gray-300'
                          }`}
                        >
                          Upload New
                        </button>
                        <button
                          onClick={() => setShowDigiLocker(true)}
                          className={`flex-1 px-4 py-2 rounded-lg ${
                            showDigiLocker
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-700/50 text-gray-300'
                          }`}
                        >
                          DigiLocker
                        </button>
                      </div>

                      {!showDigiLocker ? (
                        <div className="space-y-4">
                          <div className="flex items-center space-x-4">
                            <input
                              type="file"
                              onChange={handleFileUpload}
                              className="hidden"
                              id="document-upload"
                            />
                            <label
                              htmlFor="document-upload"
                              className="flex-1 px-4 py-2 bg-gray-700/50 text-white rounded-lg border border-gray-600 hover:bg-gray-700 cursor-pointer flex items-center justify-center space-x-2"
                            >
                              <ArrowUpTrayIcon className="w-5 h-5" />
                              <span>{uploadedFile ? 'Change File' : 'Choose File'}</span>
                            </label>
                          </div>
                          {uploading && (
                            <div className="flex items-center justify-center">
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full"
                              />
                            </div>
                          )}
                          {uploadedFile && (
                            <p className="text-sm text-gray-400">
                              {uploadedFile.name} {ipfsHash && `(IPFS: ${ipfsHash})`}
                            </p>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                          {availableDocuments.map((doc) => (
                            <div
                              key={doc._id}
                              onClick={() => setSelectedDocument(doc)}
                              className={`p-3 rounded-lg cursor-pointer ${
                                selectedDocument?._id === doc._id
                                  ? 'bg-blue-600/20 border border-blue-500'
                                  : 'bg-gray-700/50 hover:bg-gray-700'
                              }`}
                            >
                              <p className="text-white">{doc.name}</p>
                              <p className="text-sm text-gray-400">IPFS: {doc.ipfsHash}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-300 text-sm mb-2">Expiry Date</label>
                      <input
                        type="date"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-gray-700/50 text-white border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                      />
                    </div>

                    <div className="flex justify-end space-x-3 mt-6">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleRejectConsent(selectedRequest.requestId)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      >
                        Reject
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowGrantModal(false)}
                        className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                      >
                        Cancel
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleGrantSubmit}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Grant Consent
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {showQRModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-white rounded-lg p-8 max-w-md w-full"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold">Consent Request QR Code</h3>
                    <button
                      onClick={() => setShowQRModal(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <XMarkIcon className="w-6 h-6" />
                    </button>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
                      <img src={qrCodeData} alt="QR Code" className="w-64 h-64" />
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4 text-center">
                      Share this QR code or link with the recipient to request consent
                    </p>
                    
                    <div className="w-full space-y-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={consentLink}
                          readOnly
                          className="flex-1 p-2 border rounded bg-gray-50"
                        />
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(consentLink);
                            alert('Link copied to clipboard!');
                          }}
                          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                        >
                          Copy
                        </button>
                      </div>

                      <div className="flex justify-center space-x-4 mt-6">
                        <button
                          onClick={() => handleShare('whatsapp')}
                          className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                          </svg>
                          <span>Share on WhatsApp</span>
                        </button>
                        
                        <button
                          onClick={() => handleShare('telegram')}
                          className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.347.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                          </svg>
                          <span>Share on Telegram</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {selectedDocument && (
        <SecurePreview
          doc={selectedDocument}
          onClose={() => setSelectedDocument(null)}
        />
      )}
    </div>
  );
};

export default Dashboard; 