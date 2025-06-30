import React from 'react';

interface ConsentThemeToggleProps {
  dark: boolean;
  onToggle: () => void;
}

const ConsentThemeToggle: React.FC<ConsentThemeToggleProps> = ({ dark, onToggle }) => (
  <button
    className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 shadow"
    onClick={onToggle}
    type="button"
  >
    {dark ? '🌙 Dark' : '☀️ Light'}
  </button>
);

export default ConsentThemeToggle; 