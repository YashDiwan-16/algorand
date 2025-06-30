import React from 'react';
import Card from './Card';
import { formatDate } from '../utils/formatDate';

interface ActivityItem {
  id: string;
  description: string;
  timestamp: Date;
}

interface RecentActivityProps {
  activities: ActivityItem[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  return (
    <Card title="Recent Activity">
      <ul className="space-y-4">
        {activities.map(activity => (
          <li key={activity.id} className="border-b pb-2">
            <p className="text-gray-800">{activity.description}</p>
            <p className="text-xs text-gray-500">{formatDate(activity.timestamp)}</p>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default RecentActivity; 