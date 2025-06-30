import React, { ReactNode, useState } from 'react';

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  const [visible, setVisible] = useState(false);

  return (
    <span className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <span className="absolute z-10 left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-black text-white text-xs rounded shadow-lg whitespace-nowrap">
          {content}
        </span>
      )}
    </span>
  );
};

export default Tooltip; 