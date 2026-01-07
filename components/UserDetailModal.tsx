'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { X, Edit, Save } from 'lucide-react'
import { format } from 'date-fns'
import toast from 'react-hot-toast'
import { User } from '@/lib/types/database'

interface UserDetailModalProps {
  user: User
  onClose: () => void
}

export function UserDetailModal({ user, onClose }: UserDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState({
    role: user.role,
    verified: user.verified,
    application_status: user.application_status,
  })

  const { data: relatedData, isLoading } = useQuery({
    queryKey: ['user-detail', user.id],
    queryFn: async () => {
      const [gigs, earnings] = await Promise.all([
        fetch(`/api/admin/users/${user.id}/gigs`).then((r) => r.json()).catch(() => ({ gigs: [] })),
        fetch(`/api/admin/users/${user.id}/earnings`).then((r) => r.json()).catch(() => ({ earnings: [] })),
      ])
      return { gigs: gigs.gigs || [], earnings: earnings.earnings || [] }
    },
  })

  const handleSave = async () => {
    try {
      const response = await fetch('/api/admin/users/update', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          updates: editedUser,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to update')
      }

      toast.success('User updated successfully')
      setIsEditing(false)
      window.location.reload()
    } catch (error: any) {
      toast.error(error.message || 'Failed to update user')
    }
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-3xl shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-900">User Details</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700">Full Name</label>
              <p className="mt-1 text-sm text-gray-900">{user.full_name || 'N/A'}</p>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700">Email</label>
              <p className="mt-1 text-sm text-gray-900">{user.email}</p>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700">Phone</label>
              <p className="mt-1 text-sm text-gray-900">{user.phone || 'N/A'}</p>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700">Date of Birth</label>
              <p className="mt-1 text-sm text-gray-900">
                {user.date_of_birth ? format(new Date(user.date_of_birth), 'MMM d, yyyy') : 'N/A'}
              </p>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700">Role</label>
              {isEditing ? (
                <select
                  value={editedUser.role}
                  onChange={(e) => setEditedUser({ ...editedUser, role: e.target.value as any })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary"
                >
                  <option value="teen">Teen</option>
                  <option value="poster">Poster</option>
                  <option value="parent">Parent</option>
                  <option value="admin">Admin</option>
                </select>
              ) : (
                <p className="mt-1 text-sm text-gray-900">{user.role}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700">Verified</label>
              {isEditing ? (
                <input
                  type="checkbox"
                  checked={editedUser.verified}
                  onChange={(e) => setEditedUser({ ...editedUser, verified: e.target.checked })}
                  className="mt-1"
                />
              ) : (
                <p className="mt-1 text-sm text-gray-900">{user.verified ? 'Yes' : 'No'}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700">Application Status</label>
              {isEditing ? (
                <select
                  value={editedUser.application_status || ''}
                  onChange={(e) => setEditedUser({ ...editedUser, application_status: e.target.value as any || null })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary"
                >
                  <option value="">None</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="active">Active</option>
                </select>
              ) : (
                <p className="mt-1 text-sm text-gray-900">{user.application_status || 'N/A'}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700">Created At</label>
              <p className="mt-1 text-sm text-gray-900">
                {format(new Date(user.created_at), 'MMM d, yyyy h:mm a')}
              </p>
            </div>
          </div>

          {user.bio && (
            <div>
              <label className="block text-sm font-bold text-gray-700">Bio</label>
              <p className="mt-1 text-sm text-gray-900">{user.bio}</p>
            </div>
          )}

          {user.skills && user.skills.length > 0 && (
            <div>
              <label className="block text-sm font-bold text-gray-700">Skills</label>
              <div className="mt-1 flex flex-wrap gap-2">
                {user.skills.map((skill, idx) => (
                  <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {relatedData && (
            <div className="mt-6 border-t pt-4">
              <h4 className="text-sm font-bold text-gray-900 mb-2">Related Data</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Gigs: </span>
                  <span className="font-medium">{relatedData.gigs.length}</span>
                </div>
                <div>
                  <span className="text-gray-600">Earnings: </span>
                  <span className="font-medium">${relatedData.earnings.reduce((sum: number, e: any) => sum + parseFloat(e.amount), 0).toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4 border-t">
            {isEditing ? (
              <>
                <button
                  onClick={() => {
                    setIsEditing(false)
                    setEditedUser({
                      role: user.role,
                      verified: user.verified,
                      application_status: user.application_status,
                    })
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-600"
                >
                  <Save className="w-4 h-4 inline mr-1" />
                  Save
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-600"
              >
                <Edit className="w-4 h-4 inline mr-1" />
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}




