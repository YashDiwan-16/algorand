import React, { useState } from 'react';

interface ConsentNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (note: string) => void;
  initialNote?: string;
}

const ConsentNoteModal: React.FC<ConsentNoteModalProps> = ({ isOpen, onClose, onSave, initialNote = '' }) => {
  const [note, setNote] = useState(initialNote);
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded shadow p-6 w-full max-w-md">
        <h3 className="text-lg font-bold mb-2">Consent Note</h3>
        <textarea
          className="w-full border rounded p-2 mb-4"
          rows={4}
          value={note}
          onChange={e => setNote(e.target.value)}
        />
        <div className="flex gap-2 justify-end">
          <button className="px-4 py-2 bg-gray-200 rounded" onClick={onClose}>Cancel</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={() => onSave(note)}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default ConsentNoteModal; 