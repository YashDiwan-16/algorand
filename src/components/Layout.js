import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navbar />
      <div className="pt-16"> {/* Add padding-top to account for fixed navbar */}
        {children}
      </div>
    </div>
  );
};

export default Layout; 