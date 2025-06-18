import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const technologies = [
  {
    name: 'Algorand',
    description: 'Pure Proof of Stake blockchain platform for secure, scalable, and decentralized applications',
    logo: '🔗',
    color: 'from-primary-500 to-primary-600',
  },
  {
    name: 'Algorand Standard Assets',
    description: 'Native token standard for creating and managing digital assets on Algorand',
    logo: '💎',
    color: 'from-secondary-500 to-secondary-600',
  },
  {
    name: 'Pera Wallet',
    description: 'Official Algorand wallet for secure asset management and transactions',
    logo: '👛',
    color: 'from-accent-500 to-accent-600',
  },
  {
    name: 'DigiLocker',
    description: 'Government-issued digital document storage and verification system',
    logo: '📄',
    color: 'from-premium-600 to-premium-700',
  },
  {
    name: 'AlgoKit',
    description: 'Developer toolkit for building and deploying Algorand applications',
    logo: '🛠️',
    color: 'from-primary-600 to-secondary-600',
  },
  {
    name: 'IPFS',
    description: 'Decentralized storage system for secure and distributed document management',
    logo: '🌐',
    color: 'from-secondary-600 to-accent-600',
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
    <section className="py-32 relative overflow-hidden min-h-screen flex items-center">
      {/* Background animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-80 h-80 bg-primary-500/10 rounded-full filter blur-3xl"
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
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-500/10 rounded-full filter blur-3xl"
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
          <motion.h2
            variants={itemVariants}
            className="section-title"
          >
            Our Tech Stack
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="section-subtitle max-w-4xl mx-auto"
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
              <div className="card-premium h-full">
                <div className="flex flex-col items-center text-center">
                  <motion.div
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${tech.color} flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-glow`}
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
                  <h3 className="text-2xl font-semibold text-gradient mb-4">
                    {tech.name}
                  </h3>
                  <p className="text-gray-200 text-lg leading-relaxed">
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
          className="mt-20 text-center"
        >
          <motion.p
            variants={itemVariants}
            className="text-gray-200 text-xl leading-relaxed"
          >
            All components are optimized for performance and security, ensuring a seamless user experience.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack; 