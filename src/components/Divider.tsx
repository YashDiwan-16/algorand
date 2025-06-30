import React from 'react';

interface DividerProps {
  vertical?: boolean;
  className?: string;
}

const Divider: React.FC<DividerProps> = ({ vertical = false, className = '' }) => {
  return vertical ? (
    <div className={`w-px h-full bg-gray-200 ${className}`} />
  ) : (
    <div className={`h-px w-full bg-gray-200 my-4 ${className}`} />
  );
};

export default Divider; 