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
    <form className={`space-y-4 ${className}`} onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium mb-1">Document Name</label>
        <input
          type="text"
          value={documentName}
          onChange={e => setDocumentName(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Document Hash</label>
        <input
          type="text"
          value={documentHash}
          onChange={e => setDocumentHash(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Recipient Address</label>
        <input
          type="text"
          value={recipient}
          onChange={e => setRecipient(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>
      <Button type="submit">Request Consent</Button>
    </form>
  );
};

export default ConsentRequestForm; 