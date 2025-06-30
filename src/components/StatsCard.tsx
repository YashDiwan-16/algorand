import React from 'react';
import Card from './Card';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon }) => {
  return (
    <Card>
      <div className="flex items-center">
        <div className="p-3 bg-blue-500 text-white rounded-full mr-4">
          {icon}
        </div>
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </Card>
  );
};

export default StatsCard; 