import React from "react";

interface ConsentEmptyStateProps {
  message: string;
  action?: React.ReactNode;
}

const ConsentEmptyState: React.FC<ConsentEmptyStateProps> = ({ message, action }) => (
  <div className="text-center py-12 text-gray-400">
    <div className="mb-4 text-lg">{message}</div>
    {action}
  </div>
);

export default ConsentEmptyState; 