'use client';

import React, { useState, useEffect } from 'react';
import { FiInfo, FiAlertCircle, FiLock, FiCheck, FiPlus, FiX } from 'react-icons/fi';
import { ConsentClient, ConsentRecord } from '@/contracts/ConsentClient';

// Define the tab options
type TabOption = 'view' | 'grant' | 'revoke';

// Define the structure of consent data
interface ConsentData {
  websiteUrl: string;
  dataUsagePolicy: string;
  grantedAt: number;
  expiry?: number;
  active: boolean;
  dataRequested: string[];
}

// Sample website consents for demo purposes
const WEBSITE_CONSENTS: ConsentData[] = [
  {
    websiteUrl: 'amazon.com',
    dataUsagePolicy: 'https://amazon.com/privacy',
    grantedAt: Date.now() - 30 * 24 * 60 * 60 * 1000, // 30 days ago
    expiry: Date.now() + 180 * 24 * 60 * 60 * 1000, // 6 months from now
    active: true,
    dataRequested: ['Name', 'Email', 'Shipping Address', 'Purchase History']
  },
  {
    websiteUrl: 'facebook.com',
    dataUsagePolicy: 'https://facebook.com/privacy',
    grantedAt: Date.now() - 60 * 24 * 60 * 60 * 1000, // 60 days ago
    expiry: Date.now() + 120 * 24 * 60 * 60 * 1000, // 4 months from now
    active: true,
    dataRequested: ['Profile Information', 'Friends List', 'Posts', 'Photos']
  },
  {
    websiteUrl: 'twitter.com',
    dataUsagePolicy: 'https://twitter.com/privacy',
    grantedAt: Date.now() - 90 * 24 * 60 * 60 * 1000, // 90 days ago
    expiry: Date.now() + 90 * 24 * 60 * 60 * 1000, // 3 months from now
    active: false,
    dataRequested: ['Username', 'Tweets', 'Following List']
  },
  {
    websiteUrl: 'netflix.com',
    dataUsagePolicy: 'https://netflix.com/privacy',
    grantedAt: Date.now() - 45 * 24 * 60 * 60 * 1000, // 45 days ago
    expiry: Date.now() + 315 * 24 * 60 * 60 * 1000, // 10.5 months from now
    active: true,
    dataRequested: ['Viewing History', 'Preferences', 'Payment Information']
  },
  {
    websiteUrl: 'spotify.com',
    dataUsagePolicy: 'https://spotify.com/privacy',
    grantedAt: Date.now() - 120 * 24 * 60 * 60 * 1000, // 120 days ago
    expiry: Date.now() + 60 * 24 * 60 * 60 * 1000, // 2 months from now
    active: true,
    dataRequested: ['Listening History', 'Playlists', 'Device Information']
  }
];

// Static notification component
const Notification = ({ 
  type, 
  message, 
  onClose 
}: { 
  type: 'success' | 'error' | 'warning', 
  message: string, 
  onClose: () => void 
}) => {
  const bgColor = 
    type === 'success' ? 'bg-green-100 border-green-500' : 
    type === 'error' ? 'bg-red-100 border-red-500' : 
    'bg-yellow-100 border-yellow-500';
  
  const textColor = 
    type === 'success' ? 'text-green-700' : 
    type === 'error' ? 'text-red-700' : 
    'text-yellow-700';
  
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [onClose]);
  
  return (
    <div className={`fixed top-4 right-4 p-4 rounded-md border ${bgColor} shadow-lg z-50`}>
      <div className="flex items-center justify-between">
        <p className={`${textColor} font-medium`}>{message}</p>
        <button 
          className={`ml-4 ${textColor} hover:opacity-70`}
          onClick={onClose}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

// Main ConsentManager component
export const ConsentManager: React.FC = () => {
  // State
  const [activeTab, setActiveTab] = useState<'view' | 'grant' | 'revoke'>('view');
  const [loading, setLoading] = useState<boolean>(false);
  const [consentClient] = useState<ConsentClient>(new ConsentClient());
  const [consents, setConsents] = useState<ConsentRecord[]>(WEBSITE_CONSENTS);
  const [notification, setNotification] = useState<{ 
    show: boolean; 
    type: 'success' | 'error' | 'warning'; 
    message: string 
  }>({ show: false, type: 'success', message: '' });
  
  // Form state for granting consent
  const [grantConsentForm, setGrantConsentForm] = useState({
    websiteUrl: '',
    dataUsagePolicy: '',
    expiryDuration: 30, // days
    dataItems: [''] // Default one empty data item
  });
  
  // Form state for revoking consent
  const [selectedConsentToRevoke, setSelectedConsentToRevoke] = useState<string>('');
  
  // Show notification
  const showNotification = (type: 'success' | 'error' | 'warning', message: string) => {
    setNotification({ show: true, type, message });
  };
  
  // Close notification
  const closeNotification = () => {
    setNotification(prev => ({ ...prev, show: false }));
  };
  
  // Handle adding a data item to the consent form
  const handleAddDataItem = () => {
    setGrantConsentForm(prev => ({
      ...prev,
      dataItems: [...prev.dataItems, '']
    }));
  };
  
  // Handle removing a data item from the consent form
  const handleRemoveDataItem = (index: number) => {
    setGrantConsentForm(prev => ({
      ...prev,
      dataItems: prev.dataItems.filter((_, i) => i !== index)
    }));
  };
  
  // Handle changing a data item
  const handleDataItemChange = (index: number, value: string) => {
    setGrantConsentForm(prev => {
      const newDataItems = [...prev.dataItems];
      newDataItems[index] = value;
      return {
        ...prev,
        dataItems: newDataItems
      };
    });
  };
  
  // Handle consent form changes
  const handleGrantConsentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setGrantConsentForm(prev => ({
      ...prev,
      [name]: name === 'expiryDuration' ? parseInt(value) : value
    }));
  };
  
  // Handle grant consent form submission
  const handleGrantConsent = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!grantConsentForm.websiteUrl || !grantConsentForm.dataUsagePolicy) {
      showNotification('error', 'Please fill out all required fields');
      return;
    }
    
    // Filter out empty data items
    const dataItems = grantConsentForm.dataItems.filter(item => item.trim() !== '');
    
    setLoading(true);
    
    try {
      // Simulate blockchain interaction
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Add new consent to the state
      const newConsent: ConsentRecord = {
        websiteUrl: grantConsentForm.websiteUrl,
        dataUsagePolicy: grantConsentForm.dataUsagePolicy,
        grantedAt: Date.now(),
        expiry: grantConsentForm.expiryDuration > 0 
          ? Date.now() + (grantConsentForm.expiryDuration * 24 * 60 * 60 * 1000) 
          : 0,
        active: true,
        dataRequested: dataItems
      };
      
      setConsents(prev => {
        // Check if consent already exists
        const existingIndex = prev.findIndex(c => c.websiteUrl === newConsent.websiteUrl);
        
        if (existingIndex >= 0) {
          // Replace existing consent
          const updated = [...prev];
          updated[existingIndex] = newConsent;
          return updated;
        } else {
          // Add new consent
          return [...prev, newConsent];
        }
      });
      
      // Reset form
      setGrantConsentForm({
        websiteUrl: '',
        dataUsagePolicy: '',
        expiryDuration: 30,
        dataItems: ['']
      });
      
      showNotification('success', 'Consent granted successfully');
      setActiveTab('view');
    } catch (error) {
      console.error('Error granting consent:', error);
      showNotification('error', 'Failed to grant consent');
    } finally {
      setLoading(false);
    }
  };
  
  // Handle revoking consent
  const handleRevokeConsent = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedConsentToRevoke) {
      showNotification('error', 'Please select a website to revoke consent');
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulate blockchain interaction
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update the consent status in state
      setConsents(prev => prev.map(consent => 
        consent.websiteUrl === selectedConsentToRevoke 
          ? { ...consent, active: false } 
          : consent
      ));
      
      setSelectedConsentToRevoke('');
      showNotification('success', 'Consent revoked successfully');
      setActiveTab('view');
    } catch (error) {
      console.error('Error revoking consent:', error);
      showNotification('error', 'Failed to revoke consent');
    } finally {
      setLoading(false);
    }
  };
  
  // Format date for display
  const formatDate = (timestamp: number): string => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto">
      {/* Notification */}
      {notification.show && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={closeNotification}
        />
      )}
      
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          className={`px-6 py-4 text-sm font-medium ${
            activeTab === 'view' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-600 hover:text-gray-800'
          }`}
          onClick={() => setActiveTab('view')}
        >
          View Consents
        </button>
        <button
          className={`px-6 py-4 text-sm font-medium ${
            activeTab === 'grant' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-600 hover:text-gray-800'
          }`}
          onClick={() => setActiveTab('grant')}
        >
          Grant Consent
        </button>
        <button
          className={`px-6 py-4 text-sm font-medium ${
            activeTab === 'revoke' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-600 hover:text-gray-800'
          }`}
          onClick={() => setActiveTab('revoke')}
        >
          Revoke Consent
        </button>
      </div>
      
      {/* Tab content */}
      <div className="p-6">
        {/* View Consents Tab */}
        {activeTab === 'view' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Your Active Consents</h2>
            
            {consents.length === 0 ? (
              <p className="text-gray-500">No consents found. Grant consent to websites to see them here.</p>
            ) : (
              <div className="space-y-4">
                {consents.filter(consent => consent.active).map((consent, index) => (
                  <div key={index} className="border border-gray-200 rounded-md p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-medium">{consent.websiteUrl}</h3>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        Active
                      </span>
                    </div>
                    <p className="text-gray-600 mt-2">{consent.dataUsagePolicy}</p>
                    <div className="mt-3 text-sm text-gray-500">
                      <p>Granted: {formatDate(consent.grantedAt)}</p>
                      <p>
                        Expiry: {consent.expiry > 0 
                          ? formatDate(consent.expiry)
                          : 'No expiration'
                        }
                      </p>
                    </div>
                    {consent.dataRequested && consent.dataRequested.length > 0 && (
                      <div className="mt-3">
                        <p className="text-sm font-medium text-gray-700">Data Requested:</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {consent.dataRequested.map((item, i) => (
                            <span key={i} className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Revoked Consents</h2>
            {consents.filter(consent => !consent.active).length === 0 ? (
              <p className="text-gray-500">No revoked consents.</p>
            ) : (
              <div className="space-y-4">
                {consents.filter(consent => !consent.active).map((consent, index) => (
                  <div key={index} className="border border-gray-200 rounded-md p-4 hover:bg-gray-50 opacity-70">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-medium">{consent.websiteUrl}</h3>
                      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                        Revoked
                      </span>
                    </div>
                    <p className="text-gray-600 mt-2">{consent.dataUsagePolicy}</p>
                    <div className="mt-3 text-sm text-gray-500">
                      <p>Granted: {formatDate(consent.grantedAt)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {/* Grant Consent Tab */}
        {activeTab === 'grant' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Grant New Consent</h2>
            <form onSubmit={handleGrantConsent}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="websiteUrl">
                  Website URL*
                </label>
                <input
                  id="websiteUrl"
                  name="websiteUrl"
                  type="text"
                  placeholder="example.com"
                  value={grantConsentForm.websiteUrl}
                  onChange={handleGrantConsentChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dataUsagePolicy">
                  Data Usage Policy*
                </label>
                <textarea
                  id="dataUsagePolicy"
                  name="dataUsagePolicy"
                  placeholder="Describe how the website will use your data..."
                  value={grantConsentForm.dataUsagePolicy}
                  onChange={handleGrantConsentChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                  required
                ></textarea>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="expiryDuration">
                  Expiry Period (days)
                </label>
                <select
                  id="expiryDuration"
                  name="expiryDuration"
                  value={grantConsentForm.expiryDuration}
                  onChange={handleGrantConsentChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={0}>No expiration</option>
                  <option value={7}>7 days</option>
                  <option value={30}>30 days</option>
                  <option value={90}>90 days</option>
                  <option value={180}>180 days</option>
                  <option value={365}>1 year</option>
                </select>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Data Items Requested
                </label>
                
                {grantConsentForm.dataItems.map((item, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleDataItemChange(index, e.target.value)}
                      placeholder={`Data item ${index + 1}`}
                      className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
                    />
                    
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveDataItem(index)}
                        className="px-2 py-2 text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={handleAddDataItem}
                  className="mt-2 px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                >
                  + Add Data Item
                </button>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className={`w-full px-4 py-2 text-white font-medium rounded-md ${
                  loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {loading ? 'Processing...' : 'Grant Consent'}
              </button>
            </form>
          </div>
        )}
        
        {/* Revoke Consent Tab */}
        {activeTab === 'revoke' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Revoke Existing Consent</h2>
            
            {consents.filter(consent => consent.active).length === 0 ? (
              <p className="text-gray-500">No active consents found to revoke.</p>
            ) : (
              <form onSubmit={handleRevokeConsent}>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="consentToRevoke">
                    Select Website*
                  </label>
                  <select
                    id="consentToRevoke"
                    value={selectedConsentToRevoke}
                    onChange={(e) => setSelectedConsentToRevoke(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">-- Select Website --</option>
                    {consents
                      .filter(consent => consent.active)
                      .map((consent, index) => (
                        <option key={index} value={consent.websiteUrl}>
                          {consent.websiteUrl}
                        </option>
                      ))
                    }
                  </select>
                </div>
                
                <div className="mb-6">
                  {selectedConsentToRevoke && (
                    <div className="border border-yellow-200 bg-yellow-50 p-4 rounded-md">
                      <h3 className="text-md font-medium text-yellow-800 mb-2">Warning</h3>
                      <p className="text-sm text-yellow-700">
                        Revoking consent will prevent {selectedConsentToRevoke} from using your data. 
                        This action will be recorded on the blockchain and cannot be undone.
                      </p>
                    </div>
                  )}
                </div>
                
                <button
                  type="submit"
                  disabled={loading || !selectedConsentToRevoke}
                  className={`w-full px-4 py-2 text-white font-medium rounded-md ${
                    loading || !selectedConsentToRevoke
                      ? 'bg-red-400 cursor-not-allowed'
                      : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  {loading ? 'Processing...' : 'Revoke Consent'}
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}; 