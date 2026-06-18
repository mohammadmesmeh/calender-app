import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const overlayClasses = [
  'fixed inset-0 bg-black/40 backdrop-blur-sm z-40',
  'flex items-center justify-center p-4 sm:p-6'
].join(' ')

const contentClasses = [
  'w-full max-w-2xl mx-auto overflow-hidden',
  'bg-surface text-text rounded-2xl shadow-soft',
  'ring-1 ring-border',
  'max-h-[90vh]'
].join(' ')

const headerClasses = [
  'flex items-center justify-between gap-3 px-6 py-5 border-b border-border'
].join(' ')

const closeButtonClasses = [
  'inline-flex items-center justify-center rounded-full p-2',
  'text-text-muted hover:text-text hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30'
].join(' ')

export const Modal = ({ title, isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className={overlayClasses}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            className={contentClasses}
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <div className={headerClasses}>
              <h2 className="text-lg font-semibold">{title}</h2>
              <button type="button" className={closeButtonClasses} onClick={onClose} aria-label="Close modal">
                <X size={18} />
              </button>
            </div>
            <div className="overflow-y-auto px-6 pb-6 pt-4 max-h-[76vh]">{children}</div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
