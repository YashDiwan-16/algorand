import React from 'react';

interface ConsentRoleBadgeProps {
  role: 'admin' | 'user' | 'auditor' | string;
}

const roleColors: Record<string, string> = {
  admin: 'bg-red-100 text-red-800',
  user: 'bg-blue-100 text-blue-800',
  auditor: 'bg-green-100 text-green-800',
  default: 'bg-gray-100 text-gray-800',
};

const ConsentRoleBadge: React.FC<ConsentRoleBadgeProps> = ({ role }) => {
  const color = roleColors[role] || roleColors.default;
  return (
    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${color}`}>{role}</span>
  );
};

export default ConsentRoleBadge; 