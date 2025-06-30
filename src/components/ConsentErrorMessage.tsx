import React from 'react';

interface ConsentErrorMessageProps {
  message: string;
}

const ConsentErrorMessage: React.FC<ConsentErrorMessageProps> = ({ message }) => (
  <div className="bg-red-100 text-red-800 px-4 py-2 rounded mb-2 text-sm">
    {message}
  </div>
);

export default ConsentErrorMessage; 