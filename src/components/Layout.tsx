import React, { ReactNode } from 'react';
import Navbar from './Navbar';
// We will create the Footer component next
// import Footer from './Footer'; 

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto p-4">{children}</main>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout; 