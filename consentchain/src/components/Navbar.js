import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  DocumentIcon, 
  WalletIcon,
  QrCodeIcon,
  ClipboardDocumentCheckIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import { useWallet } from '../context/WalletContext';
import WalletQR from './WalletQR';

const Navbar = () => {
  const { isConnectedToPeraWallet, connectWallet, disconnectWallet, address } = useWallet();
  const [isDigiLockerConnected, setIsDigiLockerConnected] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const handleDigiLockerConnect = async () => {
    // Mock DigiLocker connection
    setIsDigiLockerConnected(true);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-lg border-b border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              ConsentChain
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors">
              Home
            </Link>
            {isConnectedToPeraWallet && (
              <>
                <Link to="/documents" className="text-gray-300 hover:text-white transition-colors">
                  Documents
                </Link>
                <Link to="/request-consent" className="text-gray-300 hover:text-white transition-colors">
                  Request Consent
                </Link>
                <Link to="/grant-consent" className="text-gray-300 hover:text-white transition-colors">
                  Grant Consent
                </Link>
                <Link to="/scan-qr" className="text-gray-300 hover:text-white transition-colors">
                  Scan QR
                </Link>
                <Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors">
                  Dashboard
                </Link>
              </>
            )}
            <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
              About
            </Link>
          </div>

          {/* Connect Buttons */}
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={isConnectedToPeraWallet ? disconnectWallet : connectWallet}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <WalletIcon className="w-5 h-5" />
              {isConnectedToPeraWallet ? 'Disconnect Wallet' : 'Connect Pera Wallet'}
            </motion.button>

            {isConnectedToPeraWallet && (
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDigiLockerConnect}
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <DocumentIcon className="w-5 h-5" />
                {isDigiLockerConnected ? 'DigiLocker Connected' : 'Connect DigiLocker'}
              </motion.button>
            )}

            {isConnectedToPeraWallet && (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowQR(!showQR)}
                  className="p-2 text-gray-300 hover:text-white transition-colors"
                >
                  <QrCodeIcon className="w-6 h-6" />
                </motion.button>
                {showQR && (
                  <div className="absolute right-0 mt-2 z-50">
                    <WalletQR
                      showShareButtons={true}
                      isNavbar={true}
                      showQR={showQR}
                      onClose={() => setShowQR(false)}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 