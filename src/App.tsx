import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WalletProvider } from './context/WalletContext';

// Pages
import Documents from './pages/Documents';
import ConsentsPage from './pages/ConsentsPage';
import TelegramBotPage from './pages/TelegramBotPage';
import HomePage from './pages/HomePage'; // Assuming Vision and PremiumShowcase are part of a HomePage

// Components
import Layout from './components/Layout';

const App: React.FC = () => {
  return (
    <WalletProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/consents" element={<ConsentsPage />} />
            <Route path="/telegram-bot" element={<TelegramBotPage />} />
            {/* Add other routes here */}
          </Routes>
        </Layout>
      </Router>
    </WalletProvider>
  );
};

export default App;
