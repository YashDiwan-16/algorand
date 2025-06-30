import React from 'react';

type PillType = 'success' | 'warning' | 'error' | 'default';

interface PillProps {
  type?: PillType;
  children: React.ReactNode;
}

const typeStyles: Record<PillType, string> = {
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  error: 'bg-red-100 text-red-800',
  default: 'bg-gray-100 text-gray-800',
};

const Pill: React.FC<PillProps> = ({ type = 'default', children }) => {
  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${typeStyles[type]}`}>
      {children}
    </span>
  );
};

export default Pill; 