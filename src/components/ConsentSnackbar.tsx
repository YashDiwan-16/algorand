import React from 'react';

interface ConsentSnackbarProps {
  message: string;
  open: boolean;
  onClose: () => void;
}

const ConsentSnackbar: React.FC<ConsentSnackbarProps> = ({ message, open, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded shadow-lg z-50 flex items-center gap-2">
      <span>{message}</span>
      <button onClick={onClose} className="ml-2 text-white font-bold">×</button>
    </div>
  );
};

export default ConsentSnackbar; 