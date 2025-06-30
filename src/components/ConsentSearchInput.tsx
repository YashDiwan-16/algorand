import React from 'react';

interface ConsentSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const ConsentSearchInput: React.FC<ConsentSearchInputProps> = ({ value, onChange, placeholder = 'Search by document or user...' }) => (
  <input
    type="text"
    value={value}
    onChange={e => onChange(e.target.value)}
    placeholder={placeholder}
    className="border rounded px-3 py-1 w-full max-w-xs"
    data-testid="consent-search-input"
  />
);

export default ConsentSearchInput; 