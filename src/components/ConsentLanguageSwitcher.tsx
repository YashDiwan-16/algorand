import React from "react";

interface ConsentLanguageSwitcherProps {
  value: string;
  onChange: (lang: string) => void;
  options: string[];
}

const ConsentLanguageSwitcher: React.FC<ConsentLanguageSwitcherProps> = ({ value, onChange, options }) => (
  <select
    value={value}
    onChange={e => onChange(e.target.value)}
    className="border rounded px-3 py-2"
  >
    {options.map(opt => (
      <option key={opt} value={opt}>{opt}</option>
    ))}
  </select>
);

export default ConsentLanguageSwitcher; 