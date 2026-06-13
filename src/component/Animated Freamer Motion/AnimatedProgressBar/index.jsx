import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

export function AnimatedProgressBar({ value = 0 ,duration }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const shouldReduce = useReducedMotion();

  return (
    <div ref={ref} className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
      
      <div style={{ transformOrigin: 'left' }}>
        {shouldReduce ? (
          <div
            className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-500"
            style={{ width: `${value}%` }}
          />
        ) : (
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-500"
            style={{ transformOrigin: 'left' }}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: value / 100 } : { scaleX: 0 }}
            transition={{
              duration: duration || 1.5,
              ease: "easeOut",
            }}
          />
        )}
      </div>

    </div>
  );
}