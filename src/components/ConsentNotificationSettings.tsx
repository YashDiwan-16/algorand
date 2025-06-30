import React, { useState } from 'react';

interface ConsentNotificationSettingsProps {
  email: boolean;
  sms: boolean;
  onChange: (settings: { email: boolean; sms: boolean }) => void;
}

const ConsentNotificationSettings: React.FC<ConsentNotificationSettingsProps> = ({ email, sms, onChange }) => {
  const [emailPref, setEmailPref] = useState(email);
  const [smsPref, setSmsPref] = useState(sms);
  return (
    <div className="bg-white rounded shadow p-4 max-w-sm">
      <h4 className="font-bold mb-2">Notification Preferences</h4>
      <div className="flex items-center mb-2">
        <input type="checkbox" id="emailPref" checked={emailPref} onChange={e => { setEmailPref(e.target.checked); onChange({ email: e.target.checked, sms: smsPref }); }} className="mr-2" />
        <label htmlFor="emailPref" className="text-sm">Email notifications</label>
      </div>
      <div className="flex items-center mb-4">
        <input type="checkbox" id="smsPref" checked={smsPref} onChange={e => { setSmsPref(e.target.checked); onChange({ email: emailPref, sms: e.target.checked }); }} className="mr-2" />
        <label htmlFor="smsPref" className="text-sm">SMS notifications</label>
      </div>
    </div>
  );
};

export default ConsentNotificationSettings; 