import React from 'react';
import { motion } from 'framer-motion';

const HeroAnimation = () => {
  const floatingAnimation = {
    y: [0, -10, 0],
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

  const scanAnimation = {
    y: [0, 100, 0],
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <div className="relative w-full h-[500px]">
      {/* Phone Frame */}
      <motion.div
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={floatingAnimation}
      >
        <svg width="300" height="600" viewBox="0 0 300 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="20" width="260" height="560" rx="30" fill="#1F2937" />
          <rect x="30" y="30" width="240" height="540" rx="25" fill="#111827" />
          <circle cx="150" cy="580" r="15" fill="#374151" />
        </svg>
      </motion.div>

      {/* QR Code */}
      <motion.div
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={pulseAnimation}
      >
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="40" y="40" width="120" height="120" fill="white" />
          <rect x="50" y="50" width="100" height="100" fill="#111827" />
          <rect x="60" y="60" width="20" height="20" fill="white" />
          <rect x="120" y="60" width="20" height="20" fill="white" />
          <rect x="60" y="120" width="20" height="20" fill="white" />
          <rect x="90" y="90" width="20" height="20" fill="white" />
        </svg>
      </motion.div>

      {/* Scanning Line */}
      <motion.div
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={scanAnimation}
      >
        <svg width="200" height="2" viewBox="0 0 200 2" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="1" x2="200" y2="1" stroke="#00FF00" strokeWidth="2" />
        </svg>
      </motion.div>

      {/* Floating Icons */}
      <motion.div
        className="absolute left-1/4 top-1/4"
        animate={floatingAnimation}
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 0L40 20H30V40H10V20H0L20 0Z" fill="#3B82F6" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute right-1/4 top-1/3"
        animate={floatingAnimation}
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 0L0 20H10V40H30V20H40L20 0Z" fill="#10B981" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute left-1/3 bottom-1/4"
        animate={floatingAnimation}
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="20" fill="#F59E0B" />
          <path d="M20 10V30M10 20H30" stroke="white" strokeWidth="2" />
        </svg>
      </motion.div>
    </div>
  );
};

export default HeroAnimation; 