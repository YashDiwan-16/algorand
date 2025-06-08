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
  const [peraWallet, setPeraWallet] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    const peraWalletInstance = new PeraWalletConnect();
    setPeraWallet(peraWalletInstance);

    // Check if already connected
    const checkConnection = async () => {
      try {
        const accounts = await peraWalletInstance.reconnectSession();
        if (accounts.length > 0) {
          setAccounts(accounts);
          setAddress(accounts[0]);
          setIsConnectedToPeraWallet(true);
      }
      } catch (error) {
        console.error('Error checking Pera Wallet connection:', error);
      }
    };

    checkConnection();
  }, []);

  const connectWallet = async () => {
    try {
      const accounts = await peraWallet.connect();
      setAccounts(accounts);
      setAddress(accounts[0]);
      setIsConnectedToPeraWallet(true);
    } catch (error) {
      console.error('Error connecting to Pera Wallet:', error);
    }
  };

  const disconnectWallet = async () => {
    try {
      await peraWallet.disconnect();
      setAccounts([]);
      setAddress(null);
      setIsConnectedToPeraWallet(false);
    } catch (error) {
      console.error('Error disconnecting from Pera Wallet:', error);
        }
  };

  const value = {
    isConnectedToPeraWallet,
    accounts,
    address,
    connectWallet,
    disconnectWallet,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
}; 