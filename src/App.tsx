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

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <Navbar />
        <div className="pt-16"> {/* Add padding-top to account for fixed navbar */}
          <Routes>
            <Route path="/" element={<Vision />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/about" element={<div className="container mx-auto px-4 py-20">
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                About Us
              </h1>
              {/* Add About page content here */}
            </div>} />
          </Routes>
        </div>
    </div>
    </Router>
  );
};

export default App;
