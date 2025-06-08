import React from 'react';
import { motion } from 'framer-motion';

const UseCaseIcons = () => {
  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const useCases = [
    {
      name: 'Health',
      icon: (
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="20" width="40" height="40" rx="5" fill="#EF4444" />
          <path d="M40 30V50M30 40H50" stroke="white" strokeWidth="2" />
          <path d="M20 60H60" stroke="#EF4444" strokeWidth="2" />
        </svg>
      ),
    },
    {
      name: 'Education',
      icon: (
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M40 20L70 35L40 50L10 35L40 20Z" fill="#3B82F6" />
          <path d="M40 50V65" stroke="#3B82F6" strokeWidth="2" />
          <path d="M20 45V55C20 60 25 65 30 65H50C55 65 60 60 60 55V45" stroke="#3B82F6" strokeWidth="2" />
        </svg>
      ),
    },
    {
      name: 'Job Applications',
      icon: (
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="20" width="40" height="50" rx="5" fill="#F59E0B" />
          <path d="M30 35H50M30 45H50M30 55H40" stroke="white" strokeWidth="2" />
        </svg>
      ),
    },
    {
      name: 'Personal Documents',
      icon: (
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="20" width="40" height="50" rx="5" fill="#10B981" />
          <path d="M30 35H50M30 45H50M30 55H40" stroke="white" strokeWidth="2" />
          <circle cx="40" cy="25" r="5" fill="white" />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {useCases.map((useCase) => (
        <motion.div
          key={useCase.name}
          className="flex flex-col items-center"
          animate={floatingAnimation}
        >
          {useCase.icon}
          <p className="mt-4 text-lg font-medium text-gray-900 dark:text-white">{useCase.name}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default UseCaseIcons; 