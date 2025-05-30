import React from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheckIcon,
  ArrowPathIcon,
  LockClosedIcon,
  UserGroupIcon,
  ChartBarIcon,
  DocumentCheckIcon,
} from '@heroicons/react/24/outline';

const Features = () => {
  const features = [
    {
      icon: ShieldCheckIcon,
      title: "Blockchain Security",
      description: "Built on Algorand's secure and scalable blockchain infrastructure",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: ArrowPathIcon,
      title: "Real-time Updates",
      description: "Instant consent management and verification across the network",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      icon: LockClosedIcon,
      title: "Privacy First",
      description: "Your data remains private and under your control at all times",
      gradient: "from-pink-500 to-pink-600"
    },
    {
      icon: UserGroupIcon,
      title: "User-Centric",
      description: "Designed with user experience and control as top priorities",
      gradient: "from-green-500 to-green-600"
    },
    {
      icon: ChartBarIcon,
      title: "Analytics Dashboard",
      description: "Track and manage all your consent interactions in one place",
      gradient: "from-yellow-500 to-yellow-600"
    },
    {
      icon: DocumentCheckIcon,
      title: "Smart Contracts",
      description: "Automated consent management through smart contracts",
      gradient: "from-red-500 to-red-600"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Premium Features
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Experience the future of consent management with our cutting-edge features
          </motion.p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
              <feature.icon className={`h-12 w-12 text-${feature.gradient.split('-')[1]}-400 mb-6`} />
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features; 