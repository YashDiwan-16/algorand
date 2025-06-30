import React from 'react';
import Card from '../components/Card';

const SettingsPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Settings</h1>
      <Card title="User Preferences">
        <p>Settings and preferences will be available here in a future update.</p>
      </Card>
    </div>
  );
};

export default SettingsPage; 