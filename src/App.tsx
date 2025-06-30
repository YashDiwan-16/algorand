import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WalletProvider } from './context/WalletContext';

// Pages
import Documents from './pages/Documents';
import ConsentsPage from './pages/ConsentsPage';
import TelegramBotPage from './pages/TelegramBotPage';
import HomePage from './pages/HomePage'; // Assuming Vision and PremiumShowcase are part of a HomePage
import DashboardPage from './pages/DashboardPage';
import SettingsPage from './pages/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';
import AboutUsPage from './pages/AboutUsPage'; // Import the new page

// Components
import Layout from './components/Layout';

const App: React.FC = () => {
  return (
    <WalletProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/consents" element={<ConsentsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/telegram-bot" element={<TelegramBotPage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </Router>
    </WalletProvider>
  );
};

export default App;
