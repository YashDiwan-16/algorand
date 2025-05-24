'use client';

import React, { useState } from 'react';
import { useWallet } from '@/providers/WalletContext';
import { ConsentClient } from '@/contracts/ConsentClient';
import { useSnackbar } from 'notistack';
import algosdk from 'algosdk';

// RegisterUser component for user registration in the consent manager
export default function RegisterUser() {
  const { walletInfo, signTransactions } = useWallet();
  const { enqueueSnackbar } = useSnackbar();
  const [isRegistering, setIsRegistering] = useState(false);
  
  // Handle user registration
  const handleRegister = async () => {
    if (!walletInfo) {
      enqueueSnackbar('Please connect your wallet first', { variant: 'warning' });
      return;
    }
    
    setIsRegistering(true);
    
    try {
      // Create an instance of the ConsentClient
      const client = new ConsentClient();
      
      // Get the register user transaction
      const transaction = await client.registerUser(walletInfo.address);
      
      // Sign the transaction
      const encodedTransaction = algosdk.encodeUnsignedTransaction(transaction);
      const signedTransactions = await signTransactions([encodedTransaction]);
      
      // Submit the transaction to the network using the client's method
      const { txId } = await client.sendRawTransaction(signedTransactions);
      
      // Wait for confirmation using the client's method
      await client.waitForConfirmation(txId, 5);
      
      enqueueSnackbar(`Registration successful!`, { variant: 'success' });
    } catch (error) {
      console.error('Error registering user:', error);
      enqueueSnackbar(`Error registering user: ${error instanceof Error ? error.message : String(error)}`, { 
        variant: 'error' 
      });
    } finally {
      setIsRegistering(false);
    }
  };
  
  // If no wallet is connected, don't render the button
  if (!walletInfo) {
    return null;
  }
  
  return (
    <button
      className={`bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors ${
        isRegistering ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      onClick={handleRegister}
      disabled={isRegistering}
    >
      {isRegistering ? 'Registering...' : 'Register User'}
    </button>
  );
} 