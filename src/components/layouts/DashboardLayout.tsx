'use client';

import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { FiMenu, FiBell, FiUser } from "react-icons/fi";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Path to title mapping
  const getPageTitle = () => {
    const path = pathname.split("/").filter(Boolean);
    
    if (path.length === 1 && path[0] === "dashboard") {
      return "Dashboard";
    }
    
    if (path.length > 1) {
      return path[1].charAt(0).toUpperCase() + path[1].slice(1);
    }
    
    return "Dashboard";
  };

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close sidebar on route change
  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [pathname]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar - Overlay */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          
          {/* Sidebar */}
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-gray-900 overflow-y-auto">
            <Sidebar isMobile={true} onClose={() => setIsMobileSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Navigation */}
        <header 
          className={`bg-white shadow-sm py-4 px-6 flex items-center justify-between z-10 transition-all ${
            isScrolled ? "sticky top-0 shadow-md" : ""
          }`}
        >
          <div className="flex items-center space-x-4">
            <button
              className="md:hidden text-gray-600 hover:text-gray-900 focus:outline-none"
              onClick={() => setIsMobileSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <FiMenu size={24} />
            </button>
            <h1 className="text-xl font-semibold text-gray-800">{getPageTitle()}</h1>
          </div>

          <div className="flex items-center space-x-4">
            <button 
              className="p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              aria-label="Notifications"
            >
              <FiBell size={20} />
            </button>
            <Link 
              href="/dashboard/profile"
              className="flex items-center space-x-1 p-2 rounded-full hover:bg-gray-100"
            >
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">
                <FiUser size={18} />
              </div>
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>

        {/* Footer */}
        <footer className="bg-white p-4 text-center text-sm text-gray-500 border-t">
          <p>© {new Date().getFullYear()} Consent Manager. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
} 