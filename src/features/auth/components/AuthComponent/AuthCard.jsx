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
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="w-full rounded-3xl border border-border/80 bg-surface/95 p-6 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] backdrop-blur-2xl ring-1 ring-black/[0.03] sm:p-8 md:p-9 dark:bg-surface/90"
    >
      {children}
    </motion.div>
  );
}
