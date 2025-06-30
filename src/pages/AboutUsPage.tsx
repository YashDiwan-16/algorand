import React from 'react';
import Card from '../components/Card';

const AboutUsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card title="About Us">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Revolutionizing Data Consent
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          We are revolutionizing data consent management through blockchain technology, 
          making it secure, transparent, and user-friendly. Our platform empowers
          users to take control of their digital identity.
        </p>
      </Card>
    </div>
  );
};

export default AboutUsPage; 