import { motion } from "framer-motion";

export const InViewAnimation = ({ children }) => {
  return (
    <motion.div
    className="w-full"
      initial={{ y: 60, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};