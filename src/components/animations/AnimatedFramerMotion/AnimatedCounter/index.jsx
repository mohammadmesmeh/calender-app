import { useInView, useMotionValue, animate, useReducedMotion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

function formatNumber(num, decimals = 0) {
  return num.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

export function AnimatedCounter({ value, duration = 1, suffix = "", decimals = 0 }) {
  const shouldReduce = useReducedMotion()
  const motionValue = useMotionValue(0)
  const [display, setDisplay] = useState(shouldReduce ? value : 0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    if (shouldReduce) return

    const controls = animate(motionValue, value, {
      duration,
      ease: [0.25, 0.1, 0.25, 1],
      onUpdate: (latest) => {
        setDisplay(latest)
      },
    })

    return controls.stop
  }, [isInView, value, duration, shouldReduce, motionValue])

  return (
    <span ref={ref}>
      {formatNumber(display, decimals)}{suffix}
    </span>
  )
}
