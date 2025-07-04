import React from 'react';
import { motion } from 'framer-motion';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';

const TELEGRAM_BOT_URL = 'https://t.me/consent_bot';

const TelegramBotPage: React.FC = () => {
  return (
    <section className="min-h-[60vh] flex items-center justify-center py-24 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 right-1/4 w-80 h-80 bg-primary-500/10 rounded-full filter blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-secondary-500/10 rounded-full filter blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
      <div className="relative z-10 max-w-2xl w-full mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-10 border border-white/20 shadow-elegant text-center">
        <motion.h1
          className="text-4xl sm:text-5xl font-display font-bold text-gradient mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          ConsentChain Telegram Bot
        </motion.h1>
        <motion.p
          className="text-xl text-gray-200 mb-8 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          Interact with ConsentChain directly from Telegram! Use our <span className="font-semibold text-gradient">@consent_bot</span> to manage your data consents, receive notifications, and more—all from your favorite messaging app.
        </motion.p>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gradient mb-4">How to Use</h2>
          <ol className="list-decimal list-inside text-left text-lg text-gray-200 space-y-2 mx-auto max-w-xl">
            <li>Click the <span className="font-semibold text-gradient">Open Consent Bot</span> button below.</li>
            <li>Start a chat with <span className="font-semibold text-gradient">@consent_bot</span> on Telegram.</li>
            <li>Follow the instructions sent by the bot to link your ConsentChain account.</li>
            <li>Manage your data consents, receive notifications, and approve or reject requests—all from Telegram!</li>
          </ol>
        </div>
        <motion.a
          href={TELEGRAM_BOT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary flex items-center justify-center gap-3 mx-auto w-fit"
          whileHover={{ scale: 1.07, y: -2 }}
          whileTap={{ scale: 0.97 }}
        >
          <PaperAirplaneIcon className="w-6 h-6" />
          Open Consent Bot
        </motion.a>
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-gradient mb-4">What Users Say</h2>
          <div className="flex flex-col gap-4 items-center">
            <blockquote className="bg-white/10 border-l-4 border-primary-400 p-4 rounded-xl text-gray-100 max-w-lg italic shadow-glow">
              "The ConsentChain Telegram bot made it so easy to approve requests on the go!"
              <span className="block mt-2 text-primary-300 font-semibold">— A ConsentChain User</span>
            </blockquote>
            <blockquote className="bg-white/10 border-l-4 border-secondary-400 p-4 rounded-xl text-gray-100 max-w-lg italic shadow-glow">
              "I love getting instant notifications in Telegram. Super convenient!"
              <span className="block mt-2 text-secondary-300 font-semibold">— Data Owner</span>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TelegramBotPage; 