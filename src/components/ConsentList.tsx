import React, { useState } from 'react';
import Card from './Card';
import EmptyState from './EmptyState';
import { truncateAddress } from '../utils/truncateAddress';
import Modal from './Modal';
import Button from './Button';

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
  const [selectedConsent, setSelectedConsent] = useState<Consent | null>(null);

  const handleViewDetails = (consent: Consent) => {
    setSelectedConsent(consent);
  };

  const handleCloseModal = () => {
    setSelectedConsent(null);
  };

  if (consents.length === 0) {
    return <EmptyState message="No consents found." className={className} />;
  }

  return (
    <div className={className}>
      {consents.map((consent, idx) => (
        <Card key={idx} title={consent.documentName} className="mb-2 flex justify-between items-center">
          <div>
            <div className="text-sm text-gray-700 mb-1">Recipient: {truncateAddress(consent.recipient)}</div>
            <div className="text-xs text-gray-500">Status: {consent.status}</div>
          </div>
          <Button onClick={() => handleViewDetails(consent)}>View</Button>
        </Card>
      ))}

      {selectedConsent && (
        <Modal isOpen={!!selectedConsent} onClose={handleCloseModal} title="Consent Details">
          <div className="space-y-2">
            <p><strong>Document:</strong> {selectedConsent.documentName}</p>
            <p><strong>Hash:</strong> {selectedConsent.documentHash}</p>
            <p><strong>Recipient:</strong> {selectedConsent.recipient}</p>
            <p><strong>Status:</strong> {selectedConsent.status}</p>
            {/* Add more details here, e.g., expiry, permissions */}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ConsentList; 