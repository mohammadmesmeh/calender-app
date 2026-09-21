import { useState, useRef, useEffect, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Bell } from 'lucide-react'
import { useNotifications } from '../../context/NotificationContext/NotificationContext'
import { NotificationPreview } from '../NotificationPreview'
import { NotificationBadge } from '../NotificationBadge'

export const NotificationBell = ({ className = '' }) => {
  const [openState, setOpenState] = useState('closed')
  const [isDesktop, setIsDesktop] = useState(() => window.matchMedia('(min-width: 768px)').matches)
  const ref = useRef(null)
  const { unreadCount } = useNotifications()

  const isOpen = openState !== 'closed'

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const handler = (e) => setIsDesktop(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const showUnreadBadge = unreadCount > 0

  const close = useCallback(() => setOpenState('closed'), [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) close()
    }
    const handleEscape = (e) => {
      if (e.key === 'Escape') close()
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscape)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, close])

  const handleMouseEnter = useCallback(() => {
    if (isDesktop && openState === 'closed') setOpenState('hover-open')
  }, [isDesktop, openState])

  const handleMouseLeave = useCallback(() => {
    if (openState === 'hover-open') setOpenState('closed')
  }, [openState])

  const handleClick = useCallback(() => {
    setOpenState((prev) => (prev !== 'closed' ? 'closed' : 'click-open'))
  }, [])

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        onClick={handleClick}
        className="relative flex items-center justify-center rounded-button p-1.5 text-text-muted hover:text-primary hover:bg-primary-light/50 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 min-h-[44px] min-w-[44px]"
        aria-label={`Notifications${showUnreadBadge ? ` (${unreadCount} unread)` : ''}`}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
      >
        <Bell size={20} />
        <NotificationBadge count={unreadCount} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <div
            className="max-sm:fixed max-sm:left-4 max-sm:right-4 max-sm:top-16 max-sm:origin-top sm:absolute sm:right-0 sm:origin-top-right mt-2 z-50"
          >
            <NotificationPreview />
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
