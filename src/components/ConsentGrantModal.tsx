import React from "react";

interface ConsentGrantModalProps {
  open: boolean;
  onClose: () => void;
  onGrant: () => void;
}

const ConsentGrantModal: React.FC<ConsentGrantModalProps> = ({ open, onClose, onGrant }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
        <h2 className="text-lg font-semibold mb-4">Grant Consent</h2>
        <p className="mb-6">Are you sure you want to grant consent for this request?</p>
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">Cancel</button>
          <button onClick={onGrant} className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700">Grant</button>
        </div>
      </div>
    </div>
  );
};

export default ConsentGrantModal; 