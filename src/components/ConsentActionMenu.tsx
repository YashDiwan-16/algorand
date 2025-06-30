import React, { useState } from 'react';

interface ConsentActionMenuProps {
  onApprove?: () => void;
  onRevoke?: () => void;
  onView?: () => void;
  onDelete?: () => void;
}

const ConsentActionMenu: React.FC<ConsentActionMenuProps> = ({ onApprove, onRevoke, onView, onDelete }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-block text-left">
      <button onClick={() => setOpen(o => !o)} className="px-2 py-1 bg-gray-200 rounded">Actions</button>
      {open && (
        <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-10">
          <ul className="py-1 text-sm">
            {onApprove && <li><button className="w-full text-left px-4 py-2 hover:bg-gray-100" onClick={onApprove}>Approve</button></li>}
            {onRevoke && <li><button className="w-full text-left px-4 py-2 hover:bg-gray-100" onClick={onRevoke}>Revoke</button></li>}
            {onView && <li><button className="w-full text-left px-4 py-2 hover:bg-gray-100" onClick={onView}>View</button></li>}
            {onDelete && <li><button className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-700" onClick={onDelete}>Delete</button></li>}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ConsentActionMenu; 