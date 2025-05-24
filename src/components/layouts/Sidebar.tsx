"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  FiHome, 
  FiFileText, 
  FiUsers, 
  FiSettings, 
  FiShield, 
  FiActivity,
  FiLogOut,
  FiX
} from "react-icons/fi";
import { motion } from "framer-motion";

interface SidebarProps {
  isMobile?: boolean;
  onClose?: () => void;
}

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: FiHome },
  { href: "/dashboard/consents", label: "Consents", icon: FiFileText },
  { href: "/dashboard/users", label: "Users", icon: FiUsers },
  { href: "/dashboard/activity", label: "Activity", icon: FiActivity },
  { href: "/dashboard/security", label: "Security", icon: FiShield },
  { href: "/dashboard/settings", label: "Settings", icon: FiSettings },
];

export default function Sidebar({ isMobile = false, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className={`${isMobile ? "w-full h-full" : "w-64 min-h-screen sticky top-0"} bg-gray-900 text-white flex flex-col`}>
      {/* Mobile header with close button */}
      {isMobile && onClose && (
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className="text-xl font-bold">Menu</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-800 transition-colors"
            aria-label="Close menu"
          >
            <FiX size={20} />
          </button>
        </div>
      )}

      {/* Logo and app name */}
      {!isMobile && (
        <div className="flex items-center p-6 border-b border-gray-800">
          <div className="h-8 w-8 rounded-md bg-blue-600 flex items-center justify-center mr-2">
            <FiShield size={18} />
          </div>
          <h1 className="text-xl font-bold">Consent Manager</h1>
        </div>
      )}

      {/* Nav links */}
      <nav className="flex-1 py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            
            return (
              <li key={item.href}>
                <Link href={item.href}>
                  <div
                    className={`flex items-center py-3 px-4 rounded-lg transition-colors ${
                      isActive 
                        ? "bg-blue-600 text-white" 
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    <span className="mr-3">
                      <item.icon size={18} />
                    </span>
                    <span className="font-medium">{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="w-1 h-5 bg-white absolute right-0 rounded-l-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer with logout */}
      <div className="p-4 border-t border-gray-800">
        <button 
          className="flex items-center w-full py-3 px-4 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
        >
          <FiLogOut className="mr-3" size={18} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
} 