'use client';

import React, { useState, useEffect } from 'react';
import ConnectWallet from '@/components/ConnectWallet';
import { motion } from 'framer-motion';
import { ConsentManager } from '@/components/ConsentManager';
import { useWallet } from '@/providers/WalletContext';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FiShield, 
  FiLock, 
  FiRefreshCw, 
  FiCheckCircle, 
  FiDatabase, 
  FiAlertTriangle,
  FiArrowRight,
  FiChevronDown,
  FiCalendar,
  FiFilePlus,
  FiLayers,
  FiUsers
} from 'react-icons/fi';

export default function Home() {
  const { walletInfo } = useWallet();
  const [showConsentManager, setShowConsentManager] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Framer motion variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const svgVariant = {
    hidden: { rotate: -5, opacity: 0 },
    visible: { 
      rotate: 0, 
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };
  
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${scrolled ? 'shadow-md py-3' : 'py-5'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center">
            <motion.div
              initial={{ rotate: -10, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mr-3"
            >
              <FiShield className="text-indigo-600 text-3xl" />
            </motion.div>
            <motion.h1 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent"
            >
              Consent Manager
            </motion.h1>
          </div>
          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex space-x-8 text-gray-700">
              <a href="#how-it-works" className="hover:text-indigo-600 transition-colors">How it Works</a>
              <a href="#features" className="hover:text-indigo-600 transition-colors">Features</a>
              <a href="#about" className="hover:text-indigo-600 transition-colors">About</a>
              <a href="#roadmap" className="hover:text-indigo-600 transition-colors">Roadmap</a>
            </nav>
            <ConnectWallet />
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="pt-40 pb-20 md:pt-48 md:pb-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-indigo-50 opacity-50 z-0"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <motion.div 
              className="lg:w-1/2 text-center lg:text-left"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Control Your <span className="text-indigo-600">Personal Data</span> on the Blockchain
              </h2>
              <p className="text-xl text-gray-600 mb-10 max-w-xl mx-auto lg:mx-0">
                A next-generation consent management system built on Algorand that gives you complete authority over your personal information.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                {walletInfo ? (
                  <motion.button
                    className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-3 px-8 rounded-lg hover:shadow-lg transition-all flex items-center justify-center group"
                    onClick={() => setShowConsentManager(!showConsentManager)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {showConsentManager ? 'Hide Consent Manager' : 'Manage Consents'}
                    <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                ) : (
                  <motion.div 
                    className="bg-white shadow-md p-5 rounded-lg text-gray-700 max-w-sm border border-indigo-100"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <FiAlertTriangle className="text-yellow-500 text-2xl mb-2" />
                    <p className="font-medium">Connect your wallet to start managing your data consents securely</p>
                  </motion.div>
                )}
                
                <Link href="/dashboard/consents" passHref>
                  <motion.div
                    className="border-2 border-indigo-600 text-indigo-600 py-3 px-8 rounded-lg hover:bg-indigo-50 transition-colors flex items-center justify-center cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Go to Dashboard
                  </motion.div>
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              className="lg:w-1/2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={svgVariant}
            >
              <div className="relative h-[400px] w-full">
        <Image
                  src="/images/consent-hero.svg" 
                  alt="Consent Management Illustration" 
                  fill
                  className="object-contain"
          priority
        />
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center hidden md:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <p className="text-gray-500 text-sm mb-1">Scroll to learn more</p>
            <FiChevronDown className="text-indigo-500 text-2xl mx-auto animate-bounce" />
          </motion.div>
        </div>
      </section>
      
      {/* Consent Manager Section */}
      {showConsentManager && walletInfo && (
        <section className="container mx-auto px-6 py-8">
          <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-blue-500 py-4 px-6">
              <h2 className="text-2xl font-bold text-white">Your Consent Dashboard</h2>
            </div>
            <div className="p-6">
              <ConsentManager />
            </div>
          </div>
        </section>
      )}
      
      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our blockchain-powered consent management system makes controlling your personal data simple, secure, and transparent.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 relative"
              variants={fadeIn}
            >
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6 text-indigo-600">
                <FiLock size={28} />
              </div>
              <div className="absolute -top-3 -left-3 w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">1</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Connect & Register</h3>
              <p className="text-gray-600">
                Connect your Algorand wallet and register as a user on our platform to start managing your data consents.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 relative"
              variants={fadeIn}
            >
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6 text-indigo-600">
                <FiCheckCircle size={28} />
              </div>
              <div className="absolute -top-3 -left-3 w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">2</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Grant Consent</h3>
              <p className="text-gray-600">
                Approve or deny consent requests from websites and services. Specify exactly what data they can access.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 relative"
              variants={fadeIn}
            >
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6 text-indigo-600">
                <FiRefreshCw size={28} />
              </div>
              <div className="absolute -top-3 -left-3 w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">3</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Manage Anytime</h3>
              <p className="text-gray-600">
                Review, revoke, or renew consents at any time through your dashboard with complete transparency.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Key Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powered by Algorand blockchain technology for maximum security and transparency
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div 
              className="p-6 rounded-xl bg-white shadow-md hover:shadow-xl transition-shadow border border-gray-100"
              variants={fadeIn}
              whileHover={{ y: -5 }}
            >
              <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center mb-4 text-indigo-600">
                <FiDatabase size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Immutable Records</h3>
              <p className="text-gray-600">
                All consent actions are permanently recorded on the Algorand blockchain, ensuring transparency and auditability.
              </p>
            </motion.div>
            
            <motion.div 
              className="p-6 rounded-xl bg-white shadow-md hover:shadow-xl transition-shadow border border-gray-100"
              variants={fadeIn}
              whileHover={{ y: -5 }}
            >
              <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center mb-4 text-indigo-600">
                <FiLock size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Full Control</h3>
              <p className="text-gray-600">
                Grant and revoke consent at any time, with detailed policies about how your data can be used by each organization.
              </p>
            </motion.div>
            
            <motion.div 
              className="p-6 rounded-xl bg-white shadow-md hover:shadow-xl transition-shadow border border-gray-100"
              variants={fadeIn}
              whileHover={{ y: -5 }}
            >
              <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center mb-4 text-indigo-600">
                <FiShield size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Blockchain Security</h3>
              <p className="text-gray-600">
                Leveraging Algorand's secure and energy-efficient blockchain for all consent operations with cryptographic verification.
              </p>
            </motion.div>
            
            <motion.div 
              className="p-6 rounded-xl bg-white shadow-md hover:shadow-xl transition-shadow border border-gray-100"
              variants={fadeIn}
              whileHover={{ y: -5 }}
            >
              <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center mb-4 text-indigo-600">
                <FiCheckCircle size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Granular Permissions</h3>
              <p className="text-gray-600">
                Specify exactly what data each service can access with fine-grained permission controls for each organization.
              </p>
            </motion.div>
            
            <motion.div 
              className="p-6 rounded-xl bg-white shadow-md hover:shadow-xl transition-shadow border border-gray-100"
              variants={fadeIn}
              whileHover={{ y: -5 }}
            >
              <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center mb-4 text-indigo-600">
                <FiRefreshCw size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Real-Time Updates</h3>
              <p className="text-gray-600">
                Changes to consent status are reflected instantly across all connected services with blockchain verification.
              </p>
            </motion.div>
            
            <motion.div 
              className="p-6 rounded-xl bg-white shadow-md hover:shadow-xl transition-shadow border border-gray-100"
              variants={fadeIn}
              whileHover={{ y: -5 }}
            >
              <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center mb-4 text-indigo-600">
                <FiAlertTriangle size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Expiration Control</h3>
              <p className="text-gray-600">
                Set time limits on data access with automatic consent expiration and renewal options for improved data hygiene.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="py-20 bg-indigo-900 text-white">
        <div className="container mx-auto px-6">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About Our Consent Manager</h2>
            <p className="text-xl text-indigo-100 mb-10">
              We're building the future of personal data management on the blockchain, giving users true ownership and control over their information.
            </p>
            
            <div className="bg-indigo-800 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-indigo-100 mb-6">
                To empower individuals with transparent control over their personal data in an increasingly complex digital landscape, using the power of blockchain technology to ensure trust, security, and immutability.
              </p>
              
              <div className="flex flex-col md:flex-row justify-center gap-8 mt-10">
                <div className="flex flex-col items-center">
                  <div className="text-4xl font-bold text-indigo-300 mb-2">100%</div>
                  <p className="text-indigo-200">User Control</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-4xl font-bold text-indigo-300 mb-2">Secure</div>
                  <p className="text-indigo-200">Blockchain Technology</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-4xl font-bold text-indigo-300 mb-2">0%</div>
                  <p className="text-indigo-200">Data Breaches</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Roadmap Section */}
      <section id="roadmap" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Roadmap</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're building India's first blockchain-powered consent management system with Aadhaar and DigiLocker integration
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow border border-gray-100"
              variants={fadeIn}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mr-4 text-emerald-600">
                  <FiCheckCircle size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Phase 1: Foundation</h3>
                  <span className="text-emerald-600 text-sm font-medium">Completed</span>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                Core consent management UI with blockchain integration, secure wallet connection, and basic consent tracking.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow border border-gray-100"
              variants={fadeIn}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 text-blue-600">
                  <FiShield size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Phase 2: Aadhaar Integration</h3>
                  <span className="text-blue-600 text-sm font-medium">In Progress</span>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                Secure identity verification using Aadhaar's e-KYC, biometric authentication, and privacy protection.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow border border-gray-100"
              variants={fadeIn}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4 text-indigo-600">
                  <FiFilePlus size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Phase 3: DigiLocker Integration</h3>
                  <span className="text-gray-600 text-sm font-medium">May 2025</span>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                DigiLocker API integration for document access, secure fetching, and controlled sharing with third parties.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow border border-gray-100"
              variants={fadeIn}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4 text-purple-600">
                  <FiLayers size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Phase 4: Advanced Features</h3>
                  <span className="text-gray-600 text-sm font-medium">June 2025</span>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                Granular permission controls, time-bound consent, audit trails, and Self-Sovereign Identity implementation.
              </p>
            </motion.div>
          </motion.div>
          
          <div className="text-center mt-12">
            <Link href="/roadmap">
              <motion.div
                className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-800 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Full Roadmap Details
                <FiArrowRight className="ml-2" />
              </motion.div>
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Take Control of Your Data?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of users who have already reclaimed their data sovereignty with our blockchain solution.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/dashboard/consents" passHref>
                <motion.a
                  className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-3 px-8 rounded-lg hover:shadow-lg transition-all flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                  <FiArrowRight className="ml-2" />
                </motion.a>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center">
                <FiShield className="text-indigo-400 text-2xl mr-2" />
                <h3 className="text-xl font-bold text-white">Consent Manager</h3>
              </div>
              <p className="text-sm mt-2 text-gray-400">
                Powered by Algorand Blockchain
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-4 text-center md:text-left">
              <div>
                <h4 className="font-bold text-white mb-2">Platform</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-indigo-300 transition-colors">Dashboard</a></li>
                  <li><a href="#" className="hover:text-indigo-300 transition-colors">Docs</a></li>
                  <li><a href="#" className="hover:text-indigo-300 transition-colors">API</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-white mb-2">Resources</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-indigo-300 transition-colors">GitHub</a></li>
                  <li><a href="#" className="hover:text-indigo-300 transition-colors">Documentation</a></li>
                  <li><a href="#" className="hover:text-indigo-300 transition-colors">AlgoKit</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-white mb-2">Contact</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-indigo-300 transition-colors">Support</a></li>
                  <li><a href="#" className="hover:text-indigo-300 transition-colors">Contact</a></li>
                  <li><a href="#" className="hover:text-indigo-300 transition-colors">Privacy</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-6 mt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Consent Manager. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
