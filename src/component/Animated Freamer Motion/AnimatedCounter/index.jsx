import { useInView, useMotionValue, animate, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function AnimatedCounter({ value, duration = 1 }) {
  const motionValue = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;
    if (shouldReduce) {
      setDisplay(value);
      return;
    }

    const controls = animate(motionValue, value, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => {
        setDisplay(Math.round(latest));
      },
    });

    return controls.stop;
  }, [isInView, value, duration, shouldReduce]);

  return (
    <span ref={ref}>
      {display}
    </span>
  );
}