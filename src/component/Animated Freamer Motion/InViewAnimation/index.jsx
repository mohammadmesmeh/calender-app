import { motion, useReducedMotion } from "framer-motion";
import { fadeInUp } from '../../../animations'

export const InViewAnimation = ({ children }) => {
  const shouldReduce = useReducedMotion();
  if (shouldReduce) return <div className="w-full">{children}</div>

  return (
    <motion.div
      className="w-full"
      initial={fadeInUp.initial}
      whileInView={fadeInUp.animate}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};