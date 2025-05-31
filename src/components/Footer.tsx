import React from 'react';
import { motion, Variants } from 'framer-motion';

interface Link {
  name: string;
  href: string;
}

interface SocialLink extends Link {
  icon: React.ReactNode;
}

const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

const Footer: React.FC = () => {
  const links: Link[] = [
    {
      name: 'About',
      href: '#',
    },
    {
      name: 'Features',
      href: '#',
    },
    {
      name: 'How It Works',
      href: '#',
    },
    {
      name: 'Contact',
      href: '#',
    },
  ];

  const socialLinks: SocialLink[] = [
    {
      name: 'Twitter',
      href: '#',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
    {
      name: 'GitHub',
      href: '#',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      name: 'Discord',
      href: '#',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="xl:grid xl:grid-cols-3 xl:gap-8"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          <motion.div 
            className="space-y-8 xl:col-span-1"
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          >
            <motion.img
              className="h-10"
              src="/logo.svg"
              alt="ConsentChain"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />
            <motion.p 
              className="text-gray-300 text-base"
              animate={{
                textShadow: [
                  '0 0 8px rgba(255, 255, 255, 0.5)',
                  '0 0 16px rgba(255, 255, 255, 0.5)',
                  '0 0 8px rgba(255, 255, 255, 0.5)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            >
              Making data sharing secure and transparent with blockchain technology.
            </motion.p>
            <div className="flex space-x-6">
              {socialLinks.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-gray-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="sr-only">{item.name}</span>
                  {item.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
          <motion.div 
            className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div>
              <motion.h3 
                className="text-sm font-semibold text-gray-400 tracking-wider uppercase"
                animate={{
                  color: ['#60A5FA', '#3B82F6', '#2563EB'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              >
                Navigation
              </motion.h3>
              <ul className="mt-4 space-y-4">
                {links.map((item) => (
                  <motion.li
                    key={item.name}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <a href={item.href} className="text-base text-gray-300 hover:text-white">
                      {item.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div>
              <motion.h3 
                className="text-sm font-semibold text-gray-400 tracking-wider uppercase"
                animate={{
                  color: ['#60A5FA', '#3B82F6', '#2563EB'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              >
                Legal
              </motion.h3>
              <ul className="mt-4 space-y-4">
                <motion.li whileHover={{ x: 5 }} whileTap={{ scale: 0.95 }}>
                  <a href="#" className="text-base text-gray-300 hover:text-white">
                    Privacy Policy
                  </a>
                </motion.li>
                <motion.li whileHover={{ x: 5 }} whileTap={{ scale: 0.95 }}>
                  <a href="#" className="text-base text-gray-300 hover:text-white">
                    Terms of Service
                  </a>
                </motion.li>
              </ul>
            </div>
          </motion.div>
        </motion.div>
        <motion.div 
          className="mt-12 border-t border-gray-700 pt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.p 
            className="text-base text-gray-400 text-center"
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          >
            © {new Date().getFullYear()} ConsentChain. All rights reserved.
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 