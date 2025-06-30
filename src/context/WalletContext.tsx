import React, { createContext, useState, ReactNode, useContext } from 'react';

interface WalletState {
  address: string | null;
  isConnected: boolean;
  loading: boolean;
}

interface WalletContextType {
  wallet: WalletState;
  connectWallet: (address: string) => void;
  disconnectWallet: () => void;
  setWalletLoading: (isLoading: boolean) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wallet, setWallet] = useState<WalletState>({
    address: null,
    isConnected: false,
    loading: false,
  });

  const connectWallet = (address: string) => {
    setWallet({ address, isConnected: true, loading: false });
  };

  const disconnectWallet = () => {
    setWallet({ address: null, isConnected: false, loading: false });
  };

  const setWalletLoading = (isLoading: boolean) => {
    setWallet(prev => ({ ...prev, loading: isLoading }));
  };

  return (
    <WalletContext.Provider value={{ wallet, connectWallet, disconnectWallet, setWalletLoading }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}; 