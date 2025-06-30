import React from 'react';
import { useWallet } from '../context/WalletContext';
import { truncateAddress } from '../utils/truncateAddress';
import UserProfileCard from '../components/UserProfileCard';
import RecentActivity from '../components/RecentActivity';

// Mock Data
const mockUser = {
  name: 'Apurva',
  email: 'itsapurvasb343@gmail.com',
  avatarUrl: `https://i.pravatar.cc/150?u=apurva`,
};
const mockActivities = [
  { id: '1', description: 'Granted consent for "Aadhaar Card"', timestamp: new Date() },
  { id: '2', description: 'Revoked consent for "Passport"', timestamp: new Date(Date.now() - 86400000) },
  { id: '3', description: 'Requested consent for "Bank Statement"', timestamp: new Date(Date.now() - 172800000) },
];

const DashboardPage: React.FC = () => {
  const { wallet } = useWallet();

  if (!wallet.isConnected) {
    return <p className="text-center mt-8">Please connect your wallet to view the dashboard.</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <UserProfileCard user={mockUser} />
        </div>
        <div className="lg:col-span-2">
          <RecentActivity activities={mockActivities} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 