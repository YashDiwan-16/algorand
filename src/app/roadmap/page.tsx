"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  FiLock, 
  FiShield, 
  FiGlobe,
  FiCalendar,
  FiCheckCircle,
  FiUsers,
  FiDatabase,
  FiLink,
  FiFilePlus,
  FiLayers
} from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";

export default function RoadmapPage() {
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

  // Roadmap phases
  const roadmapItems = [
    {
      phase: "Phase 1: Foundation (Completed)",
      icon: <FiLock size={24} />,
      color: "bg-emerald-50 text-emerald-700 border-emerald-200",
      completed: true,
      items: [
        "Core consent management UI and blockchain integration",
        "Secure wallet connection functionality",
        "Basic consent tracking (grant/revoke/view)",
        "Responsive design for all devices",
        "Smart contract development for consent storage"
      ]
    },
    {
      phase: "Phase 2: Aadhaar Integration (In Progress)",
      icon: <FiShield size={24} />,
      color: "bg-blue-50 text-blue-700 border-blue-200",
      completed: false,
      current: true,
      items: [
        "Aadhaar e-KYC API integration for secure identity verification",
        "Biometric authentication (fingerprint/iris) integration",
        "OTP authentication for Aadhaar verification",
        "Privacy-preserving identity verification using ZK proofs",
        "Demographic data extraction with user consent"
      ]
    },
    {
      phase: "Phase 3: DigiLocker Integration (May 2025)",
      icon: <FiFilePlus size={24} />,
      color: "bg-indigo-50 text-indigo-700 border-indigo-200",
      completed: false,
      items: [
        "DigiLocker API integration for document access",
        "Secure document fetching with user consent",
        "Controlled document sharing with third parties",
        "Verifiable credential issuance for documents",
        "Document verification and validation on blockchain"
      ]
    },
    {
      phase: "Phase 4: Advanced Consent Management (June 2025)",
      icon: <FiLayers size={24} />,
      color: "bg-purple-50 text-purple-700 border-purple-200",
      completed: false,
      items: [
        "Granular permission controls for specific data elements",
        "Time-bound and purpose-limited consent mechanisms",
        "Consent receipts and audit trails on Algorand blockchain",
        "Third-party integration framework for businesses",
        "Multi-level approval workflows for sensitive data"
      ]
    },
    {
      phase: "Phase 5: Self-Sovereign Identity (Post Hackathon)",
      icon: <FiUsers size={24} />,
      color: "bg-amber-50 text-amber-700 border-amber-200",
      completed: false,
      items: [
        "Decentralized Identity (DID) implementation",
        "Verifiable credential issuance and verification",
        "Integration with international SSI standards",
        "Cross-chain identity portability",
        "Peer-to-peer credential exchange"
      ]
    }
  ];

  // Milestones for the Hackathon
  const hackathonMilestones = [
    {
      date: "March 21, 2025",
      event: "Project Description Form submission",
      status: "Completed"
    },
    {
      date: "March-April 2025",
      event: "Developer workshops and support",
      status: "In Progress"
    },
    {
      date: "May 4, 2025",
      event: "GitHub repository submission deadline",
      status: "Upcoming"
    },
    {
      date: "May 15, 2025",
      event: "Semifinalists announced",
      status: "Upcoming"
    },
    {
      date: "May 30, 2025",
      event: "Use case submission deadline",
      status: "Upcoming"
    },
    {
      date: "June 13-15, 2025",
      event: "Final round at AlgoBharat IRL event",
      status: "Upcoming"
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
                Blockchain Consent Manager Roadmap
              </h1>
              <p className="text-indigo-100 text-lg md:text-xl mb-6">
                Building India's first blockchain-powered consent management system integrated with Aadhaar and DigiLocker for the AlgoBharat Hack Series 2025
              </p>
              <div className="px-4 py-2 bg-white bg-opacity-20 rounded-lg inline-flex items-center w-fit">
                <FiCalendar className="text-white mr-2" />
                <span className="text-white">AlgoBharat Hack Series #1 - June 2025</span>
              </div>
            </div>
            <div className="md:w-2/5 bg-indigo-700 p-8 flex items-center justify-center">
              <div className="relative h-56 w-full">
                <Image
                  src="/images/features-blockchain.svg"
                  alt="Blockchain Consent Management"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Project Context */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-md p-8 mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Context</h2>
          <p className="text-gray-700 mb-6">
            India's Aadhaar and DigiLocker systems provide a strong foundation for identity verification and document storage. Our blockchain consent manager leverages these systems in a Web3 context, revolutionizing data sharing by combining decentralized identity management with blockchain transparency.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <FiUsers className="text-blue-600 text-xl" />
              </div>
              <h3 className="font-bold text-lg mb-2">Aadhaar Integration</h3>
              <p className="text-gray-700">
                Secure identity verification using Aadhaar's biometric and demographic data, with strict user consent controls and privacy protection.
              </p>
            </div>
            
            <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-100">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <FiDatabase className="text-indigo-600 text-xl" />
              </div>
              <h3 className="font-bold text-lg mb-2">DigiLocker Access</h3>
              <p className="text-gray-700">
                Secure document retrieval from DigiLocker with verifiable credentials and selective disclosure for controlled sharing.
              </p>
            </div>
            
            <div className="bg-emerald-50 rounded-lg p-6 border border-emerald-100">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <FiLink className="text-emerald-600 text-xl" />
              </div>
              <h3 className="font-bold text-lg mb-2">Algorand Blockchain</h3>
              <p className="text-gray-700">
                Immutable consent records, transparent audit trails, and secure verification using Algorand's fast and efficient blockchain.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Hackathon Timeline */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-md p-8 mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">AlgoBharat Hackathon Timeline</h2>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-indigo-200"></div>
            
            {/* Timeline events */}
            <div className="space-y-8 relative">
              {hackathonMilestones.map((milestone, index) => (
                <div key={index} className="flex">
                  <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mr-4 z-10 ${
                    milestone.status === "Completed" 
                      ? "bg-emerald-100 text-emerald-600" 
                      : milestone.status === "In Progress"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-100 text-gray-500"
                  }`}>
                    {milestone.status === "Completed" ? (
                      <FiCheckCircle />
                    ) : (
                      <FiCalendar />
                    )}
                  </div>
                  <div className={`flex-1 bg-gray-50 p-4 rounded-lg ${
                    milestone.status === "Completed" 
                      ? "border-l-4 border-emerald-400" 
                      : milestone.status === "In Progress"
                        ? "border-l-4 border-blue-400"
                        : "border border-gray-200"
                  }`}>
                    <div className="flex justify-between mb-1">
                      <h4 className="font-bold text-gray-900">{milestone.event}</h4>
                      <span className={`text-sm px-2 py-1 rounded ${
                        milestone.status === "Completed" 
                          ? "bg-emerald-100 text-emerald-700" 
                          : milestone.status === "In Progress"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-700"
                      }`}>
                        {milestone.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{milestone.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Development Roadmap */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-2xl font-bold text-gray-900 mb-6"
        >
          Development Roadmap
        </motion.h2>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {roadmapItems.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`bg-white rounded-xl shadow-md overflow-hidden border ${item.current ? 'border-blue-300 ring-2 ring-blue-200' : 'border-gray-200'}`}
            >
              <div className={`flex items-center p-6 ${item.color}`}>
                <div className="bg-white p-2 rounded-lg mr-4">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold">{item.phase}</h3>
                </div>
                {item.completed ? (
                  <span className="bg-emerald-100 text-emerald-700 py-1 px-3 rounded-full text-sm font-medium">
                    Completed
                  </span>
                ) : item.current ? (
                  <span className="bg-blue-100 text-blue-700 py-1 px-3 rounded-full text-sm font-medium">
                    In Progress
                  </span>
                ) : (
                  <span className="bg-gray-100 text-gray-700 py-1 px-3 rounded-full text-sm font-medium">
                    Upcoming
                  </span>
                )}
              </div>
              <div className="p-6 bg-gray-50">
                <ul className="space-y-3">
                  {item.items.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className={`mt-1 mr-3 ${item.completed ? 'text-emerald-500' : 'text-gray-400'}`}>
                        {item.completed ? (
                          <FiCheckCircle size={16} />
                        ) : (
                          <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
                        )}
                      </span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Integration Diagram */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 bg-white rounded-xl shadow-md p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">System Integration Architecture</h2>
          
          <div className="relative h-80 md:h-96">
            <Image
              src="/images/consent-hero.svg"
              alt="Blockchain Integration Architecture"
              fill
              className="object-contain"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="font-bold text-lg mb-3">Aadhaar Integration Requirements</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <FiCheckCircle className="text-emerald-500 mr-2 flex-shrink-0" />
                  <span>UIDAI Certified Authentication User Agency (AUA) partnership</span>
                </li>
                <li className="flex items-center">
                  <FiCheckCircle className="text-emerald-500 mr-2 flex-shrink-0" />
                  <span>e-KYC API integration with proper encryption</span>
                </li>
                <li className="flex items-center">
                  <FiCheckCircle className="text-emerald-500 mr-2 flex-shrink-0" />
                  <span>OTP and biometric authentication methods</span>
                </li>
                <li className="flex items-center">
                  <FiCheckCircle className="text-emerald-500 mr-2 flex-shrink-0" />
                  <span>UIDAI compliance for data protection</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="font-bold text-lg mb-3">DigiLocker Integration Requirements</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <FiCheckCircle className="text-emerald-500 mr-2 flex-shrink-0" />
                  <span>DigiLocker Partner API access registration</span>
                </li>
                <li className="flex items-center">
                  <FiCheckCircle className="text-emerald-500 mr-2 flex-shrink-0" />
                  <span>OAuth2.0 authentication flow implementation</span>
                </li>
                <li className="flex items-center">
                  <FiCheckCircle className="text-emerald-500 mr-2 flex-shrink-0" />
                  <span>Document pull and push API integration</span>
                </li>
                <li className="flex items-center">
                  <FiCheckCircle className="text-emerald-500 mr-2 flex-shrink-0" />
                  <span>Digital signature verification for documents</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
        
        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-12 bg-indigo-600 rounded-xl p-8 md:p-12 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Join Our Journey to AlgoBharat 2025</h2>
          <p className="text-indigo-100 text-lg mb-8 max-w-3xl mx-auto">
            We're building India's first comprehensive blockchain-based consent management system that integrates with Aadhaar and DigiLocker, empowering citizens with full control over their sensitive data.
          </p>
          <Link href="/dashboard/consents" passHref>
            <motion.div 
              className="inline-block bg-white px-6 py-3 rounded-lg text-indigo-600 font-medium hover:bg-indigo-50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Try The Consent Manager Demo
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
} 