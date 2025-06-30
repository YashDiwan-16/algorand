import React from 'react';

interface ConsentBannerProps {
  message: string;
  type?: 'info' | 'warning' | 'error';
}

const typeStyles = {
  info: 'bg-blue-100 text-blue-800',
  warning: 'bg-yellow-100 text-yellow-800',
  error: 'bg-red-100 text-red-800',
};

const ConsentBanner: React.FC<ConsentBannerProps> = ({ message, type = 'info' }) => (
  <div className={`w-full px-4 py-3 rounded mb-4 ${typeStyles[type]}`}>{message}</div>
);

export default ConsentBanner; 