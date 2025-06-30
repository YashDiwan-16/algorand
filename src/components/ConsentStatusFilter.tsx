import React from 'react';

interface ConsentStatusFilterProps {
  value: string;
  onChange: (status: string) => void;
}

const statuses = ['requested', 'granted', 'viewed', 'revoked'];

const ConsentStatusFilter: React.FC<ConsentStatusFilterProps> = ({ value, onChange }) => (
  <select
    className="border rounded px-2 py-1"
    value={value}
    onChange={e => onChange(e.target.value)}
  >
    <option value="">All statuses</option>
    {statuses.map(s => (
      <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
    ))}
  </select>
);

export default ConsentStatusFilter; 