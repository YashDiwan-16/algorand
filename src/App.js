import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Hero from './components/Hero';
import Features from './components/Features';
import Navbar from './components/Navbar';
import RequestConsent from './pages/RequestConsent';
import GiveConsent from './pages/GiveConsent';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Features />
            </>
          } />
          <Route path="/request-consent" element={<RequestConsent />} />
          <Route path="/give-consent" element={<GiveConsent />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 