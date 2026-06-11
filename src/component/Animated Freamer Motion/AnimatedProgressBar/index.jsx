import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function AnimatedProgressBar({ value = 0 ,duration }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
      
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-500"
        initial={{ width: 0 }}
        animate={isInView ? { width: `${value}%` } : { width: 0 }}
        transition={{
          duration: duration || 1.5,
          ease: "easeOut",
        }}
      />

    </div>
  );
}