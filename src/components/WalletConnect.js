import React from 'react';
import { motion } from 'framer-motion';
import { useWallet } from '../context/WalletContext';
import { WalletIcon } from '@heroicons/react/24/outline';

const WalletConnect = ({ variant = 'default' }) => {
  const { accountAddress, isConnectedToPeraWallet, handleConnectWalletClick, handleDisconnectWalletClick } = useWallet();

  const buttonStyles = {
    default: `px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-3 shadow-glow hover:shadow-glow-lg transform hover:scale-105 hover:-translate-y-1 ${
      isConnectedToPeraWallet
        ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 border border-red-400/30'
        : 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 border border-primary-400/30'
    }`,
    hero: `w-full flex items-center justify-center px-10 py-4 text-lg font-medium rounded-xl text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-glow hover:shadow-glow-lg transform hover:scale-105 hover:-translate-y-1 border border-primary-400/30 md:py-5 md:text-xl md:px-12`
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center"
    >
      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={isConnectedToPeraWallet ? handleDisconnectWalletClick : handleConnectWalletClick}
        className={buttonStyles[variant]}
      >
        <WalletIcon className="w-6 h-6" />
        {isConnectedToPeraWallet ? (
          <div className="flex items-center space-x-2">
            <span>Disconnect Wallet</span>
            <span className="text-sm opacity-75 bg-white/10 px-2 py-1 rounded-lg">
              ({accountAddress.slice(0, 6)}...{accountAddress.slice(-4)})
            </span>
          </div>
        ) : (
          'Connect Pera Wallet'
        )}
      </motion.button>
    </motion.div>
  );
};

export default WalletConnect; 