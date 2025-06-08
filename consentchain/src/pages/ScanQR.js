import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { QrCodeIcon, CameraIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useWallet } from '../context/WalletContext';
import QrScanner from 'qr-scanner/qr-scanner.min.js';

const ScanQR = () => {
  const { address } = useWallet();
  const [scanning, setScanning] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [error, setError] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const videoRef = React.useRef(null);
  const scannerRef = React.useRef(null);

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop();
      }
    };
  }, []);

  const startScanning = async () => {
    try {
      setError(null);
      setScanning(true);
      setScannedData(null);
      setShowResult(false);

      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      scannerRef.current = new QrScanner(
        videoRef.current,
        (result) => {
          handleScanResult(result);
        },
        {
          returnDetailedScanResult: true,
          highlightScanRegion: true,
          highlightCodeOutline: true,
          overlay: document.createElement('div')
        }
      );

      await scannerRef.current.start();
    } catch (err) {
      console.error('Error starting scanner:', err);
      setError('Failed to access camera. Please ensure you have granted camera permissions.');
      setScanning(false);
    }
  };

  const stopScanning = () => {
    if (scannerRef.current) {
      scannerRef.current.stop();
    }
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
    }
    setScanning(false);
  };

  const handleScanResult = (result) => {
    try {
      const data = JSON.parse(result.data);
      if (!data.requestId || !data.sender || !data.documents) {
        throw new Error('Invalid QR code data');
      }
      setScannedData(data);
      setShowResult(true);
      stopScanning();
    } catch (err) {
      console.error('Error parsing QR code:', err);
      setError('Invalid QR code. Please scan a valid consent request QR code.');
    }
  };

  const handleGrantConsent = async () => {
    if (!scannedData) return;

    try {
      // TODO: Implement consent granting logic
      console.log('Granting consent for:', scannedData);
      alert('Consent granted successfully!');
      setShowResult(false);
      setScannedData(null);
    } catch (err) {
      console.error('Error granting consent:', err);
      setError('Failed to grant consent. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-8 text-center">
            Scan Consent Request
          </h1>

          {!scanning && !showResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg p-8 text-center"
            >
              <QrCodeIcon className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-white mb-4">
                Scan a Consent Request QR Code
              </h2>
              <p className="text-gray-400 mb-6">
                Point your camera at a consent request QR code to view and grant access to documents.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startScanning}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
              >
                <CameraIcon className="w-5 h-5" />
                Start Scanning
              </motion.button>
            </motion.div>
          )}

          {scanning && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg overflow-hidden"
            >
              <video
                ref={videoRef}
                className="w-full aspect-square object-cover"
                playsInline
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 border-2 border-blue-500 rounded-lg" />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={stopScanning}
                className="absolute top-4 right-4 p-2 bg-gray-900/80 rounded-full hover:bg-gray-900 transition-colors"
              >
                <XMarkIcon className="w-6 h-6 text-white" />
              </motion.button>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-center"
            >
              {error}
            </motion.div>
          )}

          {showResult && scannedData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg p-6 mt-4"
            >
              <h2 className="text-xl font-semibold text-white mb-4">
                Consent Request Details
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400 text-sm">Request ID</p>
                  <p className="text-white font-mono">{scannedData.requestId}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">From</p>
                  <p className="text-white font-mono">{scannedData.sender}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Requested Documents</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {scannedData.documents.map((doc) => (
                      <span
                        key={doc}
                        className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm"
                      >
                        {doc}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Reason</p>
                  <p className="text-white">{scannedData.reason}</p>
                </div>
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setShowResult(false);
                    setScannedData(null);
                  }}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleGrantConsent}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                >
                  Grant Access
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScanQR; 