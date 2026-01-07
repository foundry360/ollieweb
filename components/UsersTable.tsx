'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { Check, Circle, XCircle, Phone, MoreVertical, ChevronLeft, ChevronRight, Home, User as UserIcon, Users, Shield } from 'lucide-react'
import { User } from '@/lib/types/database'
import { UserDetailModal } from './UserDetailModal'

export function UsersTable() {
  const [roleFilter, setRoleFilter] = useState<string>('all')
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [recordsPerPage, setRecordsPerPage] = useState(25)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const { data, isLoading, error } = useQuery({
    queryKey: ['users', roleFilter, search, currentPage, recordsPerPage],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: recordsPerPage.toString(),
      })

      if (roleFilter !== 'all') params.append('role', roleFilter)
      if (search) params.append('search', search)

      const response = await fetch(`/api/admin/users/list?${params}`)
      if (!response.ok) throw new Error('Failed to fetch users')
      return response.json()
    },
  })

  if (isLoading) {
    return <div className="text-center py-12">Loading...</div>
  }

  if (error) {
    return <div className="text-center py-12 text-red-600">Error loading users</div>
  }

  const users = data?.users || []
  const total = data?.total || 0
  const totalPages = Math.ceil(total / recordsPerPage)
  const startIndex = (currentPage - 1) * recordsPerPage
  const endIndex = startIndex + recordsPerPage

  const handleFilterChange = (value: string) => {
    setRoleFilter(value)
    setCurrentPage(1)
  }

  const handleSearchChange = (value: string) => {
    setSearch(value)
    setCurrentPage(1)
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'poster':
        return <Home className="w-4 h-4" style={{ color: '#ff6105' }} />
      case 'teen':
        return <UserIcon className="w-4 h-4 text-primary" style={{ strokeWidth: 2.5 }} />
      case 'parent':
        return <Users className="w-4 h-4" style={{ color: '#1e3a8a', strokeWidth: 2.5 }} />
      case 'admin':
        return <Shield className="w-4 h-4 text-gray-500" style={{ strokeWidth: 2.5 }} />
      default:
        return null
    }
  }

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'poster':
        return 'Neighbor'
      case 'teen':
        return 'Teenlancer'
      case 'parent':
        return 'Parent'
      case 'admin':
        return 'Admin'
      default:
        return role
    }
  }

  return (
    <div>
      <div className="mb-4 flex gap-4 items-center">
        <div className="flex gap-2">
          <button
            onClick={() => handleFilterChange('all')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              roleFilter === 'all'
                ? 'border-primary text-gray-900 font-bold'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
            }`}
          >
            All Roles
          </button>
          {(['teen', 'poster', 'parent', 'admin'] as const).map((role) => (
            <button
              key={role}
              onClick={() => handleFilterChange(role)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
                roleFilter === role
                  ? 'border-primary text-gray-900 font-bold'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              {getRoleIcon(role)}
              {getRoleLabel(role)}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Search by name, email, or phone..."
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="flex-1 max-w-xs px-3 py-1.5 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <div className="flex items-center gap-2">
          <label className="text-xs text-gray-600">Show:</label>
          <select
            value={recordsPerPage}
            onChange={(e) => {
              setRecordsPerPage(Number(e.target.value))
              setCurrentPage(1)
            }}
            className="px-2 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={75}>75</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Verified
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user: User, index: number) => (
                <tr key={user.id} className={`hover:bg-gray-50 ${index % 2 === 1 ? 'bg-gray-50' : ''}`}>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-xs font-medium text-gray-900">{user.full_name || 'No name'}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{user.email}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      {getRoleIcon(user.role)}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {user.phone ? (
                      <div className="flex items-center text-xs text-gray-600">
                        <Phone className="w-3 h-3 mr-1.5" />
                        {user.phone}
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      {user.application_status === 'approved' || user.application_status === 'active' ? (
                        <Check className="w-4 h-4 text-primary" style={{ strokeWidth: 3 }} />
                      ) : user.application_status === 'pending' ? (
                        <Circle className="w-4 h-4" style={{ color: '#ff6105', fill: 'none', strokeWidth: 2.5 }} />
                      ) : user.application_status === 'rejected' ? (
                        <XCircle className="w-4 h-4 text-red-600" />
                      ) : (
                        <span className="text-xs text-gray-400">—</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {user.verified ? (
                      <span className="flex items-center gap-1 text-xs text-green-600">
                        <Phone className="w-3 h-3" />
                        Verified
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400">Not verified</span>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-xs text-gray-500">
                      {format(new Date(user.created_at), 'MMM d, yyyy')}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs font-medium relative">
                    <div className="relative">
                      <button
                        onClick={() => setOpenDropdown(openDropdown === user.id ? null : user.id)}
                        className="p-1 text-gray-400 hover:text-gray-600 focus:outline-none"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                      {openDropdown === user.id && (
                        <>
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setOpenDropdown(null)}
                          />
                          <div className="absolute right-0 mt-1 w-40 bg-white rounded-md shadow-lg z-20 border border-gray-200">
                            <button
                              onClick={() => {
                                setSelectedUser(user)
                                setOpenDropdown(null)
                              }}
                              className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 flex items-center"
                            >
                              View Details
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No users found
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      {users.length > 0 && (
        <div className="mt-4 flex items-center justify-end gap-4">
          <div className="text-xs text-gray-500">
            Showing {startIndex + 1} to {Math.min(endIndex, total)} of {total} results
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-1.5 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum: number
                if (totalPages <= 5) {
                  pageNum = i + 1
                } else if (currentPage <= 3) {
                  pageNum = i + 1
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i
                } else {
                  pageNum = currentPage - 2 + i
                }
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-2 py-1 text-xs rounded ${
                      currentPage === pageNum
                        ? 'bg-primary text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              })}
            </div>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {selectedUser && (
        <UserDetailModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  )
}




