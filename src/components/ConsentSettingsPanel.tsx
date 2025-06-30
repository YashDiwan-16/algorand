import React, { useState } from 'react';

interface ConsentSettingsPanelProps {
  initialEmailNotifications?: boolean;
  initialAutoApprove?: boolean;
  onSave?: (settings: { emailNotifications: boolean; autoApprove: boolean }) => void;
}

const ConsentSettingsPanel: React.FC<ConsentSettingsPanelProps> = ({ initialEmailNotifications = true, initialAutoApprove = false, onSave }) => {
  const [emailNotifications, setEmailNotifications] = useState(initialEmailNotifications);
  const [autoApprove, setAutoApprove] = useState(initialAutoApprove);

  return (
    <div className="bg-white rounded shadow p-6 max-w-md w-full">
      <h3 className="text-lg font-bold mb-4">Consent Settings</h3>
      <div className="flex items-center mb-4">
        <input type="checkbox" id="emailNotifications" checked={emailNotifications} onChange={e => setEmailNotifications(e.target.checked)} className="mr-2" />
        <label htmlFor="emailNotifications" className="text-sm">Email notifications for consent activity</label>
      </div>
      <div className="flex items-center mb-6">
        <input type="checkbox" id="autoApprove" checked={autoApprove} onChange={e => setAutoApprove(e.target.checked)} className="mr-2" />
        <label htmlFor="autoApprove" className="text-sm">Auto-approve trusted requests</label>
      </div>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() => onSave && onSave({ emailNotifications, autoApprove })}
      >
        Save Settings
      </button>
    </div>
  );
};

export default ConsentSettingsPanel; 