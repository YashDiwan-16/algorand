import React from 'react';
import { ConsentEventType } from './ConsentTimeline';

const statusConfig: Record<ConsentEventType, { color: string; label: string }> = {
  requested: { color: 'bg-blue-100 text-blue-800', label: 'Requested' },
  granted: { color: 'bg-green-100 text-green-800', label: 'Granted' },
  viewed: { color: 'bg-yellow-100 text-yellow-800', label: 'Viewed' },
  revoked: { color: 'bg-red-100 text-red-800', label: 'Revoked' },
};

const ConsentStatusPill: React.FC<{ status: ConsentEventType }> = ({ status }) => {
  const config = statusConfig[status];
  return (
    <span className={`px-2 py-1 rounded text-xs font-semibold ${config.color}`}>{config.label}</span>
  );
};

export default ConsentStatusPill; 