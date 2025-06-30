import React from 'react';
import Card from './Card';
import EmptyState from './EmptyState';
import { truncateAddress } from '../utils/truncateAddress';

interface Consent {
  documentName: string;
  documentHash: string;
  recipient: string;
  status: string;
}

interface ConsentListProps {
  consents: Consent[];
  className?: string;
}

const ConsentList: React.FC<ConsentListProps> = ({ consents, className = '' }) => {
  if (consents.length === 0) {
    return <EmptyState message="No consents found." className={className} />;
  }
  return (
    <div className={className}>
      {consents.map((consent, idx) => (
        <Card key={idx} title={consent.documentName} className="mb-2">
          <div className="text-sm text-gray-700 mb-1">Hash: {truncateAddress(consent.documentHash, 8)}</div>
          <div className="text-sm text-gray-700 mb-1">Recipient: {truncateAddress(consent.recipient)}</div>
          <div className="text-xs text-gray-500">Status: {consent.status}</div>
        </Card>
      ))}
    </div>
  );
};

export default ConsentList; 