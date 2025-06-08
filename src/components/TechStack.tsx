import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const technologies = [
  {
    name: 'Algorand',
    description: 'Pure Proof of Stake blockchain platform for secure, scalable, and decentralized applications',
    logo: '🔗',
    color: 'from-gray-700 to-gray-800',
  },
  {
    name: 'Algorand Standard Assets',
    description: 'Native token standard for creating and managing digital assets on Algorand',
    logo: '💎',
    color: 'from-gray-700 to-gray-800',
  },
  {
    name: 'Pera Wallet',
    description: 'Official Algorand wallet for secure asset management and transactions',
    logo: '👛',
    color: 'from-gray-700 to-gray-800',
  },
  {
    name: 'DigiLocker',
    description: 'Government-issued digital document storage and verification system',
    logo: '📄',
    color: 'from-gray-700 to-gray-800',
  },
  {
    name: 'AlgoKit',
    description: 'Developer toolkit for building and deploying Algorand applications',
    logo: '🛠️',
    color: 'from-gray-700 to-gray-800',
  },
  {
    name: 'IPFS',
    description: 'Decentralized storage system for secure and distributed document management',
    logo: '🌐',
    color: 'from-gray-700 to-gray-800',
  },
];

const TechStack = () => {
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

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Background animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-100 dark:bg-primary-900/20 rounded-full filter blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-200 dark:bg-primary-800/20 rounded-full filter blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 10,
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
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-bold text-gray-900 dark:text-white mb-6"
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
            Our Tech Stack
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          >
            Built with cutting-edge technologies to ensure security, scalability, and user experience.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group"
            >
              <div className="h-full bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
                <div className="flex flex-col items-center text-center">
                  <motion.div
                    className={`w-16 h-16 rounded-full bg-gradient-to-r ${tech.color} flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform duration-200`}
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    {tech.logo}
                  </motion.div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {tech.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {tech.description}
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
          className="mt-16 text-center"
        >
          <motion.p
            variants={itemVariants}
            className="text-gray-600 dark:text-gray-300"
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          >
            All components are optimized for performance and security, ensuring a seamless user experience.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack; 