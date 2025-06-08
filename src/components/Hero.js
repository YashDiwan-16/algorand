import React from 'react';
import { motion } from 'framer-motion';
import HeroAnimation from './animations/HeroAnimation';
import WalletConnect from './WalletConnect';
import { useWallet } from '../context/WalletContext';
import { ClipboardDocumentListIcon, ChartBarIcon, DocumentCheckIcon } from '@heroicons/react/24/outline';

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
    <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-gray-900 transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <main className="pt-10 mx-auto max-w-7xl px-4 sm:pt-12 sm:px-6 md:pt-16 lg:pt-20 lg:px-8 xl:pt-28">
            <motion.div 
              className="sm:text-center lg:text-left"
              initial="initial"
              animate="animate"
              variants={fadeInUp}
            >
              <motion.h1 
                className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl"
                animate={{
                  textShadow: [
                    '0 0 8px rgba(59, 130, 246, 0.5)',
                    '0 0 16px rgba(59, 130, 246, 0.5)',
                    '0 0 8px rgba(59, 130, 246, 0.5)',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              >
                <span className="block">One Link,</span>
                <span className="block text-primary-400">One Scan,</span>
                <span className="block">One Consent</span>
              </motion.h1>

              <motion.p
                className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
                animate={{
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              >
                Experience the future of data sharing with ConsentChain. Securely manage your data consents through blockchain technology, QR codes, and messaging apps.
              </motion.p>

              <motion.div
                className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start"
                initial="initial"
                animate="animate"
                variants={buttonContainerVariants}
              >
                {!isConnectedToPeraWallet ? (
                  <>
                    <motion.div
                      className="rounded-md shadow"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <WalletConnect variant="hero" />
                    </motion.div>
                    <motion.div
                      className="mt-3 sm:mt-0 sm:ml-3"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.a
                        href="#"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 md:py-4 md:text-lg md:px-10"
                        animate={{
                          backgroundColor: [
                            'rgba(219, 234, 254, 1)',
                            'rgba(191, 219, 254, 1)',
                            'rgba(219, 234, 254, 1)',
                          ],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: 'reverse',
                        }}
                      >
                        Watch Demo
                      </motion.a>
                    </motion.div>
                  </>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl">
                    <motion.div
                      variants={buttonVariants}
                      initial="initial"
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <motion.a
                        href="#request-consent"
                        className="w-full flex items-center justify-center px-6 py-4 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300"
                        whileHover={{
                          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                        }}
                      >
                        <ClipboardDocumentListIcon className="h-6 w-6 mr-2" />
                        Request Consent
                      </motion.a>
                    </motion.div>
                    <motion.div
                      variants={buttonVariants}
                      initial="initial"
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <motion.a
                        href="#give-consent"
                        className="w-full flex items-center justify-center px-6 py-4 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl transition-all duration-300"
                        whileHover={{
                          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                        }}
                      >
                        <DocumentCheckIcon className="h-6 w-6 mr-2" />
                        Give Consent
                      </motion.a>
                    </motion.div>
                    <motion.div
                      variants={buttonVariants}
                      initial="initial"
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <motion.a
                        href="#dashboard"
                        className="w-full flex items-center justify-center px-6 py-4 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
                        whileHover={{
                          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                        }}
                      >
                        <ChartBarIcon className="h-6 w-6 mr-2" />
                        Dashboard
                      </motion.a>
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
          transition={{ duration: 0.8 }}
        >
          <HeroAnimation />
        </motion.div>
      </div>
    </div>
  );
}

export default Hero; 