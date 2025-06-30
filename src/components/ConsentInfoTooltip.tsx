import React, { useState } from 'react';

interface ConsentInfoTooltipProps {
  info: string;
  children: React.ReactNode;
}

const ConsentInfoTooltip: React.FC<ConsentInfoTooltipProps> = ({ info, children }) => {
  const [show, setShow] = useState(false);
  return (
    <span className="relative inline-block"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      tabIndex={0}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
    >
      {children}
      {show && (
        <span className="absolute z-10 left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-black text-white text-xs rounded shadow-lg whitespace-nowrap">
          {info}
        </span>
      )}
    </span>
  );
};

export default ConsentInfoTooltip; 