import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { WalletProvider, useWallet } from './context/WalletContext';
import Hero from './components/Hero.js';
import WhatIsConsentChain from './components/WhatIsConsentChain.js';
import HowItWorks from './components/HowItWorks.js';
import UseCases from './components/UseCases.tsx';
import Comparison from './components/Comparison.js';
import ConsentRecord from './components/ConsentRecord.tsx';
import FrontendModules from './components/FrontendModules.js';
import TechStack from './components/TechStack.tsx';
import WhoCanUse from './components/WhoCanUse.tsx';
import Vision from './components/Vision.tsx';
import Footer from './components/Footer.js';
import Dashboard from './pages/Dashboard';
import RequestConsent from './pages/RequestConsent';
import GiveConsent from './pages/GiveConsent';

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children }) => (
  <Link
    to={to}
    className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
  >
    {children}
  </Link>
);

const Navbar: React.FC = () => {
  const { isConnectedToPeraWallet, connectWallet, disconnectWallet, accountAddress } = useWallet();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-800/50 backdrop-blur-lg border-b border-gray-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              ConsentChain
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/request-consent">Request Consent</NavLink>
            <NavLink to="/give-consent">Give Consent</NavLink>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={isConnectedToPeraWallet ? disconnectWallet : connectWallet}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
            >
              {isConnectedToPeraWallet && accountAddress ? (
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  <span>{`${accountAddress.slice(0, 6)}...${accountAddress.slice(-4)}`}</span>
                </div>
              ) : (
                'Connect Wallet'
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Hero />
      <div className="relative z-10">
        <WhatIsConsentChain />
        <HowItWorks />
        <UseCases />
        <Comparison />
        <ConsentRecord />
        <FrontendModules />
        <TechStack />
        <WhoCanUse />
        <Vision />
        <Footer />
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <WalletProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          <Navbar />
          <div className="pt-16">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/request-consent" element={<RequestConsent />} />
              <Route path="/give-consent" element={<GiveConsent />} />
            </Routes>
          </div>
        </div>
      </Router>
    </WalletProvider>
  );
};

export default App;
