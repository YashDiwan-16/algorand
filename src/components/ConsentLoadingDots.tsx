import React from 'react';

const ConsentLoadingDots: React.FC = () => (
  <span className="inline-flex gap-1">
    <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
    <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '100ms' }} />
    <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
  </span>
);

export default ConsentLoadingDots; 