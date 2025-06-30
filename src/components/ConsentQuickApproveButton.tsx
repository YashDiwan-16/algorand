import React from 'react';

interface ConsentQuickApproveButtonProps {
  onApprove: () => void;
  disabled?: boolean;
}

const ConsentQuickApproveButton: React.FC<ConsentQuickApproveButtonProps> = ({ onApprove, disabled }) => (
  <button
    className="px-3 py-1 bg-green-600 text-white rounded shadow hover:bg-green-700 disabled:opacity-50"
    onClick={onApprove}
    disabled={disabled}
    type="button"
  >
    Approve
  </button>
);

export default ConsentQuickApproveButton; 