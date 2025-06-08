import React from 'react';
import { motion } from 'framer-motion';

const DataFlowAnimation = () => {
  const flowAnimation = {
    pathLength: [0, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const pulseAnimation = {
    scale: [1, 1.1, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <div className="relative w-full h-[400px]">
      {/* Wallet Icon */}
      <motion.div
        className="absolute left-1/4 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={pulseAnimation}
      >
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="20" width="60" height="40" rx="5" fill="#3B82F6" />
          <rect x="20" y="30" width="40" height="20" rx="2" fill="white" />
          <path d="M30 40H50" stroke="#3B82F6" strokeWidth="2" />
        </svg>
      </motion.div>

      {/* QR Code */}
      <motion.div
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={pulseAnimation}
      >
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="20" width="40" height="40" fill="white" />
          <rect x="25" y="25" width="30" height="30" fill="#111827" />
          <rect x="30" y="30" width="10" height="10" fill="white" />
          <rect x="50" y="30" width="10" height="10" fill="white" />
          <rect x="30" y="50" width="10" height="10" fill="white" />
          <rect x="40" y="40" width="10" height="10" fill="white" />
        </svg>
      </motion.div>

      {/* Lock Icon */}
      <motion.div
        className="absolute right-1/4 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={pulseAnimation}
      >
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="35" width="40" height="30" rx="5" fill="#10B981" />
          <path d="M30 35V25C30 20 35 15 40 15C45 15 50 20 50 25V35" stroke="#10B981" strokeWidth="2" />
          <circle cx="40" cy="45" r="5" fill="white" />
        </svg>
      </motion.div>

      {/* Flow Lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.path
          d="M200 200 L400 200"
          stroke="#3B82F6"
          strokeWidth="2"
          strokeDasharray="5,5"
          animate={flowAnimation}
        />
        <motion.path
          d="M400 200 L600 200"
          stroke="#10B981"
          strokeWidth="2"
          strokeDasharray="5,5"
          animate={flowAnimation}
        />
      </svg>

      {/* Data Particles */}
      <motion.div
        className="absolute left-1/3 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={{
          x: [0, 200, 400],
          opacity: [0, 1, 0],
          transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10" cy="10" r="5" fill="#3B82F6" />
        </svg>
      </motion.div>
    </div>
  );
};

export default DataFlowAnimation; 