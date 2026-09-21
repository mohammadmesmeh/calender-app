import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, AlertCircle } from 'lucide-react';

const feedbackMotion = {
  initial: { opacity: 0, height: 0 },
  animate: { opacity: 1, height: 'auto' },
  exit: { opacity: 0, height: 0 },
};

export function AuthSuccessMessage({ message }) {
  return (
    <AnimatePresence mode="wait">
      {message && (
        <motion.div
          key="success"
          {...feedbackMotion}
          className="mt-5 flex items-start gap-2.5 overflow-hidden rounded-button border border-success/30 bg-success-light/50 p-3.5"
        >
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
          <p className="text-sm font-medium text-success">{message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function AuthErrorMessage({ message }) {
  return (
    <AnimatePresence mode="wait">
      {message && (
        <motion.div
          key="error"
          {...feedbackMotion}
          className="mt-5 flex items-start gap-2.5 overflow-hidden rounded-button border border-danger/30 bg-danger-light/50 p-3.5"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-danger" />
          <p className="text-sm font-medium capitalize text-danger">{message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
