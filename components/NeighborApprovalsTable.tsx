'use client'

import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { format } from 'date-fns'
import { CheckCircle, XCircle, Phone, Mail, MapPin, Calendar, MoreVertical, Check, Circle, ChevronLeft, ChevronRight, Shield } from 'lucide-react'
import { PendingNeighborApplication } from '@/lib/types/database'
import { ApproveRejectModal } from './ApproveRejectModal'
import { NeighborVerificationModal } from './NeighborVerificationModal'

interface NeighborApprovalsTableProps {
  applications: PendingNeighborApplication[]
}

export function NeighborApprovalsTable({ applications: initialApplications }: NeighborApprovalsTableProps) {
  const [selectedApplication, setSelectedApplication] = useState<PendingNeighborApplication | null>(null)
  const [verificationApplication, setVerificationApplication] = useState<PendingNeighborApplication | null>(null)
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all')
  const [search, setSearch] = useState('')
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [recordsPerPage, setRecordsPerPage] = useState(25)
  const queryClient = useQueryClient()

  const filteredApplications = initialApplications.filter((app) => {
    const matchesFilter = filter === 'all' || app.status === filter
    const matchesSearch = 
      app.full_name.toLowerCase().includes(search.toLowerCase()) ||
      app.email.toLowerCase().includes(search.toLowerCase()) ||
      app.phone.includes(search)
    return matchesFilter && matchesSearch
  })

  // Reset to page 1 when filter or search changes
  const handleFilterChange = (newFilter: typeof filter) => {
    setFilter(newFilter)
    setCurrentPage(1)
  }

  const handleSearchChange = (value: string) => {
    setSearch(value)
    setCurrentPage(1)
  }

  // Calculate pagination
  const totalPages = Math.ceil(filteredApplications.length / recordsPerPage)
  const startIndex = (currentPage - 1) * recordsPerPage
  const endIndex = startIndex + recordsPerPage
  const paginatedApplications = filteredApplications.slice(startIndex, endIndex)

  const handleApprove = async (applicationId: string) => {
    try {
      const response = await fetch('/api/admin/neighbors/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ applicationId }),
      })

      let data
      try {
        data = await response.json()
      } catch (jsonError) {
        const text = await response.text()
        console.error('Failed to parse JSON response:', text)
        throw new Error(`Server error: ${response.status} ${response.statusText}`)
      }

      if (!response.ok) {
        const errorMessage = data.details 
          ? `${data.error}: ${data.details}`
          : data.error || `Failed to approve (${response.status})`
        console.error('Approval error response:', data)
        console.error('Full error details:', {
          status: response.status,
          statusText: response.statusText,
          error: data.error,
          details: data.details,
          code: data.code,
          hint: data.hint
        })
        throw new Error(errorMessage)
      }

      toast.success('Application approved successfully')
      queryClient.invalidateQueries({ queryKey: ['neighbor-applications'] })
      window.location.reload()
    } catch (error: any) {
      console.error('Approval failed:', error)
      toast.error(error.message || 'Failed to approve application')
    }
  }

  const handleReject = async (applicationId: string, reason?: string) => {
    try {
      const response = await fetch('/api/admin/neighbors/reject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ applicationId, rejectionReason: reason }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to reject')
      }

      toast.success('Application rejected')
      queryClient.invalidateQueries({ queryKey: ['neighbor-applications'] })
      window.location.reload()
    } catch (error: any) {
      toast.error(error.message || 'Failed to reject application')
    }
  }

  return (
    <div>
      <div className="mb-4 flex gap-4 items-center">
        <div className="flex gap-2">
          {(['all', 'pending', 'approved', 'rejected'] as const).map((status) => (
            <button
              key={status}
              onClick={() => handleFilterChange(status)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                filter === status
                  ? 'border-primary text-gray-900 font-bold'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
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
                  Phone
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Address
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date of Birth
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Verified
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applied
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedApplications.map((app, index) => (
                <tr key={app.id} className={`hover:bg-gray-50 ${index % 2 === 1 ? 'bg-gray-50' : ''}`}>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-xs font-medium text-gray-900">{app.full_name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{app.email}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center text-xs text-gray-600">
                      <Phone className="w-3 h-3 mr-1.5" />
                      {app.phone}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-xs text-gray-600">
                      {app.address ? (
                        <div className="flex items-center">
                          <MapPin className="w-3 h-3 mr-1.5 flex-shrink-0" />
                          <span className="truncate max-w-xs">{app.address}</span>
                        </div>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-xs text-gray-600">
                      {app.date_of_birth ? (
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1.5" />
                          {format(new Date(app.date_of_birth), 'MMM d, yyyy')}
                        </div>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      {app.status === 'approved' ? (
                        <Check className="w-4 h-4 text-primary" style={{ strokeWidth: 3 }} />
                      ) : app.status === 'pending' ? (
                        <Circle className="w-4 h-4" style={{ color: '#ff6105', fill: 'none', strokeWidth: 2.5 }} />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-600" />
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {app.phone_verified ? (
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
                      {format(new Date(app.created_at), 'MMM d, yyyy')}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs font-medium relative">
                    <div className="relative">
                      <button
                        onClick={() => setOpenDropdown(openDropdown === app.id ? null : app.id)}
                        className="p-1 text-gray-400 hover:text-gray-600 focus:outline-none"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                      {openDropdown === app.id && (
                        <>
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setOpenDropdown(null)}
                          />
                          <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-20 border border-gray-200">
                            {/* View Verification - available for all applications */}
                            <button
                              onClick={() => {
                                setVerificationApplication(app)
                                setOpenDropdown(null)
                              }}
                              className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 flex items-center border-b border-gray-200"
                            >
                              <Shield className="w-3 h-3 mr-2 text-blue-600" />
                              View Verification
                            </button>
                            
                            {app.status === 'pending' ? (
                              <>
                                <button
                                  onClick={() => {
                                    handleApprove(app.id)
                                    setOpenDropdown(null)
                                  }}
                                  className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 flex items-center"
                                >
                                  <CheckCircle className="w-3 h-3 mr-2 text-green-600" />
                                  Approve
                                </button>
                                <button
                                  onClick={() => {
                                    setSelectedApplication(app)
                                    setOpenDropdown(null)
                                  }}
                                  className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 flex items-center"
                                >
                                  <XCircle className="w-3 h-3 mr-2 text-red-600" />
                                  Reject
                                </button>
                              </>
                            ) : app.rejection_reason ? (
                              <div className="px-4 py-2 text-xs text-red-600">
                                {app.rejection_reason}
                              </div>
                            ) : null}
                          </div>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {paginatedApplications.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No applications found
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      {filteredApplications.length > 0 && (
        <div className="mt-4 flex items-center justify-end gap-4">
          <div className="text-xs text-gray-500">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredApplications.length)} of {filteredApplications.length} results
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

      {selectedApplication && (
        <ApproveRejectModal
          application={selectedApplication}
          onClose={() => setSelectedApplication(null)}
          onReject={(reason) => {
            handleReject(selectedApplication.id, reason)
            setSelectedApplication(null)
          }}
        />
      )}

      {verificationApplication && (
        <NeighborVerificationModal
          application={verificationApplication}
          onClose={() => setVerificationApplication(null)}
          onVerified={() => {
            // Refresh the page to show updated verification status
            window.location.reload()
          }}
        />
      )}
    </div>
  )
}

