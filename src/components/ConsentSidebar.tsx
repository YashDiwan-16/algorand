import React from 'react';

interface ConsentSidebarProps {
  links: { label: string; href: string }[];
}

const ConsentSidebar: React.FC<ConsentSidebarProps> = ({ links }) => (
  <aside className="hidden md:block w-56 bg-gray-50 h-full p-4 border-r">
    <nav>
      <ul className="flex flex-col gap-2">
        {links.map(link => (
          <li key={link.href}>
            <a href={link.href} className="block px-3 py-2 rounded hover:bg-blue-100 text-gray-800">{link.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  </aside>
);

export default ConsentSidebar; 