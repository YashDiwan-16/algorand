import React from 'react';
import { ConsentEvent } from './ConsentTimeline';

interface ConsentAuditTrailProps {
  events: ConsentEvent[];
}

const ConsentAuditTrail: React.FC<ConsentAuditTrailProps> = ({ events }) => (
  <div className="bg-white rounded shadow p-4">
    <h4 className="font-bold mb-2">Audit Trail</h4>
    <ul className="divide-y divide-gray-200">
      {events.map((e, i) => (
        <li key={i} className="py-2 text-sm">
          <span className="font-semibold capitalize">{e.type}</span> by <span className="font-mono">{e.actor}</span> at <span className="text-xs text-gray-500">{new Date(e.timestamp).toLocaleString()}</span>
          {e.note && <span className="block text-xs text-gray-400 mt-1">Note: {e.note}</span>}
        </li>
      ))}
    </ul>
  </div>
);

export default ConsentAuditTrail; 