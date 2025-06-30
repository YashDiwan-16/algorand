import React from 'react';

interface ConsentTagProps {
  label: string;
  color?: string;
}

const colorMap: Record<string, string> = {
  medical: 'bg-blue-100 text-blue-800',
  legal: 'bg-green-100 text-green-800',
  personal: 'bg-yellow-100 text-yellow-800',
  default: 'bg-gray-100 text-gray-800',
};

const ConsentTag: React.FC<ConsentTagProps> = ({ label, color }) => {
  const colorClass = colorMap[label.toLowerCase()] || colorMap[color || 'default'];
  return (
    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${colorClass}`} data-testid="consent-tag">{label}</span>
  );
};

export default ConsentTag; 