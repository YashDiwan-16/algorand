import React, { createContext, useState, ReactNode, useContext } from 'react';

/**
 * @interface WalletState
 * Defines the shape of the wallet's state, including address, connection status, and loading indicator.
 */
interface WalletState {
  address: string | null;
  isConnected: boolean;
  loading: boolean;
}

/**
 * @interface WalletContextType
 * Defines the shape of the context value, including the wallet state and functions to interact with it.
 */
interface WalletContextType {
  wallet: WalletState;
  connectWallet: (address: string) => void;
  disconnectWallet: () => void;
  setWalletLoading: (isLoading: boolean) => void;
}

/**
 * @const WalletContext
 * The React context for managing wallet state throughout the application.
 */
const WalletContext = createContext<WalletContextType | undefined>(undefined);

/**
 * @component WalletProvider
 * A provider component that encapsulates the wallet state logic and makes it available to its children.
 *
 * @param {object} props - The component props.
 * @param {ReactNode} props.children - The child components that can access the context.
 * @returns {JSX.Element} The provider component.
 */
export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wallet, setWallet] = useState<WalletState>({
    address: null,
    isConnected: false,
    loading: false,
  });

  /**
   * Connects the wallet by setting the address and connection status.
   * @param {string} address - The address of the connected wallet.
   */
  const connectWallet = (address: string) => {
    setWallet({ address, isConnected: true, loading: false });
  };

  /**
   * Disconnects the wallet by clearing the address and connection status.
   */
  const disconnectWallet = () => {
    setWallet({ address: null, isConnected: false, loading: false });
  };

  /**
   * Sets the loading state of the wallet.
   * @param {boolean} isLoading - Whether the wallet is currently performing an action.
   */
  const setWalletLoading = (isLoading: boolean) => {
    setWallet(prev => ({ ...prev, loading: isLoading }));
  };

  return (
    <WalletContext.Provider value={{ wallet, connectWallet, disconnectWallet, setWalletLoading }}>
      {children}
    </WalletContext.Provider>
  );
};

/**
 * @hook useWallet
 * A custom hook to easily access the wallet context.
 * This hook should be used by any component that needs to interact with the wallet's state or actions.
 *
 * @throws {Error} If used outside of a WalletProvider.
 * @returns {WalletContextType} The wallet context value.
 */
export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}; 