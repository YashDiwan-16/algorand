import React from "react";

interface ConsentProgressBarProps {
  value: number;
}

const ConsentProgressBar: React.FC<ConsentProgressBarProps> = ({ value }) => (
  <div className="w-full bg-gray-200 rounded h-2">
    <div className="bg-blue-500 h-2 rounded" style={{ width: `${value}%` }} />
  </div>
);

export default ConsentProgressBar; 