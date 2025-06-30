import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer'; 

/**
 * Props for the Layout component.
 */
interface LayoutProps {
  /**
   * The main content to be rendered within the layout.
   */
  children: ReactNode;
}

/**
 * A standard layout component that includes a Navbar, main content area, and a Footer.
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto p-4">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout; 