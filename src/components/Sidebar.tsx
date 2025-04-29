'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  FiHome, 
  FiUserPlus, 
  FiFileText, 
  FiShield, 
  FiClock,
  FiSettings, 
  FiLock,
  FiHelpCircle,
  FiActivity,
  FiUser,
  FiUsers,
  FiX,
  FiMap,
  FiDatabase
} from "react-icons/fi";
import Image from "next/image";
import { LuLayoutDashboard, LuShield } from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  adminOnly?: boolean;
}

const Sidebar = ({ mobileOpen = false, closeMobile }: { mobileOpen?: boolean; closeMobile?: () => void }) => {
  const [mounted, setMounted] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true); // For demo, we'll assume user is admin
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const pathname = usePathname();

  const mainNavItems: NavItem[] = [
    { name: "Dashboard", href: "/dashboard", icon: FiHome },
    { name: "Identity", href: "/dashboard/identity", icon: FiUser },
    { name: "Consents", href: "/dashboard/consents", icon: FiShield },
    { name: "Documents", href: "/dashboard/documents", icon: FiFileText },
    { name: "Activity", href: "/dashboard/activity", icon: FiActivity, adminOnly: true },
    { name: "Users", href: "/dashboard/users", icon: FiUsers, adminOnly: true },
    { name: "History", href: "/dashboard/history404", icon: FiClock },
  ];

  const secondaryNavItems: NavItem[] = [
    { name: "Security", href: "/dashboard/security", icon: FiLock, adminOnly: true },
    { name: "Settings", href: "/dashboard/settings", icon: FiSettings },
    { name: "Privacy", href: "/dashboard/privacy", icon: FiLock },
    { name: "Help", href: "/dashboard/help", icon: FiHelpCircle },
  ];

  // Filter items based on admin status
  const filteredMainNavItems = mainNavItems.filter(item => !item.adminOnly || isAdmin);
  const filteredSecondaryNavItems = secondaryNavItems.filter(item => !item.adminOnly || isAdmin);

  return (
    <div className="flex flex-col h-full w-64 bg-white border-r border-gray-200">
      {/* Logo */}
      <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
        <Image 
          src="/logo.png" 
          alt="ConsentManager" 
          width={150} 
          height={40}
          className="h-8 w-auto"
        />
      </div>

      {/* User role indicator - Admin specific */}
      {isAdmin && (
        <div className="mt-2 mx-4">
          <div className="flex items-center justify-center bg-amber-50 text-amber-800 py-1 px-3 rounded-md border border-amber-200">
            <FiShield className="h-3 w-3 mr-1" />
            <span className="text-xs font-medium">Admin Console</span>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-8 overflow-y-auto">
        {/* Main Navigation */}
        <div className="space-y-1">
          <p className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Main
          </p>
          {filteredMainNavItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <motion.div
                className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                } ${item.adminOnly ? "border-l-2 border-amber-300" : ""}`}
                whileHover={{ x: pathname === item.href ? 0 : 3 }}
                whileTap={{ scale: 0.98 }}
              >
                <item.icon 
                  className={`mr-3 h-5 w-5 ${
                    pathname === item.href ? "text-blue-600" : "text-gray-500"
                  }`} 
                />
                {item.name}
                {pathname === item.href && (
                  <motion.div
                    className="absolute left-0 w-1 h-6 bg-blue-600 rounded-r-full"
                    layoutId="activeIndicator"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Secondary Navigation */}
        <div className="space-y-1">
          <p className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Settings
          </p>
          {filteredSecondaryNavItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <motion.div
                className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                } ${item.adminOnly ? "border-l-2 border-amber-300" : ""}`}
                whileHover={{ x: pathname === item.href ? 0 : 3 }}
                whileTap={{ scale: 0.98 }}
              >
                <item.icon 
                  className={`mr-3 h-5 w-5 ${
                    pathname === item.href ? "text-blue-600" : "text-gray-500"
                  }`} 
                />
                {item.name}
                {pathname === item.href && (
                  <motion.div
                    className="absolute left-0 w-1 h-6 bg-blue-600 rounded-r-full"
                    layoutId="activeIndicator"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.div>
            </Link>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-600 font-medium mb-2">
            Need more information?
          </p>
          <Link href="/docs">
            <motion.div
              className="flex items-center justify-center py-2 px-4 text-sm font-medium text-blue-700 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View Documentation
            </motion.div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar; 