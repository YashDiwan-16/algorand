import React, { useState, ReactNode } from 'react';

interface AccordionProps {
  title: string;
  children: ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border rounded mb-2">
      <button
        className="w-full text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 font-semibold"
        onClick={() => setOpen((o) => !o)}
      >
        {title}
      </button>
      {open && <div className="px-4 py-2 bg-white">{children}</div>}
    </div>
  );
};

export default Accordion; 