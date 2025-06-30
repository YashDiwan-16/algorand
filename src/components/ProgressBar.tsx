import React from 'react';

interface ProgressBarProps {
  value: number; // 0 to 100
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, className = '' }) => (
  <div className={`w-full bg-gray-200 rounded h-3 ${className}`}>
    <div
      className="bg-blue-500 h-3 rounded transition-all duration-300"
      style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
    />
  </div>
);

export default ProgressBar; 