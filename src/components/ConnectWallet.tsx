'use client';

import React, { useState } from 'react';
import { useWallet } from '@/providers/WalletContext';
import { formatAddress } from '@/utils/algorand';
import { FiUser, FiLogOut, FiCheckCircle } from 'react-icons/fi';

// ConnectWallet component for handling wallet connections
export default function ConnectWallet() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { walletInfo, isConnecting, connectPera, connectDefly, connectDemo, disconnect } = useWallet();

  // Open/close providers modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // If wallet is connecting, show loading state
  if (isConnecting) {
    return (
      <button 
        className="bg-blue-600 text-white py-2 px-4 rounded-lg opacity-75 cursor-not-allowed flex items-center"
        disabled
      >
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
        Connecting...
      </button>
    );
  }

  // If wallet is connected, show wallet information and disconnect button
  if (walletInfo) {
    return (
      <div className="flex flex-row items-center space-x-2">
        <div className="bg-green-50 border border-green-200 py-2 px-4 rounded-lg text-green-800 font-medium flex items-center">
          <FiCheckCircle className="mr-2 text-green-600" />
          {formatAddress(walletInfo.address)}
        </div>
        <button
          className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center"
          onClick={disconnect}
        >
          <FiLogOut className="mr-1.5" />
          Disconnect
        </button>
      </div>
    );
  }

  // If no wallet is connected, show connection button and modal
  return (
    <>
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center"
        onClick={toggleModal}
      >
        <FiUser className="mr-1.5" />
        Connect Wallet
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold mb-4">Connect Wallet</h2>
            <p className="text-gray-600 mb-6">
              Select a wallet to connect with the consent manager
            </p>

            <div className="space-y-3">
              <button
                onClick={connectDemo}
                className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <FiUser size={20} />
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium">Demo Wallet</h3>
                    <p className="text-xs text-gray-500">No real transactions, perfect for testing</p>
                  </div>
                </div>
                <span className="text-blue-600">Connect</span>
              </button>

              <button
                onClick={connectPera}
                className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-800">
                    <span className="font-bold">P</span>
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium">Pera Wallet</h3>
                    <p className="text-xs text-gray-500">Connect to Pera Wallet</p>
                  </div>
                </div>
                <span className="text-blue-600">Connect</span>
              </button>

              <button
                onClick={connectDefly}
                className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-800">
                    <span className="font-bold">D</span>
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium">Defly Wallet</h3>
                    <p className="text-xs text-gray-500">Connect to Defly Wallet</p>
                  </div>
                </div>
                <span className="text-blue-600">Connect</span>
              </button>
            </div>

            <button
              onClick={toggleModal}
              className="mt-6 w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
} 