import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Hero from './components/Hero';
import Features from './components/Features';
import Dashboard from './pages/Dashboard';
import RequestConsent from './pages/RequestConsent';
import GiveConsent from './pages/GiveConsent';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <nav className="bg-gray-800/50 backdrop-blur-lg border-b border-gray-700/50">
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
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                >
                  Connect Wallet
                </motion.button>
              </div>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Features />
            </>
          } />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/request-consent" element={<RequestConsent />} />
          <Route path="/give-consent" element={<GiveConsent />} />
        </Routes>
      </div>
    </Router>
  );
};

const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
  >
    {children}
  </Link>
);

export default App; 