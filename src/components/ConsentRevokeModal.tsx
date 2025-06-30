import React from "react";

interface ConsentRevokeModalProps {
  open: boolean;
  onClose: () => void;
  onRevoke: () => void;
}

const ConsentRevokeModal: React.FC<ConsentRevokeModalProps> = ({ open, onClose, onRevoke }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
        <h2 className="text-lg font-semibold mb-4 text-red-700">Revoke Consent</h2>
        <p className="mb-6">Are you sure you want to revoke consent? This action cannot be undone.</p>
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">Cancel</button>
          <button onClick={onRevoke} className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700">Revoke</button>
        </div>
      </div>
    </div>
  );
};

export default ConsentRevokeModal; 