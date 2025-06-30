import React from 'react';
import { useWallet } from '../context/WalletContext';
import Card from '../components/Card';
import { truncateAddress } from '../utils/truncateAddress';

const DashboardPage: React.FC = () => {
  const { wallet } = useWallet();

  if (!wallet.isConnected) {
    return <p className="text-center mt-8">Please connect your wallet to view the dashboard.</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <Card title="Wallet Information">
        <p><strong>Address:</strong> {truncateAddress(wallet.address || '', 8)}</p>
      </Card>
      {/* More dashboard widgets can be added here */}
    </div>
  );
};

export default DashboardPage; 