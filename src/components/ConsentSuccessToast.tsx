import React from "react";

interface ConsentSuccessToastProps {
  open: boolean;
  message: string;
  onClose: () => void;
}

const ConsentSuccessToast: React.FC<ConsentSuccessToastProps> = ({ open, message, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded shadow-lg flex items-center space-x-3 animate-fade-in">
      <span className="font-medium">{message}</span>
      <button onClick={onClose} className="ml-4 text-white hover:text-green-200">&times;</button>
    </div>
  );
};

export default ConsentSuccessToast; 