import React from 'react';

interface ConsentActionBarProps {
  onApprove?: () => void;
  onRevoke?: () => void;
  onView?: () => void;
  disabled?: boolean;
}

const ConsentActionBar: React.FC<ConsentActionBarProps> = ({ onApprove, onRevoke, onView, disabled }) => (
  <div className="flex gap-2">
    {onApprove && <button className="px-4 py-2 bg-green-600 text-white rounded" onClick={onApprove} disabled={disabled}>Approve</button>}
    {onRevoke && <button className="px-4 py-2 bg-red-600 text-white rounded" onClick={onRevoke} disabled={disabled}>Revoke</button>}
    {onView && <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={onView} disabled={disabled}>View</button>}
  </div>
);

export default ConsentActionBar; 