'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { Send, Users, UserCheck, UserX, Mail } from 'lucide-react'
import { User } from '@/lib/types/database'

export function MessagesPanel() {
  const [recipientType, setRecipientType] = useState<'all' | 'role' | 'status' | 'individual'>('all')
  const [selectedRole, setSelectedRole] = useState<string>('teen')
  const [selectedStatus, setSelectedStatus] = useState<string>('verified')
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [message, setMessage] = useState('')
  const [isSending, setIsSending] = useState(false)

  const { data: users, isLoading } = useQuery({
    queryKey: ['all-users'],
    queryFn: async () => {
      const response = await fetch('/api/admin/users/list?limit=1000')
      if (!response.ok) throw new Error('Failed to fetch users')
      const data = await response.json()
      return data.users || []
    },
  })

  const getRecipientIds = (): string[] => {
    if (!users) return []

    switch (recipientType) {
      case 'all':
        return users.map((u: User) => u.id)
      case 'role':
        return users.filter((u: User) => u.role === selectedRole).map((u: User) => u.id)
      case 'status':
        if (selectedStatus === 'verified') {
          return users.filter((u: User) => u.verified).map((u: User) => u.id)
        } else {
          return users.filter((u: User) => !u.verified).map((u: User) => u.id)
        }
      case 'individual':
        return selectedUsers
      default:
        return []
    }
  }

  const handleSend = async () => {
    const recipientIds = getRecipientIds()

    if (recipientIds.length === 0) {
      toast.error('No recipients selected')
      return
    }

    if (!message.trim()) {
      toast.error('Message content is required')
      return
    }

    setIsSending(true)
    try {
      const response = await fetch('/api/admin/messages/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipientIds,
          content: message,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to send')
      }

      const data = await response.json()
      toast.success(`Message sent to ${data.sent} recipient(s)`)
      setMessage('')
      setSelectedUsers([])
    } catch (error: any) {
      toast.error(error.message || 'Failed to send message')
    } finally {
      setIsSending(false)
    }
  }

  const recipientCount = getRecipientIds().length

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Compose Message</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recipients
              </label>
              <select
                value={recipientType}
                onChange={(e) => setRecipientType(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">All Users</option>
                <option value="role">By Role</option>
                <option value="status">By Verification Status</option>
                <option value="individual">Individual Users</option>
              </select>
            </div>

            {recipientType === 'role' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Role
                </label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="teen">Teen</option>
                  <option value="poster">Poster</option>
                  <option value="parent">Parent</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            )}

            {recipientType === 'status' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Verification Status
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="verified">Verified</option>
                  <option value="unverified">Unverified</option>
                </select>
              </div>
            )}

            {recipientType === 'individual' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Users
                </label>
                <div className="max-h-60 overflow-y-auto border border-gray-300 rounded-md">
                  {isLoading ? (
                    <div className="p-4 text-center text-gray-500">Loading users...</div>
                  ) : (
                    <div className="divide-y">
                      {users?.map((user: User) => (
                        <label key={user.id} className="flex items-center p-3 hover:bg-gray-50">
                          <input
                            type="checkbox"
                            checked={selectedUsers.includes(user.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedUsers([...selectedUsers, user.id])
                              } else {
                                setSelectedUsers(selectedUsers.filter((id) => id !== user.id))
                              }
                            }}
                            className="mr-3"
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {user.full_name || 'No name'}
                            </div>
                            <div className="text-xs text-gray-500">{user.email}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message Content
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter your message..."
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Will be sent to <strong>{recipientCount}</strong> recipient{recipientCount !== 1 ? 's' : ''}
              </div>
              <button
                onClick={handleSend}
                disabled={isSending || recipientCount === 0 || !message.trim()}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4 mr-2" />
                {isSending ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recipient Preview</h2>
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <Users className="w-4 h-4 mr-2" />
              Total Recipients: <strong className="ml-1">{recipientCount}</strong>
            </div>
            {recipientType === 'role' && (
              <div className="text-sm text-gray-600">
                Role: <strong>{selectedRole}</strong>
              </div>
            )}
            {recipientType === 'status' && (
              <div className="text-sm text-gray-600">
                Status: <strong>{selectedStatus === 'verified' ? 'Verified' : 'Unverified'}</strong>
              </div>
            )}
            {recipientType === 'individual' && (
              <div className="text-sm text-gray-600">
                Selected: <strong>{selectedUsers.length}</strong> user{selectedUsers.length !== 1 ? 's' : ''}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}





