"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { WalletProvider } from "@/providers/WalletContext";
import { FiMenu, FiX } from "react-icons/fi";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll detection for header shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile sidebar when route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Get page title from pathname
  const getPageTitle = () => {
    const path = pathname.split("/").pop();
    if (!path) return "Dashboard";
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300 ${
          mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      >
        <div
          className={`fixed inset-y-0 left-0 flex flex-col w-72 max-w-sm bg-white transform transition-transform duration-300 ease-in-out ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-semibold text-gray-800">Menu</h2>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 rounded-full text-gray-500 hover:bg-gray-100"
            >
              <FiX size={24} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <Sidebar />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="md:ml-64 flex-1">
        {/* Header */}
        <header
          className={`sticky top-0 z-30 bg-white transition-shadow duration-300 ${
            scrolled ? "shadow-md" : ""
          }`}
        >
          <div className="flex h-16 px-4 items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setMobileOpen(true)}
                className="md:hidden mr-4 p-2 rounded-md text-gray-500 hover:bg-gray-100"
              >
                <FiMenu size={24} />
              </button>
              <h1 className="text-xl font-semibold text-gray-800">
                {getPageTitle()}
              </h1>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1">
          <WalletProvider>{children}</WalletProvider>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-4 px-6">
          <div className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Consent Manager | Powered by Algorand
          </div>
        </footer>
      </div>
    </div>
  );
} 