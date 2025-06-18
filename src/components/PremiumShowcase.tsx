import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  SparklesIcon,
  ShieldCheckIcon,
  BoltIcon,
  HeartIcon,
  StarIcon,
  RocketLaunchIcon,
} from '@heroicons/react/24/outline';

const PremiumShowcase: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const features = [
    {
      icon: SparklesIcon,
      title: 'Premium Design',
      description: 'Elegant glass morphism effects with sophisticated animations',
      color: 'from-primary-500 to-primary-600',
    },
    {
      icon: ShieldCheckIcon,
      title: 'Secure & Reliable',
      description: 'Built with enterprise-grade security and reliability',
      color: 'from-secondary-500 to-secondary-600',
    },
    {
      icon: BoltIcon,
      title: 'Lightning Fast',
      description: 'Optimized for performance with smooth interactions',
      color: 'from-accent-500 to-accent-600',
    },
    {
      icon: HeartIcon,
      title: 'User Centric',
      description: 'Designed with user experience as the top priority',
      color: 'from-premium-600 to-premium-700',
    },
  ];

  return (
    <section className="py-32 relative overflow-hidden min-h-screen flex items-center">
      {/* Background animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 right-1/4 w-80 h-80 bg-primary-500/10 rounded-full filter blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-secondary-500/10 rounded-full filter blur-3xl"
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent-500/5 rounded-full filter blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-20"
        >
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <StarIcon className="w-8 h-8 text-yellow-400" />
            <span className="text-yellow-400 font-semibold text-lg">Premium Experience</span>
            <StarIcon className="w-8 h-8 text-yellow-400" />
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="section-title"
          >
            Premium Design System
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="section-subtitle max-w-4xl mx-auto"
          >
            Experience the future of UI design with our premium components, elegant animations, and sophisticated visual effects.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group"
            >
              <div className="card-premium h-full">
                <div className="flex flex-col items-center text-center">
                  <motion.div
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-glow`}
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <feature.icon className="w-10 h-10" />
                  </motion.div>
                  <h3 className="text-2xl font-semibold text-gradient mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-200 text-lg leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center"
        >
          <motion.h3
            variants={itemVariants}
            className="text-3xl font-semibold text-gradient mb-12"
          >
            Try Our Premium Components
          </motion.h3>
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary flex items-center justify-center gap-3"
            >
              <RocketLaunchIcon className="w-6 h-6" />
              Get Started
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary flex items-center justify-center gap-3"
            >
              <SparklesIcon className="w-6 h-6" />
              Explore Features
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="btn-accent flex items-center justify-center gap-3"
            >
              <HeartIcon className="w-6 h-6" />
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PremiumShowcase; 