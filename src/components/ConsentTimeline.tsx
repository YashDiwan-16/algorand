import React from 'react';

export type ConsentEventType = 'requested' | 'granted' | 'viewed' | 'revoked';

export interface ConsentEvent {
  type: ConsentEventType;
  timestamp: string;
  actor: string;
  note?: string;
}

interface ConsentTimelineProps {
  events: ConsentEvent[];
}

const eventConfig: Record<ConsentEventType, { color: string; label: string; icon: JSX.Element }> = {
  requested: {
    color: 'bg-blue-500',
    label: 'Requested',
    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" /></svg>,
  },
  granted: {
    color: 'bg-green-500',
    label: 'Granted',
    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>,
  },
  viewed: {
    color: 'bg-yellow-500',
    label: 'Viewed',
    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /></svg>,
  },
  revoked: {
    color: 'bg-red-500',
    label: 'Revoked',
    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" /></svg>,
  },
};

const ConsentTimeline: React.FC<ConsentTimelineProps> = ({ events }) => (
  <ol className="relative border-l border-gray-200">
    {events.map((event, idx) => {
      const config = eventConfig[event.type];
      return (
        <li key={idx} className="mb-8 ml-6">
          <span className={`absolute flex items-center justify-center w-8 h-8 rounded-full -left-4 ring-4 ring-white ${config.color}`}>
            {config.icon}
          </span>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold uppercase ${config.color.replace('bg-', 'text-')}`}>{config.label}</span>
            <span className="text-xs text-gray-400">{new Date(event.timestamp).toLocaleString()}</span>
          </div>
          <div className="text-sm text-gray-700 mt-1">By: <span className="font-medium">{event.actor}</span></div>
          {event.note && <div className="text-xs text-gray-500 mt-1">Note: {event.note}</div>}
        </li>
      );
    })}
  </ol>
);

export default ConsentTimeline; 