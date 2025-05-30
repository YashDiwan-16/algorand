import React, { createContext, useContext, useState, useEffect } from 'react';
import { PeraWalletConnect } from '@perawallet/connect';

const WalletContext = createContext();

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

export const WalletProvider = ({ children }) => {
  const [isConnectedToPeraWallet, setIsConnectedToPeraWallet] = useState(false);
  const [accountAddress, setAccountAddress] = useState(null);
  const [peraWallet, setPeraWallet] = useState(null);

  useEffect(() => {
    const peraWalletInstance = new PeraWalletConnect();
    setPeraWallet(peraWalletInstance);

    // Check if already connected
    const checkConnection = async () => {
      try {
        const accounts = await peraWalletInstance.reconnectSession();
        if (accounts.length > 0) {
          setIsConnectedToPeraWallet(true);
          setAccountAddress(accounts[0]);
        }
      } catch (error) {
        console.log('No active connection');
      }
    };

    checkConnection();
  }, []);

  const connectWallet = async () => {
    try {
      const accounts = await peraWallet.connect();
      setIsConnectedToPeraWallet(true);
      setAccountAddress(accounts[0]);
    } catch (error) {
      console.error('Error connecting to Pera Wallet:', error);
    }
  };

  const disconnectWallet = async () => {
    try {
      await peraWallet.disconnect();
      setIsConnectedToPeraWallet(false);
      setAccountAddress(null);
    } catch (error) {
      console.error('Error disconnecting from Pera Wallet:', error);
    }
  };

  const value = {
    isConnectedToPeraWallet,
    accountAddress,
    connectWallet,
    disconnectWallet
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
}; 