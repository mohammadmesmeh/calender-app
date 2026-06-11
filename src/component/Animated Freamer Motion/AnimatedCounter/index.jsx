import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function AnimatedCounter({ value, duration = 1 }) {
  const motionValue = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(motionValue, value, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => {
        setDisplay(Math.round(latest));
      },
    });

    return controls.stop;
  }, [isInView, value, duration]);

  return (
    <motion.span ref={ref}>
      {display}
    </motion.span>
  );
}