import { motion, useReducedMotion } from 'framer-motion'
import React from 'react'

export const pageVariants = {
  initial: { opacity: 0, y: 10 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -8 },
}

export const pageTransition = {
  type: 'tween',
  ease: 'easeInOut',
  duration: 0.45,
}

export function MotionPage({ children, className, style }) {
  const shouldReduce = useReducedMotion()
  if (shouldReduce) return (
    <div className={className} style={style}>
      {children}
    </div>
  )

  return (
    <motion.div
      className={className}
      style={style}
      variants={pageVariants}
      initial="initial"
      animate="in"
      exit="out"
      transition={pageTransition}
    >
      {children}
    </motion.div>
  )
}

export const fadeInUp = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
}

export default {
  pageVariants,
  pageTransition,
  MotionPage,
  fadeInUp,
}
