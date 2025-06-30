import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="text-center my-10">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="my-4">The page you are looking for does not exist.</p>
      <Link to="/" className="text-blue-500 hover:underline">
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage; 