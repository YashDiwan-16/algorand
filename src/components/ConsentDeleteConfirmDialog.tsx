import React from 'react';

interface ConsentDeleteConfirmDialogProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConsentDeleteConfirmDialog: React.FC<ConsentDeleteConfirmDialogProps> = ({ open, onCancel, onConfirm }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded shadow p-6 w-full max-w-sm">
        <h3 className="text-lg font-bold mb-4">Delete Consent?</h3>
        <p className="mb-6 text-sm text-gray-600">Are you sure you want to delete this consent? This action cannot be undone.</p>
        <div className="flex gap-2 justify-end">
          <button className="px-4 py-2 bg-gray-200 rounded" onClick={onCancel}>Cancel</button>
          <button className="px-4 py-2 bg-red-600 text-white rounded" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ConsentDeleteConfirmDialog; 