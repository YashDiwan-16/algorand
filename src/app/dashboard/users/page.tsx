"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  FiUsers, 
  FiUserPlus, 
  FiEdit, 
  FiTrash2, 
  FiSearch, 
  FiFilter,
  FiCheckCircle,
  FiXCircle,
  FiEye,
  FiMail,
  FiPhone
} from "react-icons/fi";
import Image from "next/image";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15
    }
  }
};

// Demo users data
const demoUsers = [
  {
    id: "user1",
    name: "Rajesh Kumar",
    email: "rajesh.kumar@example.com",
    phone: "+91 98765 43210",
    aadhaarVerified: true,
    digiLockerLinked: true,
    totalConsents: 8,
    lastActive: "10 minutes ago",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: "user2",
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    phone: "+91 87654 32109",
    aadhaarVerified: true,
    digiLockerLinked: false,
    totalConsents: 3,
    lastActive: "2 hours ago",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: "user3",
    name: "Amit Patel",
    email: "amit.patel@example.com",
    phone: "+91 76543 21098",
    aadhaarVerified: false,
    digiLockerLinked: false,
    totalConsents: 0,
    lastActive: "3 days ago",
    status: "Pending",
    avatar: "https://randomuser.me/api/portraits/men/55.jpg"
  },
  {
    id: "user4",
    name: "Sunita Gupta",
    email: "sunita.gupta@example.com",
    phone: "+91 65432 10987",
    aadhaarVerified: true,
    digiLockerLinked: true,
    totalConsents: 12,
    lastActive: "1 day ago",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/women/67.jpg"
  },
  {
    id: "user5",
    name: "Vikram Singh",
    email: "vikram.singh@example.com",
    phone: "+91 54321 09876",
    aadhaarVerified: true,
    digiLockerLinked: true,
    totalConsents: 6,
    lastActive: "5 hours ago",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/men/78.jpg"
  }
];

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState(demoUsers);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  // Filter users based on search term and status
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === "All" || user.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600">Manage users and their consent preferences</p>
        </div>
        <button
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <FiUserPlus className="mr-2" />
          Add New User
        </button>
      </motion.div>

      {/* Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: "Total Users", value: users.length, color: "bg-blue-500" },
          { title: "Aadhaar Verified", value: users.filter(u => u.aadhaarVerified).length, color: "bg-green-500" },
          { title: "DigiLocker Linked", value: users.filter(u => u.digiLockerLinked).length, color: "bg-purple-500" },
          { title: "Active Consents", value: users.reduce((sum, user) => sum + user.totalConsents, 0), color: "bg-orange-500" }
        ].map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <div className={`w-12 h-12 rounded-full ${stat.color} text-white flex items-center justify-center mb-3`}>
              <FiUsers size={20} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{stat.title}</h3>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </motion.div>

      {/* Search and filters */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search users by name or email"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <FiFilter className="text-gray-500" />
          <select
            className="block pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Suspended">Suspended</option>
          </select>
        </div>
      </motion.div>

      {/* Users table */}
      <motion.div variants={itemVariants} className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Verification</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Consents</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className={`hover:bg-gray-50 ${selectedUser === user.id ? 'bg-blue-50' : ''}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 relative">
                        <Image 
                          src={user.avatar}
                          alt={user.name}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <div className="flex items-center text-sm text-gray-500">
                        <FiMail className="mr-1" size={14} />
                        {user.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <FiPhone className="mr-1" size={14} />
                        {user.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center">
                        {user.aadhaarVerified ? (
                          <FiCheckCircle className="text-green-500 mr-1" size={14} />
                        ) : (
                          <FiXCircle className="text-red-500 mr-1" size={14} />
                        )}
                        <span className="text-sm text-gray-500">Aadhaar</span>
                      </div>
                      <div className="flex items-center">
                        {user.digiLockerLinked ? (
                          <FiCheckCircle className="text-green-500 mr-1" size={14} />
                        ) : (
                          <FiXCircle className="text-red-500 mr-1" size={14} />
                        )}
                        <span className="text-sm text-gray-500">DigiLocker</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.totalConsents}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.lastActive}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 
                        user.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <FiEye size={18} />
                      </button>
                      <button className="text-indigo-600 hover:text-indigo-900">
                        <FiEdit size={18} />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
} 