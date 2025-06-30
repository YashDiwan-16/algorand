import React, { useState } from "react";

interface ConsentInviteUserModalProps {
  open: boolean;
  onClose: () => void;
  onInvite: (email: string) => void;
}

const ConsentInviteUserModal: React.FC<ConsentInviteUserModalProps> = ({ open, onClose, onInvite }) => {
  const [email, setEmail] = useState("");
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
        <h2 className="text-lg font-semibold mb-4">Invite User</h2>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter email"
          className="w-full border rounded px-3 py-2 mb-4"
        />
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">Cancel</button>
          <button onClick={() => { onInvite(email); setEmail(""); }} className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Invite</button>
        </div>
      </div>
    </div>
  );
};

export default ConsentInviteUserModal; 