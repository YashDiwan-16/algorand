import React, { useState } from "react";

interface ConsentProfileMenuProps {
  userName: string;
  onLogout: () => void;
}

const ConsentProfileMenu: React.FC<ConsentProfileMenuProps> = ({ userName, onLogout }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none"
      >
        <span className="mr-2 font-medium">{userName}</span>
        <span>▼</span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
          <button
            onClick={onLogout}
            className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ConsentProfileMenu; 