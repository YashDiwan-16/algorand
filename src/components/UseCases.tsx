import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  BuildingOfficeIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  DocumentIcon,
} from '@heroicons/react/24/outline';

const useCases = [
  {
    icon: BuildingOfficeIcon,
    title: 'Health',
    description: 'A patient gives one-time, view-only access to their medical report to a doctor using a QR code. No paper. No middlemen. No risk of misuse.',
    color: 'from-red-100 to-red-200 dark:from-red-900 dark:to-red-800',
  },
  {
    icon: AcademicCapIcon,
    title: 'Education',
    description: 'A student shares verified academic records with a university during admission. University accesses it via a link, and verification happens on-chain.',
    color: 'from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800',
  },
  {
    icon: BriefcaseIcon,
    title: 'Job Applications',
    description: 'A professional gives temporary access to a resume or identity documents to a recruiter. The link expires after 7 days, automatically revoking access.',
    color: 'from-green-100 to-green-200 dark:from-green-900 dark:to-green-800',
  },
  {
    icon: DocumentIcon,
    title: 'Personal Documents',
    description: 'Share Aadhaar, PAN, or certificates with banks, landlords, or relatives. No app install. Just one scan — with full user control.',
    color: 'from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800',
  },
];

const UseCases = () => {
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
          <h2 className="section-title">Use Cases</h2>
          <p className="section-subtitle max-w-3xl mx-auto">
            Discover how ConsentChain revolutionizes data sharing across different sectors.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group"
            >
              <div className={`h-full bg-gradient-to-br ${useCase.color} rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-200`}>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-xl shadow-md flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                    <useCase.icon className="w-6 h-6 text-gray-900 dark:text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                      {useCase.title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-200">
                      {useCase.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases; 