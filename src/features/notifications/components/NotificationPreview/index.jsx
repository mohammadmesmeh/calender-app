import { motion } from 'framer-motion'
import { CheckCheck } from 'lucide-react'
import { useNotifications } from '../../context/NotificationContext/NotificationContext'
import { NotificationItem } from '../NotificationItem'
import { NotificationEmpty } from '../NotificationEmpty'

export const NotificationPreview = () => {
  const { notifications, unreadCount, markAsRead, markAllAsRead, dismiss } =
    useNotifications()

  const hasUnread = unreadCount > 0

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: -4 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -4 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className="w-[calc(100vw-2rem)] sm:w-[360px] rounded-card border border-border/70 bg-surface shadow-dropdown overflow-hidden"
      role="dialog"
      aria-label="Notifications"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
        <h2 className="text-sm font-semibold text-text">
          Notifications
        </h2>
        {hasUnread && (
          <button
            type="button"
            onClick={markAllAsRead}
            className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary-hover transition-colors min-h-[36px]"
          >
            <CheckCheck size={14} />
            Mark all read
          </button>
        )}
      </div>

      <div className="max-h-[60vh] sm:max-h-[380px] overflow-y-auto py-1 px-1 space-y-0.5">
        {notifications.length === 0 ? (
          <NotificationEmpty />
        ) : (
          notifications.map((n) => (
            <NotificationItem
              key={n.id}
              notification={n}
              onMarkRead={markAsRead}
              onDismiss={dismiss}
            />
          ))
        )}
      </div>
    </motion.div>
  )
}
