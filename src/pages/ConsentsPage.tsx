import React, { useState, useEffect } from 'react';
import ConsentList from '../components/ConsentList';
import ConsentRequestForm from '../components/ConsentRequestForm';
import Card from '../components/Card';
import { useWallet } from '../context/WalletContext';
import WalletConnectButton from '../components/WalletConnectButton';
import Spinner from '../components/Spinner';
import Notification from '../components/Notification';

// Mock data for demonstration
const mockConsents = [
  { documentName: 'Aadhaar Card', documentHash: '0x123...', recipient: '0xabc...', status: 'Granted' },
  { documentName: 'Passport', documentHash: '0x456...', recipient: '0xdef...', status: 'Pending' },
];

const ConsentsPage: React.FC = () => {
  const { wallet, connectWallet } = useWallet();
  const [consents, setConsents] = useState(mockConsents);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Simulate fetching data
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // In a real app, you'd call your API here:
        // const data = await api('/api/consents');
        // setConsents(data);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
        setConsents(mockConsents);
      } catch (err) {
        setError('Failed to fetch consents.');
      } finally {
        setLoading(false);
      }
    };

    if (wallet.isConnected) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [wallet.isConnected]);

  const handleRequestSubmit = (data: any) => {
    console.log("New consent request:", data);
    // Here you would normally call an API to create the request
    const newConsent = { ...data, status: 'Pending' };
    setConsents(prev => [...prev, newConsent]);
  };

  if (!wallet.isConnected) {
    return (
      <div className="flex justify-center items-center h-64">
        <WalletConnectButton onConnect={() => connectWallet('DUMMY_ADDRESS_FOR_DEMO')} />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {error && <Notification message={error} type="error" onClose={() => setError(null)} />}
      <h1 className="text-2xl font-bold mb-4">Document Consents</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Card title="Request New Consent">
              <ConsentRequestForm onSubmit={handleRequestSubmit} />
            </Card>
          </div>
          <div>
            <Card title="Your Consents">
              <ConsentList consents={consents} />
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsentsPage; 