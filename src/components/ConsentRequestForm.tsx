import React, { useState } from 'react';
import Button from './Button';

interface ConsentRequestFormProps {
  onSubmit: (data: { documentName: string; documentHash: string; recipient: string }) => void;
  className?: string;
}

const ConsentRequestForm: React.FC<ConsentRequestFormProps> = ({ onSubmit, className = '' }) => {
  const [documentName, setDocumentName] = useState('');
  const [documentHash, setDocumentHash] = useState('');
  const [recipient, setRecipient] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ documentName, documentHash, recipient });
    setDocumentName('');
    setDocumentHash('');
    setRecipient('');
  };

  return (
    <form className={`space-y-6 ${className}`} onSubmit={handleSubmit}>
      <div>
        <label htmlFor="documentName" className="block text-sm font-medium text-gray-700 mb-1">Document Name</label>
        <input
          id="documentName"
          type="text"
          value={documentName}
          onChange={e => setDocumentName(e.target.value)}
          placeholder="e.g., Aadhaar Card"
          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      <div>
        <label htmlFor="documentHash" className="block text-sm font-medium text-gray-700 mb-1">Document Hash (IPFS CID)</label>
        <input
          id="documentHash"
          type="text"
          value={documentHash}
          onChange={e => setDocumentHash(e.target.value)}
          placeholder="Qm..."
          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      <div>
        <label htmlFor="recipient" className="block text-sm font-medium text-gray-700 mb-1">Recipient Address</label>
        <input
          id="recipient"
          type="text"
          value={recipient}
          onChange={e => setRecipient(e.target.value)}
          placeholder="Algorand wallet address"
          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      <Button type="submit" className="w-full justify-center">Request Consent</Button>
    </form>
  );
};

export default ConsentRequestForm; 