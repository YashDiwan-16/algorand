import React, { useState, useEffect } from 'react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
  duration?: number;
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const baseStyle = 'fixed top-5 right-5 p-4 rounded-lg shadow-lg text-white';
  const typeStyle = type === 'success' ? 'bg-green-500' : 'bg-red-500';

  return (
    <div className={`${baseStyle} ${typeStyle}`}>
      {message}
      <button onClick={onClose} className="ml-4 font-bold">X</button>
    </div>
  );
};

export default Notification; 