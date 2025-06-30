import React from "react";

interface ConsentRoleSelectorProps {
  value: string;
  onChange: (role: string) => void;
  options: string[];
}

const ConsentRoleSelector: React.FC<ConsentRoleSelectorProps> = ({ value, onChange, options }) => (
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

export default ConsentRoleSelector; 