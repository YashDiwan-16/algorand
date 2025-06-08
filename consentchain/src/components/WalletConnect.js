import React from 'react';
import { motion } from 'framer-motion';
import { useWallet } from '../context/WalletContext';

const WalletConnect = ({ variant = 'default' }) => {
  const { accountAddress, isConnectedToPeraWallet, handleConnectWalletClick, handleDisconnectWalletClick } = useWallet();

  const buttonStyles = {
    default: `px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 ${
      isConnectedToPeraWallet
        ? 'bg-red-500 hover:bg-red-600'
        : 'bg-blue-500 hover:bg-blue-600'
    }`,
    hero: `w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10`
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center"
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={isConnectedToPeraWallet ? handleDisconnectWalletClick : handleConnectWalletClick}
        className={buttonStyles[variant]}
      >
        {isConnectedToPeraWallet ? (
          <div className="flex items-center space-x-2">
            <span>Disconnect Wallet</span>
            <span className="text-sm opacity-75">
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