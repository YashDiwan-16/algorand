import React from 'react';

interface ConsentUserListProps {
  users: { name: string; role?: string }[];
}

const ConsentUserList: React.FC<ConsentUserListProps> = ({ users }) => (
  <ul className="flex flex-col gap-2">
    {users.map((u, i) => (
      <li key={i} className="flex items-center gap-2">
        <span className="inline-block w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-700">
          {u.name.split(' ').map(n => n[0]).join('').toUpperCase()}
        </span>
        <span className="font-medium">{u.name}</span>
        {u.role && <span className="ml-2 px-2 py-0.5 rounded text-xs bg-blue-100 text-blue-800">{u.role}</span>}
      </li>
    ))}
  </ul>
);

export default ConsentUserList; 