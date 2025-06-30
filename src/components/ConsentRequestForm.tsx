import React, { useState } from 'react';
import Button from './Button';
import Input from './Input';

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
      <Input
        id="documentName"
        label="Document Name"
        type="text"
        value={documentName}
        onChange={e => setDocumentName(e.target.value)}
        placeholder="e.g., Aadhaar Card"
        required
      />
      <Input
        id="documentHash"
        label="Document Hash (IPFS CID)"
        type="text"
        value={documentHash}
        onChange={e => setDocumentHash(e.target.value)}
        placeholder="Qm..."
        required
      />
      <Input
        id="recipient"
        label="Recipient Address"
        type="text"
        value={recipient}
        onChange={e => setRecipient(e.target.value)}
        placeholder="Algorand wallet address"
        required
      />
      <Button type="submit" className="w-full justify-center !mt-6">Request Consent</Button>
    </form>
  );
};

export default ConsentRequestForm; 