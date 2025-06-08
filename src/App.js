import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WalletProvider } from './context/WalletContext';
import Vision from './components/Vision';
import Documents from './components/Documents';
import Hero from './components/Hero';
import WhatIsConsentChain from './components/WhatIsConsentChain';
import HowItWorks from './components/HowItWorks';
import UseCases from './components/UseCases';
import Comparison from './components/Comparison';
import ConsentRecord from './components/ConsentRecord';
import FrontendModules from './components/FrontendModules';
import TechStack from './components/TechStack';
import WhoCanUse from './components/WhoCanUse';
import RequestConsent from './pages/RequestConsent';
import GrantConsent from './pages/GrantConsent';
import ScanQR from './pages/ScanQR';
import Dashboard from './pages/Dashboard';
import ConsentedDocuments from './pages/ConsentedDocuments';
import Layout from './components/Layout';
import ViewConsent from './pages/ViewConsent';

function App() {
  return (
    <WalletProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <WhatIsConsentChain />
                <HowItWorks />
                <UseCases />
                <Comparison />
                <ConsentRecord />
                <FrontendModules />
                <TechStack />
                <WhoCanUse />
                <Vision />
              </>
            } />
            <Route path="/documents" element={<Documents />} />
            <Route path="/request-consent" element={<RequestConsent />} />
            <Route path="/grant-consent" element={<GrantConsent />} />
            <Route path="/grant-consent/:requestId" element={<GrantConsent />} />
            <Route path="/scan-qr" element={<ScanQR />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={
              <div className="container mx-auto px-4 py-20">
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  About Us
                </h1>
                {/* Add About page content here */}
              </div>
            } />
            <Route path="/consented-documents" element={<ConsentedDocuments />} />
            <Route path="/view-consent/:requestId" element={<ViewConsent />} />
          </Routes>
        </Layout>
      </Router>
    </WalletProvider>
  );
}

export default App; 