import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const consentRecord = {
  consent_id: "xyz789",
  from: "ALGO_ADDR_123",
  to: "ALGO_ADDR_456",
  purpose: "Medical Report - COVID Test",
  access: "view-only",
  expiry: "2025-06-30T00:00:00Z",
  status: "active",
  verified_receiver: true
};

const ConsentRecord = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Consent Record Example</h2>
          <p className="section-subtitle max-w-3xl mx-auto">
            See how consent records are stored on-chain for verifiability. Even we can't tamper it.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-gray-800 rounded-xl overflow-hidden shadow-xl">
            <div className="flex items-center px-4 py-2 bg-gray-700">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="ml-4 text-sm text-gray-300">consent-record.json</div>
            </div>
            <div className="p-4 overflow-x-auto">
              <pre className="text-sm text-gray-300">
                <code>
                  {JSON.stringify(consentRecord, null, 2)}
                </code>
              </pre>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 text-center"
          >
            <p className="text-gray-600 dark:text-gray-300">
              Each consent record is immutable and verifiable on the Algorand blockchain.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ConsentRecord; 