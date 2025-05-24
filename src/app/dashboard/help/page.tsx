'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiHelpCircle,
  FiBook,
  FiMessageCircle,
  FiPhone,
  FiMail,
  FiPlus,
  FiMinus,
  FiChevronRight,
  FiExternalLink,
  FiYoutube,
  FiFileText,
  FiSend,
  FiSearch
} from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';
import { useWallet } from '@/providers/WalletContext';

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

// FAQ items
const faqItems = [
  {
    question: "What is a blockchain consent manager?",
    answer: "A blockchain consent manager is a decentralized application that allows you to securely control who has access to your personal data. It uses blockchain technology to create immutable records of your consent decisions, giving you transparency and control over your data."
  },
  {
    question: "How does the Aadhaar integration work?",
    answer: "Our platform integrates with Aadhaar's e-KYC API to verify your identity securely. Your Aadhaar data remains private and is never stored on the blockchain. Instead, we create a verifiable credential that confirms your identity without exposing your actual Aadhaar details."
  },
  {
    question: "What happens when I grant consent to a website?",
    answer: "When you grant consent, a smart contract is created on the Algorand blockchain that records the details of your consent (which data points, for what purpose, expiration date, etc.). The website can then verify this consent through our API, but can only access the specific data you've authorized."
  },
  {
    question: "Can I revoke consent after granting it?",
    answer: "Yes, you can revoke consent at any time. This will update the smart contract on the blockchain to indicate that consent has been revoked. The website will no longer be able to access your data through our platform once consent is revoked."
  },
  {
    question: "Is my personal data stored on the blockchain?",
    answer: "No, your personal data is never stored on the blockchain. Only consent records (who you've given permission to, for what purpose, and when) are stored on the blockchain. Your actual personal data remains encrypted and securely stored off-chain."
  },
  {
    question: "How secure is the blockchain technology used?",
    answer: "We use the Algorand blockchain, which provides military-grade security through its Pure Proof-of-Stake consensus mechanism. It's fast, scalable, and has never been compromised. All consent records are cryptographically secured and immutable."
  },
  {
    question: "Can I see who has accessed my data and when?",
    answer: "Yes, you can view a complete audit trail of all data access events in your dashboard. This transparency is one of the key benefits of our blockchain-based approach to consent management."
  }
];

// Categories
const categories = [
  { name: "Getting Started", icon: <FiBook /> },
  { name: "Account Settings", icon: <FiFileText /> },
  { name: "Consent Management", icon: <FiMessageCircle /> },
  { name: "Security & Privacy", icon: <FiHelpCircle /> },
  { name: "Blockchain & Wallet", icon: <FiExternalLink /> }
];

// Help section component
const HelpSection = ({ title, children }) => {
  return (
    <motion.div variants={itemVariants} className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>
      {children}
    </motion.div>
  );
};

// FAQ Accordion component
const FAQAccordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleItem(index)}
            className="flex items-center justify-between w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
          >
            <span className="font-medium text-gray-900">{item.question}</span>
            <span className="text-indigo-600 ml-2">
              {openIndex === index ? <FiMinus /> : <FiPlus />}
            </span>
          </button>
          {openIndex === index && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="px-6 py-4 bg-gray-50"
            >
              <p className="text-gray-700">{item.answer}</p>
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
};

export default function HelpPage() {
  const { walletInfo } = useWallet();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter FAQs based on search query
  const filteredFAQs = searchQuery 
    ? faqItems.filter(item => 
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqItems;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto space-y-6"
      >
        <motion.div variants={itemVariants}>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Help & Support</h1>
          <p className="text-gray-600">
            Get answers to your questions about the blockchain consent manager
          </p>
        </motion.div>
        
        {/* Search Bar */}
        <motion.div 
          variants={itemVariants}
          className="relative"
        >
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white shadow-sm"
            placeholder="Search for help topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </motion.div>
        
        {/* Categories */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-5 gap-4"
        >
          {categories.map((category, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg border border-gray-200 p-4 text-center hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3">
                {category.icon}
              </div>
              <h3 className="font-medium text-gray-900">{category.name}</h3>
            </div>
          ))}
        </motion.div>
        
        {/* FAQs */}
        <HelpSection title="Frequently Asked Questions">
          {searchQuery && filteredFAQs.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiHelpCircle className="text-gray-400 text-2xl" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-500">Try adjusting your search terms or browse the categories above</p>
            </div>
          ) : (
            <FAQAccordion items={filteredFAQs} />
          )}
        </HelpSection>
        
        {/* Video Tutorials */}
        <HelpSection title="Video Tutorials">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-video bg-gray-800 relative flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>
                <div className="relative w-16 h-16 bg-indigo-600 bg-opacity-90 rounded-full flex items-center justify-center">
                  <FiYoutube className="text-white text-3xl" />
                </div>
                <div className="absolute bottom-3 left-3 text-white font-medium">6:32</div>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900 mb-1">Getting Started with Consent Manager</h3>
                <p className="text-sm text-gray-500">Learn the basics of managing your data consents using our blockchain platform</p>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-video bg-gray-800 relative flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>
                <div className="relative w-16 h-16 bg-indigo-600 bg-opacity-90 rounded-full flex items-center justify-center">
                  <FiYoutube className="text-white text-3xl" />
                </div>
                <div className="absolute bottom-3 left-3 text-white font-medium">8:45</div>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900 mb-1">How to Connect Your Aadhaar Identity</h3>
                <p className="text-sm text-gray-500">A step-by-step guide to securely linking your Aadhaar identity to the blockchain</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <Link href="#" className="inline-flex items-center text-indigo-600 hover:text-indigo-800">
              View all tutorials <FiChevronRight className="ml-1" />
            </Link>
          </div>
        </HelpSection>
        
        {/* Contact Support */}
        <HelpSection title="Contact Support">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-6 text-center hover:border-indigo-300 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiMessageCircle />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Live Chat</h3>
              <p className="text-sm text-gray-500 mb-4">Chat with our support team in real-time</p>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 w-full flex items-center justify-center">
                <FiMessageCircle className="mr-2" /> Start Chat
              </button>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6 text-center hover:border-indigo-300 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiMail />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Email Support</h3>
              <p className="text-sm text-gray-500 mb-4">Get help via email, typically within 24 hours</p>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 w-full flex items-center justify-center">
                <FiMail className="mr-2" /> Send Email
              </button>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6 text-center hover:border-indigo-300 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiPhone />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Phone Support</h3>
              <p className="text-sm text-gray-500 mb-4">Call us directly for urgent assistance</p>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 w-full flex items-center justify-center">
                <FiPhone className="mr-2" /> Call Support
              </button>
            </div>
          </div>
          
          <div className="mt-6 bg-gray-50 p-4 rounded-lg">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <FiHelpCircle className="text-indigo-600" />
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-gray-900">Support Hours</h4>
                <p className="text-sm text-gray-500 mt-1">Our support team is available Monday to Friday, 9:00 AM to 6:00 PM IST</p>
              </div>
            </div>
          </div>
        </HelpSection>
        
        {/* Documentation Links */}
        <HelpSection title="Documentation">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="#" className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors">
              <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mr-4">
                <FiBook />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">User Guide</h3>
                <p className="text-sm text-gray-500">Complete guide to using the Consent Manager</p>
              </div>
              <FiChevronRight className="ml-auto text-indigo-600" />
            </Link>
            
            <Link href="#" className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors">
              <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mr-4">
                <FiFileText />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">API Documentation</h3>
                <p className="text-sm text-gray-500">Technical documentation for developers</p>
              </div>
              <FiChevronRight className="ml-auto text-indigo-600" />
            </Link>
            
            <Link href="#" className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors">
              <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mr-4">
                <FiExternalLink />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Algorand Integration</h3>
                <p className="text-sm text-gray-500">Learn how our platform uses Algorand blockchain</p>
              </div>
              <FiChevronRight className="ml-auto text-indigo-600" />
            </Link>
            
            <Link href="#" className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors">
              <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mr-4">
                <FiYoutube />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Video Tutorials</h3>
                <p className="text-sm text-gray-500">Full library of how-to videos</p>
              </div>
              <FiChevronRight className="ml-auto text-indigo-600" />
            </Link>
          </div>
        </HelpSection>
        
        {/* Community Help */}
        <HelpSection title="Community Forum">
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiMessageCircle className="text-indigo-600 text-2xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Join our Community Forum</h3>
            <p className="text-gray-600 mb-6 max-w-xl mx-auto">
              Connect with other users, share your experiences, ask questions, and get help from the community.
            </p>
            <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 inline-flex items-center">
              <FiExternalLink className="mr-2" /> Visit Community Forum
            </button>
          </div>
        </HelpSection>
      </motion.div>
    </div>
  );
} 