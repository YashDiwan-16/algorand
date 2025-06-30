import React from 'react';

interface ConsentNotificationToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
}

const typeStyles = {
  success: 'bg-green-600 text-white',
  error: 'bg-red-600 text-white',
  info: 'bg-blue-600 text-white',
};

const ConsentNotificationToast: React.FC<ConsentNotificationToastProps> = ({ message, type = 'info', onClose }) => (
  <div className={`fixed bottom-4 right-4 px-4 py-3 rounded shadow-lg flex items-center gap-2 ${typeStyles[type]}`} role="alert">
    <span>{message}</span>
    <button onClick={onClose} className="ml-2 text-white font-bold">×</button>
  </div>
);

export default ConsentNotificationToast; 