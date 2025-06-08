import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import WalletQR from '../components/WalletQR';
import { DocumentTextIcon, ArrowRightIcon, CheckIcon, CameraIcon, ArrowUpTrayIcon, XMarkIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import QrScanner from 'qr-scanner';
import { storeConsentRequest } from '../services/mongoService';
import { createConsentRequest } from '../services/consentService';
import { QRCodeSVG } from 'qrcode.react';

const documentTypes = [
  { id: 'aadhar', name: 'Aadhar Card', icon: '🪪' },
  { id: 'pan', name: 'PAN Card', icon: '💳' },
  { id: 'driving', name: 'Driving License', icon: '🚗' },
  { id: 'passport', name: 'Passport', icon: '📘' },
  { id: 'medical', name: 'Medical Records', icon: '🏥' },
  { id: 'bank', name: 'Bank Statements', icon: '🏦' },
  { id: 'property', name: 'Property Documents', icon: '🏠' },
  { id: 'education', name: 'Educational Certificates', icon: '🎓' },
  { id: 'employment', name: 'Employment Records', icon: '💼' },
  { id: 'legal', name: 'Legal Documents', icon: '⚖️' },
  { id: 'tax', name: 'Tax Documents', icon: '📊' },
  { id: 'voter', name: 'Voter ID', icon: '🗳️' },
  { id: 'other', name: 'Others', icon: '📄' }
];

const RequestConsent = () => {
  const navigate = useNavigate();
  const { address } = useWallet();
  const [recipientAddress, setRecipientAddress] = useState('');
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [otherDocumentType, setOtherDocumentType] = useState('');
  const fileInputRef = useRef(null);
  const [showQRModal, setShowQRModal] = useState(false);
  const [qrCodeData, setQrCodeData] = useState(null);
  const [consentLink, setConsentLink] = useState('');
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  const handleAddressScanned = (scannedAddress) => {
    setRecipientAddress(scannedAddress);
    setShowScanner(false);
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      setError(null);
      
      // Create a FileReader to read the image
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        try {
          // Create an image element
          const img = new Image();
          img.src = e.target.result;
          
          await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
          });

          // Create a canvas to process the image
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          // Set canvas size to match image
          canvas.width = img.width;
          canvas.height = img.height;
          
          // Draw image on canvas
          ctx.drawImage(img, 0, 0);
          
          try {
            // Try to scan the QR code directly from the canvas
            const result = await QrScanner.scanImage(canvas, {
              returnDetailedScanResult: true,
              maxScansPerSecond: 1
            });
            
            if (result?.data) {
              console.log('Uploaded QR data:', result.data);
              setRecipientAddress(result.data);
            } else {
              setError('No QR code found in the image. Please try another image.');
            }
          } catch (scanError) {
            console.error('QR scan error:', scanError);
            setError('Could not read QR code from the image. Please try another image.');
          }
        } catch (error) {
          console.error('Error processing uploaded image:', error);
          setError('Error processing the image. Please try another one.');
        } finally {
          setLoading(false);
        }
      };

      reader.onerror = () => {
        setError('Error reading the file. Please try another one.');
        setLoading(false);
      };

      // Read the file as data URL
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('File upload error:', error);
      setError('Error uploading the file. Please try again.');
      setLoading(false);
    }
  };

  const handleDocumentSelection = (documentId) => {
    setSelectedDocuments(prev => {
      if (prev.includes(documentId)) {
        // If document is already selected, remove it
        return prev.filter(id => id !== documentId);
      } else {
        // If document is not selected, add it
        return [...prev, documentId];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!address) {
      setError('Please connect your wallet first');
      return;
    }
    if (!recipientAddress) {
      setError('Please enter or scan recipient address');
      return;
    }
    if (selectedDocuments.length === 0) {
      setError('Please select at least one document type');
      return;
    }
    if (selectedDocuments.includes('other') && !otherDocumentType) {
      setError('Please specify other document type');
      return;
    }
    if (!reason) {
      setError('Please enter reason for consent');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const request = await createConsentRequest({
        sender: address,
        recipient: recipientAddress,
        documentTypes: selectedDocuments,
        otherDocumentType: selectedDocuments.includes('other') ? otherDocumentType : undefined,
        reason
      });

      // Generate share URL and show share options
      const baseUrl = window.location.origin;
      const shareUrl = `${baseUrl}/grant-consent/${request.requestId}`;
      setShareUrl(shareUrl);
      setShowShareOptions(true);

    } catch (error) {
      console.error('Error creating consent request:', error);
      setError('Failed to create consent request. Please try again.');
    } finally {
      setLoading(false);
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

  const handleCloseAndRedirect = () => {
    setShowQRModal(false);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-blue-500/10 to-purple-500/10 blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto relative"
      >
        <div className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 mb-4"
          >
            Request Consent
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 text-lg"
          >
            Scan or enter the recipient's wallet address and provide document details
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-900/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-gray-800/50 relative overflow-hidden"
        >
          {/* Decorative SVG */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 0.1, x: 0 }}
            transition={{ duration: 1 }}
            className="absolute right-0 top-0 w-64 h-64 pointer-events-none"
          >
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="#3B82F6"
                d="M45.8,-65.2C58.9,-55.8,69.1,-41.9,74.2,-25.8C79.3,-9.7,79.3,8.6,73.9,24.8C68.5,41,57.7,55.1,43.1,63.1C28.5,71.1,10.2,73,-7.1,71.3C-24.4,69.6,-41.8,64.3,-54.1,53.3C-66.4,42.3,-73.6,25.6,-74.8,8.3C-76,-9,-71.2,-26.9,-61.5,-39.8C-51.8,-52.7,-37.2,-60.6,-22.8,-67.1C-8.4,-73.6,5.8,-78.7,19.3,-77.2C32.8,-75.7,45.6,-67.6,45.8,-65.2Z"
                transform="translate(100 100)"
              />
            </svg>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6 relative">
            <div className="space-y-4">
              <label className="block text-gray-300 font-medium">
                Recipient's Wallet Address
              </label>
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  placeholder="Enter wallet address"
                  className="flex-1 px-4 py-3 rounded-xl bg-gray-800/50 text-white placeholder-gray-400 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                />
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowScanner(true)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg transition-all flex items-center space-x-2 font-medium"
                >
                  <CameraIcon className="w-5 h-5" />
                  <span>Scan QR</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg transition-all flex items-center space-x-2 font-medium"
                >
                  <ArrowUpTrayIcon className="w-5 h-5" />
                  <span>Upload QR</span>
                </motion.button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-gray-300 font-medium">
                Select Document Types
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {documentTypes.map((type) => (
                  <motion.button
                    key={type.id}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => handleDocumentSelection(type.id)}
                    className={`p-4 rounded-xl border transition-all flex items-center space-x-3 ${
                      selectedDocuments.includes(type.id)
                        ? 'bg-blue-500/20 border-blue-500/50'
                        : 'bg-gray-800/50 border-gray-700 hover:border-blue-500/50'
                    }`}
                  >
                    <span className="text-2xl">{type.icon}</span>
                    <span className="text-gray-300 font-medium">{type.name}</span>
                    {selectedDocuments.includes(type.id) && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-auto"
                      >
                        <CheckIcon className="w-5 h-5 text-blue-500" />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {selectedDocuments.includes('other') && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4"
              >
                <label className="block text-gray-300 font-medium">
                  Specify Other Document Type
                </label>
                <input
                  type="text"
                  value={otherDocumentType}
                  onChange={(e) => setOtherDocumentType(e.target.value)}
                  placeholder="Specify other document type"
                  className="w-full px-4 py-3 rounded-xl bg-gray-800/50 text-white placeholder-gray-400 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                />
              </motion.div>
            )}

            <div className="space-y-4">
              <label className="block text-gray-300 font-medium">
                Reason for Consent
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Enter reason for requesting consent"
                rows="4"
                className="w-full px-4 py-3 rounded-xl bg-gray-800/50 text-white placeholder-gray-400 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all resize-none"
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-500/20 rounded-xl text-red-400 border border-red-500/40"
              >
                {error}
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-green-500/20 rounded-xl text-green-400 border border-green-500/40"
              >
                Consent request sent successfully!
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                <>
                  <DocumentTextIcon className="w-5 h-5" />
                  <span>Create Consent Request</span>
                  <ArrowRightIcon className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {showScanner && (
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
              className="w-full max-w-md"
            >
              <WalletQR
                onAddressScanned={handleAddressScanned}
                showShareButtons={false}
                showQR={false}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* QR Code Modal */}
      {showQRModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Consent Request Created!</h3>
              <button
                onClick={handleCloseAndRedirect}
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
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                    </svg>
                    <span>Share on Telegram</span>
                  </button>
                </div>

                <button
                  onClick={handleCloseAndRedirect}
                  className="w-full mt-6 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                >
                  Go to Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
    </div>
  );
};

export default RequestConsent; 