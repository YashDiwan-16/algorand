import React from 'react';
import { ConsentEvent } from './ConsentTimeline';

interface ConsentTimelineMiniProps {
  events: ConsentEvent[];
}

const colorMap: Record<string, string> = {
  requested: 'bg-blue-400',
  granted: 'bg-green-400',
  viewed: 'bg-yellow-400',
  revoked: 'bg-red-400',
};

const ConsentTimelineMini: React.FC<ConsentTimelineMiniProps> = ({ events }) => (
  <div className="flex items-center gap-1">
    {events.map((e, i) => (
      <span
        key={i}
        className={`w-3 h-3 rounded-full ${colorMap[e.type] || 'bg-gray-300'}`}
        title={`${e.type} at ${new Date(e.timestamp).toLocaleString()}`}
      />
    ))}
  </div>
);

export default ConsentTimelineMini; 