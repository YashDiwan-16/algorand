import React from 'react';
import ConsentTimeline, { ConsentEvent } from './ConsentTimeline';

interface ConsentDetailProps {
  document: string;
  requester: string;
  events: ConsentEvent[];
  onApprove?: () => void;
  onRevoke?: () => void;
  onView?: () => void;
}

const ConsentDetail: React.FC<ConsentDetailProps> = ({ document, requester, events, onApprove, onRevoke, onView }) => (
  <div className="bg-white rounded shadow p-6 max-w-xl mx-auto">
    <h2 className="text-xl font-bold mb-2">Consent Details</h2>
    <div className="mb-2 text-gray-700">Document: <span className="font-medium">{document}</span></div>
    <div className="mb-4 text-gray-700">Requester: <span className="font-medium">{requester}</span></div>
    <ConsentTimeline events={events} />
    <div className="flex gap-2 mt-6">
      {onApprove && <button className="px-4 py-2 bg-green-600 text-white rounded" onClick={onApprove}>Approve</button>}
      {onRevoke && <button className="px-4 py-2 bg-red-600 text-white rounded" onClick={onRevoke}>Revoke</button>}
      {onView && <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={onView}>View</button>}
    </div>
  </div>
);

export default ConsentDetail; 