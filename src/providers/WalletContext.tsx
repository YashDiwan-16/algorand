'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PeraWalletConnect } from '@perawallet/connect';
import { DeflyWalletConnect } from '@blockshake/defly-connect';
import algosdk from 'algosdk';

// Enable demo mode by default
const DEMO_MODE = true;
const DEMO_ADDRESSES = [
  'ZLNTXJNPGBWZJPZGCWF5WXDWBARJLPLU7KX3XY6JHMFHAKZLH6CXUMTEGU',
  'AN7B3VVMNK62OA4CGWPGZ7MMOYZYGKPFB2GKZWJUWICNRN5MITLEHZPM6U',
  'BZVVTPDQHDJIDT7NHDLV5GYOIIHZXA3RPLSQVWUPBH6WYHLTNMUIPEWVHM'
];

// Types for our wallet context
type WalletType = 'pera' | 'defly' | 'demo' | null;

interface WalletInfo {
  address: string;
  name: string;
  type: WalletType;
}

interface WalletContextType {
  walletInfo: WalletInfo | null;
  isConnecting: boolean;
  connectPera: () => Promise<void>;
  connectDefly: () => Promise<void>;
  connectDemo: () => Promise<void>;
  disconnect: () => Promise<void>;
  signTransactions: (transactions: Uint8Array[]) => Promise<Uint8Array[]>;
}

// Create context
const WalletContext = createContext<WalletContextType | undefined>(undefined);

// Wallet instances
const peraWallet = new PeraWalletConnect({ shouldShowSignTxnToast: true });
const deflyWallet = new DeflyWalletConnect();

// Provider component
export function WalletProvider({ children }: { children: ReactNode }) {
  const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  
  // Auto-connect to demo wallet in demo mode
  useEffect(() => {
    if (DEMO_MODE) {
      const autoConnectDemo = async () => {
        // Wait a short time to simulate connection
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Set a random demo address
        const randomIndex = Math.floor(Math.random() * DEMO_ADDRESSES.length);
        const demoAddress = DEMO_ADDRESSES[randomIndex];
        
        // Set wallet info
        setWalletInfo({
          address: demoAddress,
          name: 'Demo Wallet',
          type: 'demo'
        });
      };
      
      autoConnectDemo();
    }
  }, []);
  
  // Reconnect on page load (for non-demo mode)
  useEffect(() => {
    if (!DEMO_MODE) {
      const checkPeraSession = async () => {
        const accounts = await peraWallet.reconnectSession();
        if (accounts && accounts.length > 0) {
          setWalletInfo({
            address: accounts[0],
            name: 'Pera Wallet',
            type: 'pera'
          });
        }
      };
      
      const checkDeflySession = async () => {
        const accounts = await deflyWallet.reconnectSession();
        if (accounts && accounts.length > 0) {
          setWalletInfo({
            address: accounts[0],
            name: 'Defly Wallet',
            type: 'defly'
          });
        }
      };
      
      checkPeraSession().catch(console.error);
      checkDeflySession().catch(console.error);
      
      // Cleanup
      return () => {
        peraWallet.disconnect();
        deflyWallet.disconnect();
      };
    }
  }, []);
  
  // Connect to Pera wallet
  const connectPera = async () => {
    if (DEMO_MODE) {
      return connectDemo();
    }
    
    setIsConnecting(true);
    try {
      const accounts = await peraWallet.connect();
      if (accounts && accounts.length > 0) {
        setWalletInfo({
          address: accounts[0],
          name: 'Pera Wallet',
          type: 'pera'
        });
      }
    } catch (error) {
      console.error('Error connecting to Pera Wallet:', error);
    } finally {
      setIsConnecting(false);
    }
  };
  
  // Connect to Defly wallet
  const connectDefly = async () => {
    if (DEMO_MODE) {
      return connectDemo();
    }
    
    setIsConnecting(true);
    try {
      const accounts = await deflyWallet.connect();
      if (accounts && accounts.length > 0) {
        setWalletInfo({
          address: accounts[0],
          name: 'Defly Wallet',
          type: 'defly'
        });
      }
    } catch (error) {
      console.error('Error connecting to Defly Wallet:', error);
    } finally {
      setIsConnecting(false);
    }
  };
  
  // Connect to demo wallet
  const connectDemo = async () => {
    setIsConnecting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate connection delay
      
      const randomIndex = Math.floor(Math.random() * DEMO_ADDRESSES.length);
      setWalletInfo({
        address: DEMO_ADDRESSES[randomIndex],
        name: 'Demo Wallet',
        type: 'demo'
      });
    } catch (error) {
      console.error('Error connecting to Demo Wallet:', error);
    } finally {
      setIsConnecting(false);
    }
  };
  
  // Disconnect from wallet
  const disconnect = async () => {
    if (walletInfo?.type === 'pera') {
      await peraWallet.disconnect();
    } else if (walletInfo?.type === 'defly') {
      await deflyWallet.disconnect();
    }
    // For demo wallets, just clear the state
    setWalletInfo(null);
  };
  
  // Sign transactions
  const signTransactions = async (transactions: Uint8Array[]): Promise<Uint8Array[]> => {
    if (!walletInfo) {
      throw new Error('Wallet not connected');
    }
    
    if (walletInfo.type === 'pera') {
      return await peraWallet.signTransaction(transactions);
    } else if (walletInfo.type === 'defly') {
      return await deflyWallet.signTransaction(transactions);
    } else if (walletInfo.type === 'demo') {
      // For demo mode, simulate transaction signing
      console.log('Demo mode: Simulating transaction signing');
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate signing delay
      
      // Mock signing by just returning the same transactions
      // In a real signing situation, the transaction would be modified with a signature
      return transactions;
    }
    
    throw new Error('Unknown wallet type');
  };
  
  // Context value
  const contextValue: WalletContextType = {
    walletInfo,
    isConnecting,
    connectPera,
    connectDefly,
    connectDemo,
    disconnect,
    signTransactions
  };
  
  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
}

// Hook to use the wallet context
export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
} 