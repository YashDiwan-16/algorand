import React from 'react';

interface EmptyStateProps {
  message: string;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message, className = '' }) => {
  return (
    <div className={`text-center py-10 px-6 bg-gray-50 rounded-lg ${className}`}>
      <p className="text-gray-500">{message}</p>
    </div>
  );
};

export default EmptyState; 