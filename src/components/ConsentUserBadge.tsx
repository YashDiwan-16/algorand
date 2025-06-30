import React from 'react';

interface ConsentUserBadgeProps {
  name: string;
}

const ConsentUserBadge: React.FC<ConsentUserBadgeProps> = ({ name }) => (
  <span className="inline-block px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-xs font-semibold">
    {name}
  </span>
);

export default ConsentUserBadge; 