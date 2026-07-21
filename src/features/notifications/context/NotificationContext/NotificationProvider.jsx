import { useState, useCallback, useMemo } from 'react'
import { NotificationContext } from './NotificationContext'

const SAMPLE_NOTIFICATIONS = [
  { id: 'n1', type: 'task_reminder', title: 'Task due soon', description: 'Design review meeting prep is due in 2 hours', time: new Date(Date.now() - 1000 * 60 * 30), read: false },
  { id: 'n2', type: 'event_reminder', title: 'Event starting soon', description: 'Weekly team sync starts in 15 minutes', time: new Date(Date.now() - 1000 * 60 * 60 * 2), read: false },
  { id: 'n3', type: 'update', title: 'Project milestone updated', description: 'Q3 planning document has been shared with you', time: new Date(Date.now() - 1000 * 60 * 60 * 24), read: true },
  { id: 'n4', type: 'system', title: 'Calendar synced', description: 'Your Google Calendar was successfully synced', time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), read: true },
]

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(SAMPLE_NOTIFICATIONS)

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  )

  const markAsRead = useCallback((id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }, [])

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }, [])

  const dismiss = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }, [])

  const value = useMemo(
    () => ({ notifications, unreadCount, markAsRead, markAllAsRead, dismiss }),
    [notifications, unreadCount, markAsRead, markAllAsRead, dismiss]
  )

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}
