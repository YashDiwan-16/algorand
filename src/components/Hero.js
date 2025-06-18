import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import HeroAnimation from './animations/HeroAnimation';
import WalletConnect from './WalletConnect';
import { useWallet } from '../context/WalletContext';
import { 
  ClipboardDocumentListIcon, 
  ChartBarIcon, 
  DocumentCheckIcon,
  QrCodeIcon 
} from '@heroicons/react/24/outline';

function Hero() {
  const { isConnectedToPeraWallet } = useWallet();
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      y: -5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { scale: 0.95 }
  };

  const buttonContainerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="relative overflow-hidden min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="pt-10 mx-auto max-w-7xl px-4 sm:pt-12 sm:px-6 md:pt-16 lg:pt-20 lg:px-8 xl:pt-28">
            <motion.div 
              className="sm:text-center lg:text-left"
              initial="initial"
              animate="animate"
              variants={fadeInUp}
            >
              <motion.h1 
                className="text-5xl tracking-tight font-display font-extrabold text-white sm:text-6xl md:text-7xl lg:text-8xl"
                animate={{
                  textShadow: [
                    '0 0 20px rgba(59, 130, 246, 0.3)',
                    '0 0 40px rgba(59, 130, 246, 0.5)',
                    '0 0 20px rgba(59, 130, 246, 0.3)',
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              >
                <span className="block text-gradient">One Link,</span>
                <span className="block text-gradient">One Scan,</span>
                <span className="block text-gradient">One Consent</span>
              </motion.h1>

              <motion.p
                className="mt-6 text-xl text-gray-200 sm:mt-8 sm:text-2xl sm:max-w-xl sm:mx-auto md:mt-8 md:text-2xl lg:mx-0 leading-relaxed"
                animate={{
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              >
                Experience the future of data sharing with ConsentChain. Securely manage your data consents through blockchain technology, QR codes, and messaging apps.
              </motion.p>

              <motion.div
                className="mt-8 sm:mt-12 sm:flex sm:justify-center lg:justify-start"
                initial="initial"
                animate="animate"
                variants={buttonContainerVariants}
              >
                {!isConnectedToPeraWallet ? (
                  <>
                    <motion.div
                      className="rounded-xl shadow-elegant"
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <WalletConnect variant="hero" />
                    </motion.div>
                    <motion.div
                      className="mt-4 sm:mt-0 sm:ml-6"
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.a
                        href="#"
                        className="btn-outline w-full flex items-center justify-center px-10 py-4 text-lg font-medium md:py-5 md:text-xl md:px-12"
                        animate={{
                          borderColor: [
                            'rgba(255, 255, 255, 0.3)',
                            'rgba(255, 255, 255, 0.6)',
                            'rgba(255, 255, 255, 0.3)',
                          ],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          repeatType: 'reverse',
                        }}
                      >
                        Watch Demo
                      </motion.a>
                    </motion.div>
                  </>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl">
                    <motion.div
                      variants={buttonVariants}
                      initial="initial"
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <Link
                        to="/request-consent"
                        className="w-full flex items-center justify-center px-8 py-5 border border-transparent text-lg font-medium rounded-2xl text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-glow hover:shadow-glow-lg transition-all duration-300 border border-primary-400/30"
                      >
                        <ClipboardDocumentListIcon className="h-7 w-7 mr-3" />
                        Request Consent
                      </Link>
                    </motion.div>
                    <motion.div
                      variants={buttonVariants}
                      initial="initial"
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <Link
                        to="/grant-consent"
                        className="w-full flex items-center justify-center px-8 py-5 border border-transparent text-lg font-medium rounded-2xl text-white bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 shadow-glow hover:shadow-glow-lg transition-all duration-300 border border-secondary-400/30"
                      >
                        <DocumentCheckIcon className="h-7 w-7 mr-3" />
                        Grant Consent
                      </Link>
                    </motion.div>
                    <motion.div
                      variants={buttonVariants}
                      initial="initial"
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <Link
                        to="/scan-qr"
                        className="w-full flex items-center justify-center px-8 py-5 border border-transparent text-lg font-medium rounded-2xl text-white bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 shadow-glow hover:shadow-glow-lg transition-all duration-300 border border-accent-400/30"
                      >
                        <QrCodeIcon className="h-7 w-7 mr-3" />
                        Scan QR
                      </Link>
                    </motion.div>
                    <motion.div
                      variants={buttonVariants}
                      initial="initial"
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <Link
                        to="/dashboard"
                        className="w-full flex items-center justify-center px-8 py-5 border border-transparent text-lg font-medium rounded-2xl text-white bg-gradient-to-r from-premium-600 to-premium-700 hover:from-premium-700 hover:to-premium-800 shadow-glow hover:shadow-glow-lg transition-all duration-300 border border-premium-400/30"
                      >
                        <ChartBarIcon className="h-7 w-7 mr-3" />
                        Dashboard
                      </Link>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <HeroAnimation />
        </motion.div>
      </div>
    </div>
  );
}

export default Hero; 