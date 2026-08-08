import { useState, useCallback, useMemo } from 'react'
import { useEffect } from 'react'
import { useAuth } from '@/features/auth/hooks/useAuth'
import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
} from '../../services/notificationService'
import { NotificationContext } from './NotificationContext'

export const NotificationProvider = ({ children }) => {
  const { user } = useAuth()
  const uid = user?.uid

  const [notifications, setNotifications] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isCancelled = false

    queueMicrotask(() => {
      if (isCancelled) return

      if (!uid) {
        setNotifications([])
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      setError(null)

      getNotifications(uid)
        .then((fetchedNotifications) => {
          if (!isCancelled) setNotifications(fetchedNotifications)
        })
        .catch((loadError) => {
          if (isCancelled) return
          console.error('Failed to load notifications:', loadError)
          setError('Failed to load notifications')
        })
        .finally(() => {
          if (!isCancelled) setIsLoading(false)
        })
    })

    return () => {
      isCancelled = true
    }
  }, [uid])

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  )

  const markAsRead = useCallback(
    (id) => {
      const target = notifications.find((n) => n.id === id)
      if (!uid || !target || target.read) return

      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      )

      markNotificationAsRead(uid, id).catch((operationError) => {
        console.error('Failed to mark notification as read:', operationError)
        setNotifications((prev) =>
          prev.map((n) => (n.id === id ? { ...n, read: false } : n))
        )
        setError('Failed to mark notification as read')
      })
    },
    [uid, notifications]
  )

  const markAllAsRead = useCallback(() => {
    if (!uid) return

    const unreadIds = notifications.filter((n) => !n.read).map((n) => n.id)
    if (unreadIds.length === 0) return

    const previousNotifications = notifications

    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))

    markAllNotificationsAsRead(uid, unreadIds).catch((operationError) => {
      console.error('Failed to mark all notifications as read:', operationError)
      setNotifications(previousNotifications)
      setError('Failed to mark all notifications as read')
    })
  }, [uid, notifications])

  const dismiss = useCallback(
    (id) => {
      if (!uid) return

      const previousNotifications = notifications

      setNotifications((prev) => prev.filter((n) => n.id !== id))

      deleteNotification(uid, id).catch((operationError) => {
        console.error('Failed to dismiss notification:', operationError)
        setNotifications(previousNotifications)
        setError('Failed to dismiss notification')
      })
    },
    [uid, notifications]
  )

  const value = useMemo(
    () => ({
      notifications,
      unreadCount,
      markAsRead,
      markAllAsRead,
      dismiss,
      isLoading,
      error,
    }),
    [notifications, unreadCount, markAsRead, markAllAsRead, dismiss, isLoading, error]
  )

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}