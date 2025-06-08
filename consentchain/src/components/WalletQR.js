import React, { useState, useRef, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import QrScanner from 'qr-scanner';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCodeIcon, CameraIcon, ShareIcon, XMarkIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { useWallet } from '../context/WalletContext';

const WalletQR = ({ onAddressScanned, showShareButtons = true, isNavbar = false, showQR: externalShowQR, onClose }) => {
  const { address } = useWallet();
  const [showScanner, setShowScanner] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const videoRef = useRef(null);
  const scannerRef = useRef(null);
  const qrRef = useRef(null);
  const fileInputRef = useRef(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [scanError, setScanError] = useState(null);
  const [lastScannedData, setLastScannedData] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const startScanner = async () => {
    try {
      setScanError(null);
      setLastScannedData(null);
      
      // First check if we have camera access
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });

      // Set the stream to the video element
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();

        // Initialize QR Scanner with proper configuration
        const scanner = new QrScanner(
          videoRef.current,
          (result) => {
            if (result?.data) {
              console.log('Scanned data:', result.data); // Debug log
              setLastScannedData(result.data);
              
              try {
                // More lenient validation - just check if it's a string
                if (typeof result.data === 'string' && result.data.length > 0) {
                  onAddressScanned?.(result.data);
                  setShowScanner(false);
                  setScanning(false);
                  // Stop the camera stream
                  stream.getTracks().forEach(track => track.stop());
                } else {
                  setScanError('Invalid QR code format. Please try again.');
                }
              } catch (error) {
                console.error('Scan processing error:', error); // Debug log
                setScanError('Error processing QR code. Please try again.');
              }
            }
          },
          {
            highlightScanRegion: true,
            highlightCodeOutline: true,
            returnDetailedScanResult: true,
            maxScansPerSecond: 15,
            overlay: null
          }
        );

        // Start scanning
        await scanner.start();
        scannerRef.current = scanner;
        setScanning(true);
        setCameraError(null);
      }
    } catch (error) {
      console.error('Camera permission error:', error);
      setCameraError('Camera access denied. Please allow camera access to scan QR codes.');
      setScanning(false);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setScanError(null);
      
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
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);

          // Get the image data
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          
          // Use QrScanner to decode the image
          const result = await QrScanner.scanImage(imageData);
          
          if (result?.data) {
            console.log('Uploaded QR data:', result.data);
            setLastScannedData(result.data);
            onAddressScanned?.(result.data);
            setShowScanner(false);
          } else {
            setScanError('No QR code found in the image. Please try another image.');
          }
        } catch (error) {
          console.error('Error processing uploaded image:', error);
          setScanError('Error processing the image. Please try another one.');
        } finally {
          setIsUploading(false);
        }
      };

      reader.onerror = () => {
        setScanError('Error reading the file. Please try another one.');
        setIsUploading(false);
      };

      // Read the file as data URL
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('File upload error:', error);
      setScanError('Error uploading the file. Please try again.');
      setIsUploading(false);
    }
  };

  useEffect(() => {
    if (showScanner) {
      startScanner();
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop();
        scannerRef.current.destroy();
        setScanning(false);
      }
      // Stop any active camera streams
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, [showScanner]);

  const downloadQRCode = () => {
    if (!address || !qrRef.current) return;

    try {
      const svg = qrRef.current.querySelector('svg');
      if (!svg) return;

      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      canvas.width = 200;
      canvas.height = 200;
      
      img.onload = () => {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        const pngFile = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.download = `wallet-qr-${address.slice(0, 8)}.png`;
        downloadLink.href = pngFile;
        downloadLink.click();
        
        setDownloadSuccess(true);
        setTimeout(() => setDownloadSuccess(false), 2000);
      };
      
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      img.src = URL.createObjectURL(svgBlob);
    } catch (error) {
      console.error('Error downloading QR code:', error);
    }
  };

  const shareViaWhatsApp = () => {
    if (!address) return;
    const text = `My Algorand Wallet Address: ${address}`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://api.whatsapp.com/send?text=${encodedText}`, '_blank');
  };

  const shareViaTelegram = () => {
    if (!address) return;
    const text = `My Algorand Wallet Address: ${address}`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodedText}`, '_blank');
  };

  const copyToClipboard = async () => {
    if (!address) return;
    try {
      await navigator.clipboard.writeText(address);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };

  if (isNavbar) {
    return (
      <div className="relative">
        <AnimatePresence>
          {externalShowQR && address && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-2 p-6 bg-gray-800/90 backdrop-blur-lg rounded-xl shadow-2xl z-50 border border-gray-700/50"
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="relative w-full">
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="absolute -top-2 -right-2 p-2 bg-gray-700/50 rounded-full hover:bg-gray-600/50 transition-colors"
                  >
                    <XMarkIcon className="w-4 h-4 text-gray-300" />
                  </motion.button>
                </div>
                <div className="text-center mb-2">
                  <h3 className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                    My Algorand Wallet Address
                  </h3>
                </div>
                <div ref={qrRef} className="bg-white p-4 rounded-lg shadow-lg">
                  <QRCodeSVG value={address} size={200} />
                </div>
                <div className="text-sm text-gray-300 break-all text-center max-w-[200px] font-medium">
                  {address}
                </div>
                {showShareButtons && (
                  <div className="flex flex-col space-y-3 w-full">
                    <div className="flex space-x-3">
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={shareViaWhatsApp}
                        className="flex-1 p-3 bg-gray-700/50 text-gray-300 rounded-lg hover:bg-gray-600/50 transition-colors font-medium"
                      >
                        WhatsApp
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={shareViaTelegram}
                        className="flex-1 p-3 bg-gray-700/50 text-gray-300 rounded-lg hover:bg-gray-600/50 transition-colors font-medium"
                      >
                        Telegram
                      </motion.button>
                    </div>
                    <div className="flex space-x-3">
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={downloadQRCode}
                        className={`flex-1 p-3 text-gray-300 rounded-lg transition-colors font-medium ${
                          downloadSuccess ? 'bg-green-500/20' : 'bg-gray-700/50 hover:bg-gray-600/50'
                        }`}
                      >
                        {downloadSuccess ? 'Downloaded!' : 'Download QR'}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={copyToClipboard}
                        className={`flex-1 p-3 text-gray-300 rounded-lg transition-colors font-medium ${
                          copySuccess ? 'bg-green-500/20' : 'bg-gray-700/50 hover:bg-gray-600/50'
                        }`}
                      >
                        {copySuccess ? 'Copied!' : 'Copy Address'}
                      </motion.button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="flex space-x-4">
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowScanner(!showScanner)}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg transition-all flex items-center space-x-2 font-medium"
        >
          <CameraIcon className="w-5 h-5" />
          <span>Scan QR Code</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => fileInputRef.current?.click()}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg transition-all flex items-center space-x-2 font-medium"
        >
          <ArrowUpTrayIcon className="w-5 h-5" />
          <span>Upload QR Code</span>
        </motion.button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>

      <AnimatePresence>
        {showScanner && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative w-full max-w-md aspect-square"
          >
            {cameraError ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-6 bg-red-500/20 rounded-xl text-red-400 border border-red-500/40 text-center"
              >
                <p className="mb-4">{cameraError}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startScanner}
                  className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-white transition-colors"
                >
                  Try Again
                </motion.button>
              </motion.div>
            ) : scanError ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-6 bg-yellow-500/20 rounded-xl text-yellow-400 border border-yellow-500/40 text-center"
              >
                <p className="mb-4">{scanError}</p>
                {lastScannedData && (
                  <p className="text-sm mb-4">Last scanned: {lastScannedData}</p>
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setScanError(null)}
                  className="px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 rounded-lg text-white transition-colors"
                >
                  Try Again
                </motion.button>
              </motion.div>
            ) : isUploading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-6 bg-blue-500/20 rounded-xl text-blue-400 border border-blue-500/40 text-center"
              >
                <div className="flex items-center justify-center space-x-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-6 h-6 border-2 border-t-transparent border-blue-500 rounded-full"
                  />
                  <span>Processing QR Code...</span>
                </div>
              </motion.div>
            ) : (
              <div className="relative w-full h-full">
                <video 
                  ref={videoRef}
                  className="w-full h-full rounded-xl shadow-2xl object-cover"
                  playsInline
                  autoPlay
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <motion.div
                    animate={{
                      scale: [1, 1.02, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="w-64 h-64 border-4 border-blue-500 rounded-xl"
                  />
                </div>
                {scanning && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <motion.div
                      animate={{
                        rotate: 360,
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      className="w-16 h-16 border-4 border-t-transparent border-blue-500 rounded-full"
                    />
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WalletQR; 