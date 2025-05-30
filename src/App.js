import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhatIsConsentChain from './components/WhatIsConsentChain';
import HowItWorks from './components/HowItWorks';
import Comparison from './components/Comparison';
import FrontendModules from './components/FrontendModules';
import { WalletProvider } from './context/WalletContext';
import Features from './components/Features';

function App() {
  return (
    <WalletProvider>
      <Router>
        <div className="min-h-screen bg-gray-900">
          <Navbar />
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <Features />
                <WhatIsConsentChain />
                <HowItWorks />
                <Comparison />
                <FrontendModules />
              </>
            } />
          </Routes>
        </div>
      </Router>
    </WalletProvider>
  );
}

export default App; 