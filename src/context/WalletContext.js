import React, { createContext, useContext, useState, useEffect } from 'react';
import { PeraWalletConnect } from "@perawallet/connect";

const WalletContext = createContext();

// Create the PeraWalletConnect instance outside of the component
const peraWallet = new PeraWalletConnect();

export function WalletProvider({ children }) {
  const [accountAddress, setAccountAddress] = useState(null);
  const isConnectedToPeraWallet = !!accountAddress;

  useEffect(() => {
    // Reconnect to the session when the component is mounted
    peraWallet.reconnectSession().then((accounts) => {
      // Setup the disconnect event listener
      peraWallet.connector?.on("disconnect", handleDisconnectWalletClick);

      if (accounts.length) {
        setAccountAddress(accounts[0]);
      }
    }).catch(error => {
      console.log(error);
    });
  }, []);

  const handleConnectWalletClick = () => {
    peraWallet
      .connect()
      .then((newAccounts) => {
        // Setup the disconnect event listener
        peraWallet.connector?.on("disconnect", handleDisconnectWalletClick);
        setAccountAddress(newAccounts[0]);
      })
      .catch((error) => {
        if (error?.data?.type !== "CONNECT_MODAL_CLOSED") {
          console.error("Error connecting to Pera Wallet:", error);
        }
      });
  };

  const handleDisconnectWalletClick = () => {
    peraWallet.disconnect();
    setAccountAddress(null);
  };

  return (
    <WalletContext.Provider value={{
      accountAddress,
      isConnectedToPeraWallet,
      handleConnectWalletClick,
      handleDisconnectWalletClick,
      peraWallet
    }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  return useContext(WalletContext);
} 