import React from 'react';
import { ConsentEventType } from './ConsentTimeline';

interface ConsentFilterBarProps {
  status: ConsentEventType | '';
  onStatusChange: (status: ConsentEventType | '') => void;
  user: string;
  onUserChange: (user: string) => void;
  date: string;
  onDateChange: (date: string) => void;
}

const ConsentFilterBar: React.FC<ConsentFilterBarProps> = ({ status, onStatusChange, user, onUserChange, date, onDateChange }) => (
  <div className="flex flex-wrap gap-2 mb-4 items-end" data-testid="consent-filter-bar">
    <div>
      <label className="block text-xs font-medium mb-1">Status</label>
      <select value={status} onChange={e => onStatusChange(e.target.value as ConsentEventType | '')} className="border rounded px-2 py-1">
        <option value="">All</option>
        <option value="requested">Requested</option>
        <option value="granted">Granted</option>
        <option value="viewed">Viewed</option>
        <option value="revoked">Revoked</option>
      </select>
    </div>
    <div>
      <label className="block text-xs font-medium mb-1">User</label>
      <input value={user} onChange={e => onUserChange(e.target.value)} className="border rounded px-2 py-1" placeholder="User..." />
    </div>
    <div>
      <label className="block text-xs font-medium mb-1">Date</label>
      <input type="date" value={date} onChange={e => onDateChange(e.target.value)} className="border rounded px-2 py-1" />
    </div>
  </div>
);

export default ConsentFilterBar; 