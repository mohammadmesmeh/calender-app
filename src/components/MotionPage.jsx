import { motion, useReducedMotion } from 'framer-motion'
import { pageVariants, pageTransition } from '../animations'

export function MotionPage({ children, className = "", style }) {
  const shouldReduce = useReducedMotion()
  const baseClass = "flex flex-col flex-1 min-h-0"
  const combinedClass = className ? `${baseClass} ${className}` : baseClass

  if (shouldReduce) return (
    <div className={combinedClass} style={style}>
      {children}
    </div>
  )

  return (
    <motion.div
      className={combinedClass}
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
