import React, { useState } from 'react';

interface ConsentFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { document: string; recipient: string; note: string }) => void;
}

const ConsentFormModal: React.FC<ConsentFormModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [document, setDocument] = useState('');
  const [recipient, setRecipient] = useState('');
  const [note, setNote] = useState('');
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <form
        className="bg-white rounded shadow p-6 w-full max-w-md"
        onSubmit={e => {
          e.preventDefault();
          onSubmit({ document, recipient, note });
        }}
      >
        <h3 className="text-lg font-bold mb-4">Request Consent</h3>
        <input
          className="w-full border rounded p-2 mb-2"
          placeholder="Document name"
          value={document}
          onChange={e => setDocument(e.target.value)}
          required
        />
        <input
          className="w-full border rounded p-2 mb-2"
          placeholder="Recipient address/email"
          value={recipient}
          onChange={e => setRecipient(e.target.value)}
          required
        />
        <textarea
          className="w-full border rounded p-2 mb-4"
          placeholder="Optional note"
          value={note}
          onChange={e => setNote(e.target.value)}
        />
        <div className="flex gap-2 justify-end">
          <button className="px-4 py-2 bg-gray-200 rounded" type="button" onClick={onClose}>Cancel</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded" type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default ConsentFormModal; 