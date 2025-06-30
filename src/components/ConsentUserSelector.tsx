import React from 'react';

interface ConsentUserSelectorProps {
  users: { id: string; name: string }[];
  value: string;
  onChange: (id: string) => void;
}

const ConsentUserSelector: React.FC<ConsentUserSelectorProps> = ({ users, value, onChange }) => (
  <select
    className="border rounded px-2 py-1"
    value={value}
    onChange={e => onChange(e.target.value)}
  >
    <option value="">Select user</option>
    {users.map(u => (
      <option key={u.id} value={u.id}>{u.name}</option>
    ))}
  </select>
);

export default ConsentUserSelector; 