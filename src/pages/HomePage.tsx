import React from 'react';
import Vision from '../components/Vision';
import PremiumShowcase from '../components/PremiumShowcase';
import Hero from '../components/Hero';
import WhatIsConsentChain from '../components/WhatIsConsentChain';
import HowItWorks from '../components/HowItWorks';
import UseCases from '../components/UseCases';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <WhatIsConsentChain />
      <HowItWorks />
      <UseCases />
      <Vision />
      <PremiumShowcase />
    </>
  );
};

export default HomePage; 