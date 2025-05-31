"use client"

import { motion } from 'framer-motion'

export default function CreateConsentSvg() {
  return (
    <div className="relative h-full w-full flex items-center justify-center">
      <motion.svg 
        width="400" 
        height="360" 
        viewBox="0 0 400 360" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Background Gradient */}
        <rect width="400" height="360" rx="20" fill="url(#paint0_radial)" fillOpacity="0.1" />
        
        {/* Document with Form */}
        <motion.g 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <rect x="100" y="80" width="200" height="240" rx="10" fill="white" stroke="#E2E8F0" strokeWidth="2"/>
          
          {/* Form Fields */}
          <rect x="120" y="110" width="160" height="24" rx="4" fill="#F1F5F9" />
          <rect x="120" y="150" width="160" height="24" rx="4" fill="#F1F5F9" />
          <rect x="120" y="190" width="160" height="24" rx="4" fill="#F1F5F9" />
          
          {/* Checkbox */}
          <rect x="120" y="230" width="16" height="16" rx="4" fill="#3B82F6" />
          <path d="M124 238L127 241L132 235" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="144" y="230" width="80" height="8" rx="4" fill="#94A3B8" />
          
          {/* Button */}
          <rect x="120" y="270" width="160" height="32" rx="6" fill="#3B82F6" />
          <rect x="165" y="282" width="70" height="8" rx="4" fill="white" />
        </motion.g>
        
        {/* QR Code */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.8 
          }}
        >
          <rect x="320" y="140" width="60" height="60" rx="5" fill="white" stroke="#E2E8F0" strokeWidth="2"/>
          <rect x="330" y="150" width="40" height="40" rx="2" fill="#111111" />
          <rect x="335" y="155" width="10" height="10" rx="1" fill="white" />
          <rect x="355" y="155" width="10" height="10" rx="1" fill="white" />
          <rect x="335" y="175" width="10" height="10" rx="1" fill="white" />
          <rect x="345" y="165" width="10" height="10" rx="1" fill="white" />
          <rect x="345" y="175" width="10" height="10" rx="1" fill="white" />
          <rect x="355" y="175" width="10" height="10" rx="1" fill="white" />
        </motion.g>
        
        {/* Shield with Lock */}
        <motion.g
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <path d="M200 30L230 45V75C230 90 215 110 200 115C185 110 170 90 170 75V45L200 30Z" fill="#3B82F6" />
          <circle cx="200" cy="70" r="15" fill="#1E40AF" />
          <rect x="195" y="65" width="10" height="15" rx="2" fill="#3B82F6" />
          <path d="M197 65V60C197 57.8 198.8 56 201 56V56C203.2 56 205 57.8 205 60V65" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </motion.g>
        
        {/* Blockchain Animation */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {/* Connection Lines */}
          <motion.path 
            d="M50 240 L100 160" 
            stroke="#94A3B8" 
            strokeWidth="1.5" 
            strokeDasharray="4 4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{ duration: 1, delay: 1.2 }}
          />
          <motion.path 
            d="M300 160 L350 240" 
            stroke="#94A3B8" 
            strokeWidth="1.5" 
            strokeDasharray="4 4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{ duration: 1, delay: 1.4 }}
          />
          <motion.path 
            d="M50 240 L350 240" 
            stroke="#94A3B8" 
            strokeWidth="1.5" 
            strokeDasharray="4 4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{ duration: 1, delay: 1.6 }}
          />
          
          {/* Blockchain Nodes */}
          <motion.g
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 1.2 }}
          >
            <circle cx="50" cy="240" r="12" fill="#10B981" />
            <rect x="44" y="237" width="12" height="6" rx="1" fill="white" />
          </motion.g>
          
          <motion.g
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 1.4 }}
          >
            <circle cx="200" cy="240" r="12" fill="#10B981" />
            <rect x="194" y="237" width="12" height="6" rx="1" fill="white" />
          </motion.g>
          
          <motion.g
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 1.6 }}
          >
            <circle cx="350" cy="240" r="12" fill="#10B981" />
            <rect x="344" y="237" width="12" height="6" rx="1" fill="white" />
          </motion.g>
        </motion.g>
        
        {/* Consent Token Sparkle */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            duration: 0.5, 
            delay: 2,
            type: "spring", 
            stiffness: 300, 
            damping: 10 
          }}
        >
          <circle cx="200" cy="180" r="20" fill="#8B5CF6" />
          <path d="M200 170V190M190 180H210" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <path d="M187 167L213 193M187 193L213 167" stroke="white" strokeWidth="2" strokeOpacity="0.5" strokeLinecap="round" />
        </motion.g>
        
        <defs>
          <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(200 180) rotate(90) scale(180)">
            <stop stopColor="#3B82F6" />
            <stop offset="1" stopColor="#3B82F6" stopOpacity="0" />
          </radialGradient>
        </defs>
      </motion.svg>
    </div>
  )
}