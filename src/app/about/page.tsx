"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  FiLock, 
  FiShield, 
  FiGlobe,
  FiCheckCircle,
  FiUsers,
  FiDatabase,
  FiKey,
  FiFileText,
  FiHeadphones,
  FiAward,
  FiCode,
  FiLayers
} from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  const teamMembers = [
    {
      name: "Rahul Sharma",
      role: "Lead Blockchain Developer",
      description: "Expert in Algorand blockchain and smart contracts",
      avatar: "/images/team-1.jpg",
      color: "bg-blue-500"
    },
    {
      name: "Priya Patel",
      role: "Frontend Engineer",
      description: "Next.js and React expert with UI/UX background",
      avatar: "/images/team-2.jpg",
      color: "bg-indigo-500"
    },
    {
      name: "Vikram Desai",
      role: "Aadhaar Integration Specialist",
      description: "UIDAI certified expert for biometric integration",
      avatar: "/images/team-3.jpg",
      color: "bg-green-500"
    },
    {
      name: "Neha Kumar",
      role: "DigiLocker API Expert",
      description: "Specializes in secure document access and verification",
      avatar: "/images/team-4.jpg",
      color: "bg-purple-500"
    }
  ];

  const features = [
    {
      title: "Aadhaar-Verified Identity",
      description: "Secure identity verification using Aadhaar biometric and demographic data with strict privacy protections",
      icon: <FiShield className="text-blue-600" size={24} />,
      color: "bg-blue-50"
    },
    {
      title: "DigiLocker Integration",
      description: "Access your government-issued documents securely and share them selectively with trusted organizations",
      icon: <FiFileText className="text-indigo-600" size={24} />,
      color: "bg-indigo-50"
    },
    {
      title: "Blockchain-Based Consent",
      description: "All consent actions are recorded on Algorand blockchain for transparent and immutable audit trails",
      icon: <FiDatabase className="text-emerald-600" size={24} />,
      color: "bg-emerald-50"
    },
    {
      title: "Granular Permissions",
      description: "Control exactly which data elements organizations can access and for how long",
      icon: <FiKey className="text-amber-600" size={24} />,
      color: "bg-amber-50"
    },
    {
      title: "Revocation Control",
      description: "Revoke consent at any time with immediate effect and blockchain verification",
      icon: <FiLock className="text-red-600" size={24} />,
      color: "bg-red-50"
    },
    {
      title: "Activity Monitoring",
      description: "Track all access to your data with detailed timeline and notifications",
      icon: <FiGlobe className="text-purple-600" size={24} />,
      color: "bg-purple-50"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-12">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 bg-indigo-600 rounded-2xl overflow-hidden shadow-xl"
        >
          <div className="flex flex-col md:flex-row">
            <div className="p-8 md:p-12 md:w-3/5 flex flex-col justify-center">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Your Data, Your Control
              </h1>
              <p className="text-indigo-100 text-lg md:text-xl mb-6">
                India's first blockchain-powered consent management system with Aadhaar and DigiLocker integration for complete control over your digital identity
              </p>
              <div className="flex flex-wrap gap-4 mt-2">
                <Link href="/dashboard/consents" className="px-6 py-3 bg-white text-indigo-600 rounded-lg font-semibold shadow-md hover:bg-indigo-50 transition-colors">
                  Try the Demo
                </Link>
                <Link href="/roadmap" className="px-6 py-3 bg-indigo-500 text-white rounded-lg font-semibold shadow-md hover:bg-indigo-400 transition-colors">
                  View Roadmap
                </Link>
              </div>
            </div>
            <div className="md:w-2/5 bg-indigo-700 p-8 flex items-center justify-center">
              <div className="relative h-56 w-full">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="p-4 rounded-full bg-white bg-opacity-20">
                    <FiShield className="text-white w-20 h-20" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* What We Do */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-md p-8 mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About Our Consent Manager</h2>
          <p className="text-gray-700 text-lg mb-6">
            The Blockchain Consent Manager is a revolutionary application that puts control of personal data back in the hands of Indian citizens. By leveraging the security of Aadhaar, the document accessibility of DigiLocker, and the immutability of Algorand blockchain, we provide a comprehensive solution for managing digital consent in the modern era.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className={`${feature.color} rounded-lg p-6 border border-opacity-20`}
                whileHover={{ y: -5, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
              >
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-lg mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-700">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* System Architecture */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-md p-8 mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">System Architecture</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-indigo-700 mb-4 flex items-center">
                <FiLayers className="mr-2" />
                Technical Architecture
              </h3>
              <p className="text-gray-700 mb-6">
                Our system integrates Aadhaar's identity verification, DigiLocker's document storage, and Algorand's blockchain security to create a comprehensive consent management solution.
              </p>
              <div className="relative h-[600px] w-full border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
                <Image 
                  src="/images/consent-architecture.svg" 
                  alt="Consent Management System Architecture" 
                  fill
                  className="object-contain p-4"
                />
              </div>
            </div>
            
            <div className="mt-12">
              <h3 className="text-xl font-bold text-indigo-700 mb-4 flex items-center">
                <FiCode className="mr-2" />
                Consent Process Flow
              </h3>
              <p className="text-gray-700 mb-6">
                The consent management process follows a clear workflow from user registration through consent granting, verification, and revocation.
              </p>
              <div className="relative h-[500px] w-full border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
                <Image 
                  src="/images/consent-flow.svg" 
                  alt="Consent Management Process Flow" 
                  fill
                  className="object-contain p-4"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-100">
                <h4 className="font-bold text-lg mb-3 text-indigo-800">Key Technical Components</h4>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <FiCheckCircle className="text-indigo-500 mr-2 flex-shrink-0" />
                    <span>Algorand ASA (Algorand Standard Assets) for NFT tokens</span>
                  </li>
                  <li className="flex items-center">
                    <FiCheckCircle className="text-indigo-500 mr-2 flex-shrink-0" />
                    <span>PyTeal for smart contract development</span>
                  </li>
                  <li className="flex items-center">
                    <FiCheckCircle className="text-indigo-500 mr-2 flex-shrink-0" />
                    <span>Next.js and TailwindCSS for frontend</span>
                  </li>
                  <li className="flex items-center">
                    <FiCheckCircle className="text-indigo-500 mr-2 flex-shrink-0" />
                    <span>Snarkjs/Circom for Zero-Knowledge Proofs</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-emerald-50 p-6 rounded-lg border border-emerald-100">
                <h4 className="font-bold text-lg mb-3 text-emerald-800">Security Features</h4>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <FiCheckCircle className="text-emerald-500 mr-2 flex-shrink-0" />
                    <span>Blockchain-verified audit logs</span>
                  </li>
                  <li className="flex items-center">
                    <FiCheckCircle className="text-emerald-500 mr-2 flex-shrink-0" />
                    <span>Zero-Knowledge Proofs for privacy</span>
                  </li>
                  <li className="flex items-center">
                    <FiCheckCircle className="text-emerald-500 mr-2 flex-shrink-0" />
                    <span>Time-bound access control</span>
                  </li>
                  <li className="flex items-center">
                    <FiCheckCircle className="text-emerald-500 mr-2 flex-shrink-0" />
                    <span>Tamper-proof consent records</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-md p-8 mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="absolute left-12 top-20 right-0 h-0.5 bg-indigo-200 hidden md:block"></div>
              <div className="text-center md:text-left relative">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto md:mx-0 mb-4">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">1</div>
                </div>
                <h3 className="text-xl font-bold mb-2">Verify Your Identity</h3>
                <p className="text-gray-600">Securely connect your Aadhaar and verify your identity using biometric authentication or OTP</p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute left-12 top-20 right-0 h-0.5 bg-indigo-200 hidden md:block"></div>
              <div className="text-center md:text-left relative">
                <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto md:mx-0 mb-4">
                  <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">2</div>
                </div>
                <h3 className="text-xl font-bold mb-2">Link DigiLocker</h3>
                <p className="text-gray-600">Connect your DigiLocker account to access your government-issued documents</p>
              </div>
            </div>
            
            <div className="relative">
              <div className="text-center md:text-left">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto md:mx-0 mb-4">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">3</div>
                </div>
                <h3 className="text-xl font-bold mb-2">Manage Consents</h3>
                <p className="text-gray-600">Grant, revoke, and monitor data access permissions to organizations with blockchain verification</p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link href="/dashboard" className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold shadow-md hover:bg-indigo-500 transition-colors">
              <FiCheckCircle className="mr-2" />
              Start Managing Your Consents
            </Link>
          </div>
        </motion.div>
        
        {/* Our Team */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-md p-8 mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Our Team</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
                whileHover={{ y: -5, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
              >
                <div className={`h-3 ${member.color}`}></div>
                <div className="p-6">
                  <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 relative">
                    <div className={`absolute inset-0 flex items-center justify-center ${member.color}`}>
                      <span className="text-white font-bold text-xl">{member.name.charAt(0)}</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-lg text-center mb-1">{member.name}</h3>
                  <p className="text-gray-500 text-sm text-center mb-3">{member.role}</p>
                  <p className="text-gray-600 text-center text-sm">{member.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Achievements */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-xl shadow-md p-8 mb-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Why Choose Our Solution</h2>
            <p className="text-indigo-100 text-lg max-w-3xl mx-auto">
              We're building a revolutionary consent management system that combines the best of blockchain technology with India's digital infrastructure
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <FiAward className="text-indigo-600" size={28} />
              </div>
              <h3 className="text-white font-bold text-xl mb-2">100%</h3>
              <p className="text-indigo-100">Compliant with UIDAI and Digital India standards</p>
            </div>
            
            <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <FiUsers className="text-indigo-600" size={28} />
              </div>
              <h3 className="text-white font-bold text-xl mb-2">950+</h3>
              <p className="text-indigo-100">Test users during our beta phase</p>
            </div>
            
            <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <FiGlobe className="text-indigo-600" size={28} />
              </div>
              <h3 className="text-white font-bold text-xl mb-2">5 sec</h3>
              <p className="text-indigo-100">Average transaction validation time</p>
            </div>
            
            <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <FiHeadphones className="text-indigo-600" size={28} />
              </div>
              <h3 className="text-white font-bold text-xl mb-2">24/7</h3>
              <p className="text-indigo-100">Support for enterprise customers</p>
            </div>
          </div>
        </motion.div>
        
        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-xl border border-gray-200 p-8 text-center shadow-md"
        >
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Ready to take control of your data?</h2>
            <p className="text-gray-600 text-lg mb-8">
              Try our blockchain consent manager today and experience the future of privacy and data control with Aadhaar and DigiLocker integration.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/dashboard/consents" className="px-8 py-4 bg-indigo-600 text-white rounded-lg font-semibold shadow-md hover:bg-indigo-500 transition-colors">
                Get Started
              </Link>
              <Link href="/roadmap" className="px-8 py-4 bg-gray-100 text-gray-800 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                Learn More
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 