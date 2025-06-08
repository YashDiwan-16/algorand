import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { DocumentIcon, WalletIcon } from '@heroicons/react/24/outline';

const Navbar: React.FC = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isDigiLockerConnected, setIsDigiLockerConnected] = useState(false);

  const handleWalletConnect = () => {
    // Mock wallet connection
    setIsWalletConnected(true);
  };

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
            <Link to="/documents" className="text-gray-300 hover:text-white transition-colors">
              Documents
            </Link>
            <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
              About
            </Link>
          </div>

          {/* Connect Buttons */}
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleWalletConnect}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <WalletIcon className="w-5 h-5" />
              {isWalletConnected ? 'Connected' : 'Connect Wallet'}
            </motion.button>

            {isWalletConnected && (
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
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 