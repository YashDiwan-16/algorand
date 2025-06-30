import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Vision from './components/Vision';
import Documents from './pages/Documents';
import Hero from './components/Hero';
import WhatIsConsentChain from './components/WhatIsConsentChain';
import HowItWorks from './components/HowItWorks';
import UseCases from './components/UseCases';
import Comparison from './components/Comparison';
import ConsentRecord from './components/ConsentRecord';
import FrontendModules from './components/FrontendModules';
import TechStack from './components/TechStack';
import WhoCanUse from './components/WhoCanUse';
import PremiumShowcase from './components/PremiumShowcase';
import TelegramBotPage from './pages/TelegramBotPage';
import { WalletProvider } from './context/WalletContext';
import ConsentsPage from './pages/ConsentsPage';

const App: React.FC = () => {
  return (
    <WalletProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-premium-900 via-premium-800 to-premium-900 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-full blur-3xl animate-float"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-accent-500/20 to-primary-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-secondary-500/10 to-accent-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
          </div>
          
          {/* Glass morphism overlay */}
          <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
          
          {/* Main content */}
          <div className="relative z-10">
            <Navbar />
            <div className="pt-16">
              <Routes>
                <Route path="/" element={
                  <>
                    <Vision />
                    <PremiumShowcase />
                  </>
                } />
                <Route path="/documents" element={<Documents />} />
                <Route path="/consents" element={<ConsentsPage />} />
                <Route path="/telegram-bot" element={<TelegramBotPage />} />
                <Route path="/about" element={
                  <div className="container mx-auto px-4 py-20">
                    <div className="max-w-4xl mx-auto">
                      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-elegant">
                        <h1 className="text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 mb-6">
                          About Us
                        </h1>
                        <p className="text-xl text-gray-200 leading-relaxed">
                          We are revolutionizing data consent management through blockchain technology, 
                          making it secure, transparent, and user-friendly.
                        </p>
                      </div>
                    </div>
                  </div>
                } />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </WalletProvider>
  );
};

export default App;
