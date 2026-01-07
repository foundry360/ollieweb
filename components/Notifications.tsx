'use client'

import { useState, useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Bell, UserCheck, DollarSign, UserPlus, X } from 'lucide-react'
import { AdminNotification } from '@/lib/types/database'
import { formatDistanceToNow } from 'date-fns'
import toast from 'react-hot-toast'

export function Notifications() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const queryClient = useQueryClient()

  const { data: notifications = [], isLoading } = useQuery<AdminNotification[]>({
    queryKey: ['admin-notifications'],
    queryFn: async () => {
      const response = await fetch('/api/admin/notifications?limit=50')
      if (!response.ok) throw new Error('Failed to fetch notifications')
      const data = await response.json()
      return data.notifications || []
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  })

  const { data: unreadCount = 0 } = useQuery<number>({
    queryKey: ['admin-notifications-unread-count'],
    queryFn: async () => {
      const response = await fetch('/api/admin/notifications/unread-count')
      if (!response.ok) throw new Error('Failed to fetch unread count')
      const data = await response.json()
      return data.count || 0
    },
    refetchInterval: 30000,
  })

  const handleNotificationClick = async (notification: AdminNotification) => {
    // Mark as read
    if (!notification.read) {
      try {
        await fetch(`/api/admin/notifications/${notification.id}/read`, {
          method: 'POST',
        })
        queryClient.invalidateQueries({ queryKey: ['admin-notifications'] })
        queryClient.invalidateQueries({ queryKey: ['admin-notifications-unread-count'] })
      } catch (error) {
        console.error('Failed to mark notification as read:', error)
      }
    }

    // Navigate to link if available
    if (notification.link) {
      router.push(notification.link)
      setIsOpen(false)
    }
  }

  const handleMarkAllRead = async () => {
    try {
      await fetch('/api/admin/notifications/read-all', {
        method: 'POST',
      })
      queryClient.invalidateQueries({ queryKey: ['admin-notifications'] })
      queryClient.invalidateQueries({ queryKey: ['admin-notifications-unread-count'] })
      toast.success('All notifications marked as read')
    } catch (error) {
      toast.error('Failed to mark all as read')
    }
  }

  const getNotificationIcon = (type: AdminNotification['type']) => {
    switch (type) {
      case 'neighbor_application':
        return <UserCheck className="w-4 h-4 text-orange-500" />
      case 'earnings_pending':
        return <DollarSign className="w-4 h-4 text-green-500" />
      case 'new_user':
        return <UserPlus className="w-4 h-4 text-blue-500" />
      default:
        return <Bell className="w-4 h-4 text-gray-500" />
    }
  }

  const unreadNotifications = notifications.filter(n => !n.read)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors relative"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-96 bg-white rounded-md shadow-lg z-20 border border-gray-200">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
              {unreadNotifications.length > 0 && (
                <button
                  onClick={handleMarkAllRead}
                  className="text-xs text-primary hover:text-primary/80 font-medium"
                >
                  Mark all read
                </button>
              )}
            </div>
            <div className="max-h-96 overflow-y-auto">
              {isLoading ? (
                <div className="p-4 text-center text-sm text-gray-500">
                  Loading...
                </div>
              ) : notifications.length === 0 ? (
                <div className="p-4 text-center text-sm text-gray-500">
                  No notifications
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      onClick={() => handleNotificationClick(notification)}
                      className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                        !notification.read ? 'bg-blue-50/50' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex-shrink-0">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p className={`text-sm font-medium ${
                              !notification.read ? 'text-gray-900' : 'text-gray-700'
                            }`}>
                              {notification.title}
                            </p>
                            {!notification.read && (
                              <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1.5"></span>
                            )}
                          </div>
                          <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

