import { Clock, Check, X, ListTodo, Calendar, Info, AlertCircle } from 'lucide-react'
import { useLocalization } from "@/i18n/LocalizationProvider"

const TYPE_ICON = {
  task_reminder: ListTodo,
  event_reminder: Calendar,
  update: Info,
  system: AlertCircle,
}

const TYPE_COLOR = {
  task_reminder: 'text-primary bg-primary/10',
  event_reminder: 'text-accent bg-accent-light',
  update: 'text-success bg-success-light',
  system: 'text-secondary bg-secondary-light',
}

const useRelativeTime = () => {
  const { t, locale } = useLocalization()

  return (date) => {
    const now = Date.now()
    const diff = now - date.getTime()
    const mins = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)
    const num = new Intl.NumberFormat(locale)

    if (mins < 1) return t('notifications.justNow')
    if (mins < 60) return t('notifications.minutesAgo', { count: num.format(mins) })
    if (hours < 24) return t('notifications.hoursAgo', { count: num.format(hours) })
    if (days < 7) return t('notifications.daysAgo', { count: num.format(days) })
    return date.toLocaleDateString(locale)
  }
}

export const NotificationItem = ({ notification, onMarkRead, onDismiss }) => {
  const { t } = useLocalization()
  const relativeTime = useRelativeTime()
  const Icon = TYPE_ICON[notification.type] || Info
  const colorClass = TYPE_COLOR[notification.type] || 'text-text-muted bg-border/50'

  return (
    <div
      className={`group relative flex gap-3 rounded-card px-3 py-2.5 transition-all duration-200 ${
        notification.read
          ? 'opacity-70'
          : 'bg-primary-light/30 hover:bg-primary-light/50'
      }`}
    >
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-icon ${colorClass}`}
      >
        <Icon size={16} />
      </span>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p
            className={`text-sm truncate ${
              notification.read ? 'text-text-secondary' : 'text-text font-medium'
            }`}
          >
            {notification.title}
          </p>
          {!notification.read && (
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
          )}
        </div>
        <p className="text-xs text-text-muted mt-0.5 line-clamp-2">
          {notification.description}
        </p>
        <div className="flex items-center gap-1 mt-1.5">
          <Clock size={11} className="text-text-muted" />
          <span className="text-[11px] text-text-muted">{relativeTime(notification.time)}</span>
        </div>
      </div>

      <div className="absolute end-2 top-2 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {!notification.read && (
          <button
            type="button"
            onClick={() => onMarkRead(notification.id)}
            className="flex h-6 w-6 items-center justify-center rounded-button text-text-muted hover:text-primary hover:bg-primary-light transition-colors"
            aria-label={t('notifications.markAsRead')}
          >
            <Check size={13} />
          </button>
        )}
        <button
          type="button"
          onClick={() => onDismiss(notification.id)}
          className="flex h-6 w-6 items-center justify-center rounded-button text-text-muted hover:text-danger hover:bg-danger-light transition-colors"
          aria-label={t('notifications.dismiss')}
        >
          <X size={13} />
        </button>
      </div>
    </div>
  )
}