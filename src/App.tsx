import Hero from './components/Hero';
import WhatIsConsentChain from './components/WhatIsConsentChain';
import HowItWorks from './components/HowItWorks';
import UseCases from './components/UseCases';
import Comparison from './components/Comparison';
import ConsentRecord from './components/ConsentRecord';
import FrontendModules from './components/FrontendModules';
import TechStack from './components/TechStack';
import WhoCanUse from './components/WhoCanUse';
import Vision from './components/Vision';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
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
    </div>
  );
}

export default App;
