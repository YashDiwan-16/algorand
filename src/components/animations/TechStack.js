import React from 'react';
import { motion } from 'framer-motion';

const TechStack = () => {
  const floatingAnimation = {
    y: [0, -5, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const techStack = [
    {
      name: 'Algorand',
      icon: (
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="25" fill="#000000" />
          <path d="M20 30L30 20L40 30L30 40L20 30Z" fill="#FFFFFF" />
        </svg>
      ),
    },
    {
      name: 'Pera Wallet',
      icon: (
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="15" width="40" height="30" rx="5" fill="#3B82F6" />
          <rect x="20" y="25" width="20" height="10" rx="2" fill="white" />
        </svg>
      ),
    },
    {
      name: 'React',
      icon: (
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="25" stroke="#61DAFB" strokeWidth="2" />
          <circle cx="30" cy="30" r="5" fill="#61DAFB" />
          <ellipse cx="30" cy="30" rx="25" ry="8" stroke="#61DAFB" strokeWidth="2" transform="rotate(-30 30 30)" />
          <ellipse cx="30" cy="30" rx="25" ry="8" stroke="#61DAFB" strokeWidth="2" transform="rotate(30 30 30)" />
        </svg>
      ),
    },
    {
      name: 'TailwindCSS',
      icon: (
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M30 10C20 10 25 20 15 25C25 25 30 35 40 30C50 25 55 35 45 40C55 35 60 25 50 20C40 15 35 10 30 10Z" fill="#06B6D4" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-12">
      {techStack.map((tech) => (
        <motion.div
          key={tech.name}
          className="flex flex-col items-center"
          animate={floatingAnimation}
        >
          {tech.icon}
          <p className="mt-4 text-sm font-medium text-gray-900 dark:text-white">{tech.name}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default TechStack; 