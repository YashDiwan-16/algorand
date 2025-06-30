import React, { useState } from "react";

interface ConsentAccordionProps {
  title: string;
  children: React.ReactNode;
}

const ConsentAccordion: React.FC<ConsentAccordionProps> = ({ title, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-2">
      <button onClick={() => setOpen(o => !o)} className="w-full text-left font-medium py-2">
        {title} <span className="float-right">{open ? "▲" : "▼"}</span>
      </button>
      {open && <div className="p-2 border-t">{children}</div>}
    </div>
  );
};

export default ConsentAccordion; 