import React from 'react';
import Card from './Card';

interface UserProfile {
  name: string;
  avatarUrl: string;
  email: string;
}

interface UserProfileCardProps {
  user: UserProfile;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ user }) => {
  return (
    <Card title="User Profile">
      <div className="flex items-center space-x-4">
        <img src={user.avatarUrl} alt={user.name} className="w-16 h-16 rounded-full" />
        <div>
          <h3 className="text-xl font-bold">{user.name}</h3>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>
    </Card>
  );
};

export default UserProfileCard; 