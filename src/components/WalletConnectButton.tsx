import React from 'react';

interface WalletConnectButtonProps {
  onConnect: () => void;
  className?: string;
}

const WalletConnectButton: React.FC<WalletConnectButtonProps> = ({ onConnect, className = '' }) => {
  return (
    <button
      className={`px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition ${className}`}
      onClick={onConnect}
    >
      Connect Wallet
    </button>
  );
};

export default WalletConnectButton; 