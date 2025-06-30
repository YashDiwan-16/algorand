import React from 'react';

interface ConsentUserAvatarProps {
  name: string;
  status?: 'active' | 'inactive' | 'pending';
  size?: number;
}

const statusColor = {
  active: 'bg-green-400',
  inactive: 'bg-gray-400',
  pending: 'bg-yellow-400',
};

const ConsentUserAvatar: React.FC<ConsentUserAvatarProps> = ({ name, status = 'active', size = 40 }) => {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <span className={`rounded-full flex items-center justify-center font-bold text-white ${statusColor[status]}`} style={{ width: size, height: size, fontSize: size / 2 }}>
        {initials}
      </span>
      <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${statusColor[status]}`}></span>
    </div>
  );
};

export default ConsentUserAvatar; 