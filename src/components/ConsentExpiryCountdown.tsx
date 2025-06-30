import React, { useEffect, useState } from 'react';

interface ConsentExpiryCountdownProps {
  expiry: string | number | Date;
}

function getTimeLeft(expiry: string | number | Date) {
  const now = new Date();
  const end = new Date(expiry);
  const diff = end.getTime() - now.getTime();
  if (diff <= 0) return 'Expired';
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  return `${days}d ${hours}h ${minutes}m`;
}

const ConsentExpiryCountdown: React.FC<ConsentExpiryCountdownProps> = ({ expiry }) => {
  const [left, setLeft] = useState(() => getTimeLeft(expiry));
  useEffect(() => {
    const timer = setInterval(() => setLeft(getTimeLeft(expiry)), 60000);
    return () => clearInterval(timer);
  }, [expiry]);
  return <span className="text-xs font-mono text-gray-500">{left}</span>;
};

export default ConsentExpiryCountdown; 