import React, { useState } from 'react';

interface ConsentMobileMenuProps {
  links: { label: string; href: string }[];
}

const ConsentMobileMenu: React.FC<ConsentMobileMenuProps> = ({ links }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden">
      <button className="p-2" onClick={() => setOpen(o => !o)} aria-label="Open menu">
        <span className="block w-6 h-0.5 bg-gray-800 mb-1" />
        <span className="block w-6 h-0.5 bg-gray-800 mb-1" />
        <span className="block w-6 h-0.5 bg-gray-800" />
      </button>
      {open && (
        <nav className="absolute top-12 left-0 w-full bg-white shadow-md z-50">
          <ul className="flex flex-col">
            {links.map(link => (
              <li key={link.href}>
                <a href={link.href} className="block px-4 py-3 border-b border-gray-100 text-gray-800" onClick={() => setOpen(false)}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
};

export default ConsentMobileMenu; 