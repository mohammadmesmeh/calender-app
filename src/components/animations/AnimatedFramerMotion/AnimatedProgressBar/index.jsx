import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

export function AnimatedProgressBar({ value = 0 ,duration }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const shouldReduce = useReducedMotion();

  return (
    <div ref={ref} className="h-3 w-full bg-background rounded-full overflow-hidden">
      
      <div style={{ transformOrigin: 'left' }}>
        {shouldReduce ? (
          <div
            className="h-full rounded-full bg-gradient-to-r from-success to-success"
            style={{ width: `${value}%` }}
          />
        ) : (
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-success to-success"
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