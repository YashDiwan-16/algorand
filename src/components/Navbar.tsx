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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-elegant">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <span className="text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400">
                ConsentChain
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-400/20 via-secondary-400/20 to-accent-400/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <motion.div whileHover={{ y: -2 }}>
              <Link to="/" className="text-gray-200 hover:text-white transition-colors duration-300 font-medium relative group">
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-400 to-secondary-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }}>
              <Link to="/documents" className="text-gray-200 hover:text-white transition-colors duration-300 font-medium relative group">
                Documents
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-secondary-400 to-accent-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }}>
              <Link to="/telegram-bot" className="text-gray-200 hover:text-white transition-colors duration-300 font-medium relative group">
                Telegram Bot
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-primary-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }}>
              <Link to="/about" className="text-gray-200 hover:text-white transition-colors duration-300 font-medium relative group">
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-accent-400 to-primary-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </motion.div>
          </div>

          {/* Connect Buttons */}
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleWalletConnect}
              className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 flex items-center justify-center gap-2 font-medium shadow-glow hover:shadow-glow-lg border border-primary-400/30"
            >
              <WalletIcon className="w-5 h-5" />
              {isWalletConnected ? 'Connected' : 'Connect Wallet'}
            </motion.button>

            {isWalletConnected && (
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDigiLockerConnect}
                className="px-6 py-3 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white rounded-xl hover:from-secondary-600 hover:to-secondary-700 transition-all duration-300 flex items-center justify-center gap-2 font-medium shadow-glow hover:shadow-glow-lg border border-secondary-400/30"
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