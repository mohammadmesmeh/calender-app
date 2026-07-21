import { motion } from 'framer-motion';

/**
 * AuthCard
 * White, rounded, soft-shadow card used to frame auth forms
 * (register/login). Layout/positioning stays in the page component;
 * this just owns the card's own styling.
 */
export function AuthCard({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="w-full max-w-md rounded-card bg-surface p-container-md shadow-card sm:p-container-lg"
    >
      {children}
    </motion.div>
  );
}
