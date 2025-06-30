import React from 'react';
import { useWallet } from '../context/WalletContext';
import UserProfileCard from '../components/UserProfileCard';
import RecentActivity from '../components/RecentActivity';
import StatsCard from '../components/StatsCard';
import { useProfile } from '../context/ProfileContext';

// Mock Data
const mockActivities = [
  { id: '1', description: 'Granted consent for "Aadhaar Card"', timestamp: new Date() },
  { id: '2', description: 'Revoked consent for "Passport"', timestamp: new Date(Date.now() - 86400000) },
  { id: '3', description: 'Requested consent for "Bank Statement"', timestamp: new Date(Date.now() - 172800000) },
];

const DashboardPage: React.FC = () => {
  const { wallet } = useWallet();
  const { profile } = useProfile();

  if (!wallet.isConnected) {
    return <p className="text-center mt-8">Please connect your wallet to view the dashboard.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <StatsCard title="Active Consents" value={5} icon={'📄'} />
        <StatsCard title="Pending Requests" value={2} icon={'⏳'} />
        <StatsCard title="Revoked Consents" value={1} icon={'🚫'} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <UserProfileCard user={profile} />
        </div>
        <div className="lg:col-span-2">
          <RecentActivity activities={mockActivities} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 