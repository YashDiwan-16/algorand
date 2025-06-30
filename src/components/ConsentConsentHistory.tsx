import React from "react";

interface HistoryItem {
  date: string;
  action: string;
  user: string;
}

interface ConsentConsentHistoryProps {
  history: HistoryItem[];
}

const ConsentConsentHistory: React.FC<ConsentConsentHistoryProps> = ({ history }) => (
  <ul className="border-l-2 border-gray-200 pl-4">
    {history.map((item, idx) => (
      <li key={idx} className="mb-4">
        <div className="text-xs text-gray-400">{item.date}</div>
        <div className="font-medium">{item.action}</div>
        <div className="text-sm text-gray-600">{item.user}</div>
      </li>
    ))}
  </ul>
);

export default ConsentConsentHistory; 