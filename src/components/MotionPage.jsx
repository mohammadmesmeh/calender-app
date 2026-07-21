import { motion, useReducedMotion } from 'framer-motion'
import { pageVariants, pageTransition } from '../animations'

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
