import React, { useState, useEffect } from 'react';
import { useWallet } from '../context/WalletContext';
import UserProfileCard from '../components/UserProfileCard';
import RecentActivity from '../components/RecentActivity';
import StatsCard from '../components/StatsCard';
import { useProfile } from '../context/ProfileContext';
import Navbar from '../components/Navbar';
import ConsentSidebar from '../components/ConsentSidebar';
import ConsentPieChart from '../components/ConsentPieChart';
import ConsentTable from '../components/ConsentTable';
import ConsentTableSkeleton from '../components/ConsentTableSkeleton';
import ConsentEmptyState from '../components/ConsentEmptyState';
import ConsentNotificationToast from '../components/ConsentNotificationToast';
import ConsentBanner from '../components/ConsentBanner';
import ConsentThemeToggle from '../components/ConsentThemeToggle';
import ConsentHelpTooltip from '../components/ConsentHelpTooltip';
import ConsentExportButton from '../components/ConsentExportButton';
import ConsentStatusFilter from '../components/ConsentStatusFilter';
import ConsentSearchInput from '../components/ConsentSearchInput';
import ConsentDateRangePicker from '../components/ConsentDateRangePicker';
import ConsentBulkActions from '../components/ConsentBulkActions';
import ConsentUserSelector from '../components/ConsentUserSelector';

// Mock Data
const mockActivities = [
  { id: '1', description: 'Granted consent for "Aadhaar Card"', timestamp: new Date() },
  { id: '2', description: 'Revoked consent for "Passport"', timestamp: new Date(Date.now() - 86400000) },
  { id: '3', description: 'Requested consent for "Bank Statement"', timestamp: new Date(Date.now() - 172800000) },
];

const DashboardPage: React.FC = () => {
  const { wallet } = useWallet();
  const { profile } = useProfile();

  // Mock loading and data state
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<any[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [dark, setDark] = useState(false);
  // Mock filter state
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [selected, setSelected] = useState<string[]>([]);
  const [user, setUser] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setRows([
        { id: '1', document: 'Aadhaar Card', user: '0x123...', status: 'granted', requestedAt: '2024-06-01' },
        { id: '2', document: 'Passport', user: '0x456...', status: 'revoked', requestedAt: '2024-05-20' },
        { id: '3', document: 'Bank Statement', user: '0x789...', status: 'requested', requestedAt: '2024-06-10' },
      ]);
      setLoading(false);
      setShowToast(true);
    }, 1200);
  }, []);

  if (!wallet.isConnected) {
    return <p className="text-center mt-8">Please connect your wallet to view the dashboard.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="absolute top-4 right-8 z-50">
        <ConsentThemeToggle dark={dark} onToggle={() => setDark(d => !d)} />
      </div>
      <ConsentBanner message="Welcome to the new Consent Dashboard! Please review your pending requests." type="info" />
      <div className="flex">
        <div className="hidden lg:block w-64">
          <ConsentSidebar links={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Consents', href: '/consents' },
            { label: 'Profile', href: '/profile' },
            { label: 'Settings', href: '/settings' },
          ]} />
        </div>
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-6">
            <ConsentHelpTooltip text="This dashboard gives you an overview of your consents, requests, and recent activity.">
              Dashboard
            </ConsentHelpTooltip>
          </h1>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <StatsCard title="Active Consents" value={5} icon={'📄'} />
            <StatsCard title="Pending Requests" value={2} icon={'⏳'} />
            <StatsCard title="Revoked Consents" value={1} icon={'🚫'} />
          </div>
          {/* Consent Status Pie Chart */}
          <div className="mb-8 max-w-md">
            <ConsentPieChart granted={5} pending={2} revoked={1} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <UserProfileCard user={profile} />
            </div>
            <div className="lg:col-span-2">
              <RecentActivity activities={mockActivities} />
            </div>
          </div>
          {/* Consent Table */}
          <div className="mt-10">
            <div className="mb-4 flex flex-wrap gap-3 items-end">
              <ConsentStatusFilter value={status} onChange={setStatus} />
              <ConsentSearchInput value={search} onChange={setSearch} placeholder="Search consents..." />
              <ConsentDateRangePicker start={dateRange.from} end={dateRange.to} onChange={(from, to) => setDateRange({ from, to })} />
              <ConsentUserSelector value={user} onChange={setUser} users={[
                { id: "0x123...", name: "Alice" },
                { id: "0x456...", name: "Bob" },
                { id: "0x789...", name: "Charlie" },
              ]} />
              <ConsentBulkActions selected={selected} onApprove={() => {}} onRevoke={() => {}} />
              <ConsentExportButton consents={rows} />
            </div>
            {loading ? (
              <ConsentTableSkeleton />
            ) : rows.length === 0 ? (
              <ConsentEmptyState message="No consents found." />
            ) : (
              <ConsentTable rows={rows} />
            )}
          </div>
        </main>
      </div>
      <ConsentNotificationToast
        message="Consent data loaded successfully!"
        type="success"
        onClose={() => setShowToast(false)}
        {...(showToast ? {} : { style: { display: 'none' } })}
      />
    </div>
  );
};

export default DashboardPage; 