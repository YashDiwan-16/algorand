"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function HeroIllustration() {
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  if (!isClient) {
    return <div className="h-full w-full bg-muted/20 rounded-lg"></div>
  }
  
  return (
    <div className="relative h-full w-full flex items-center justify-center">
      <motion.div 
        className="absolute"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <svg width="400" height="360" viewBox="0 0 400 360" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Background Gradient Circle */}
          <circle cx="200" cy="180" r="160" fill="url(#paint0_radial)" fillOpacity="0.2" />
          
          {/* Document Container */}
          <motion.g
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ 
              repeat: Infinity, 
              repeatType: "reverse", 
              duration: 3
            }}
          >
            <rect x="120" y="100" width="160" height="200" rx="10" fill="#ffffff" stroke="#E2E8F0" strokeWidth="2"/>
            <rect x="140" y="130" width="120" height="12" rx="6" fill="#94A3B8" />
            <rect x="140" y="160" width="80" height="12" rx="6" fill="#94A3B8" />
            <rect x="140" y="190" width="100" height="12" rx="6" fill="#94A3B8" />
            <rect x="140" y="220" width="120" height="12" rx="6" fill="#94A3B8" />
            <rect x="140" y="250" width="90" height="12" rx="6" fill="#94A3B8" />
          </motion.g>
          
          {/* Lock Icon */}
          <motion.g
            initial={{ scale: 1 }}
            animate={{ scale: 1.1 }}
            transition={{ 
              repeat: Infinity, 
              repeatType: "reverse", 
              duration: 2,
              delay: 1
            }}
          >
            <circle cx="200" cy="180" r="40" fill="#3B82F6" />
            <path d="M190 175V170C190 164.477 194.477 160 200 160V160C205.523 160 210 164.477 210 170V175" stroke="white" strokeWidth="4" strokeLinecap="round"/>
            <rect x="185" y="175" width="30" height="25" rx="4" fill="#1E40AF" />
            <circle cx="200" cy="187" r="5" fill="white" />
          </motion.g>
          
          {/* Connection Lines */}
          <motion.path 
            d="M200 60 L200 120" 
            stroke="#94A3B8" 
            strokeWidth="2" 
            strokeDasharray="5 5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop", repeatDelay: 2 }}
          />
          <motion.path 
            d="M200 240 L200 300" 
            stroke="#94A3B8" 
            strokeWidth="2" 
            strokeDasharray="5 5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop", repeatDelay: 2 }}
          />
          <motion.path 
            d="M120 180 L60 180" 
            stroke="#94A3B8" 
            strokeWidth="2" 
            strokeDasharray="5 5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop", repeatDelay: 2 }}
          />
          <motion.path 
            d="M280 180 L340 180" 
            stroke="#94A3B8" 
            strokeWidth="2" 
            strokeDasharray="5 5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop", repeatDelay: 2 }}
          />
          
          {/* Blockchain Nodes */}
          <motion.circle 
            cx="60" 
            cy="180" 
            r="15" 
            fill="#10B981"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
          />
          <motion.circle 
            cx="340" 
            cy="180" 
            r="15" 
            fill="#10B981"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse", delay: 0.2 }}
          />
          <motion.circle 
            cx="200" 
            cy="60" 
            r="15" 
            fill="#10B981"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse", delay: 0.4 }}
          />
          <motion.circle 
            cx="200" 
            cy="300" 
            r="15" 
            fill="#10B981"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse", delay: 0.6 }}
          />
          
          {/* Gradient Definition */}
          <defs>
            <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(200 180) rotate(90) scale(160)">
              <stop stopColor="#3B82F6" />
              <stop offset="1" stopColor="#3B82F6" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </motion.div>
    </div>
  )
}