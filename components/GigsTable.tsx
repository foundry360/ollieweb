'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { MapPin, DollarSign, Calendar, User } from 'lucide-react'
import { Gig } from '@/lib/types/database'

interface GigsTableProps {
  gigs: Gig[]
}

export function GigsTable({ gigs: initialGigs }: GigsTableProps) {
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [search, setSearch] = useState('')

  const filteredGigs = initialGigs.filter((gig) => {
    const matchesStatus = statusFilter === 'all' || gig.status === statusFilter
    const matchesSearch =
      gig.title.toLowerCase().includes(search.toLowerCase()) ||
      gig.description?.toLowerCase().includes(search.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const statusColors: Record<string, string> = {
    open: 'bg-blue-100 text-blue-800',
    assigned: 'bg-yellow-100 text-yellow-800',
    accepted: 'bg-green-100 text-green-800',
    in_progress: 'bg-purple-100 text-purple-800',
    pending_completion_approval: 'bg-orange-100 text-orange-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  }

  return (
    <div>
      <div className="mb-4 flex gap-4 items-center">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="all">All Status</option>
          <option value="open">Open</option>
          <option value="assigned">Assigned</option>
          <option value="accepted">Accepted</option>
          <option value="in_progress">In Progress</option>
          <option value="pending_completion_approval">Pending Completion</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <input
          type="text"
          placeholder="Search gigs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredGigs.map((gig) => (
            <li key={gig.id} className="px-6 py-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-medium text-gray-900">{gig.title}</h3>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[gig.status] || 'bg-gray-100 text-gray-800'}`}>
                      {gig.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                  {gig.description && (
                    <p className="text-sm text-gray-600 mb-3">{gig.description}</p>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      ${parseFloat(gig.pay.toString()).toFixed(2)}
                    </div>
                    {gig.address && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {gig.address}
                      </div>
                    )}
                    {gig.scheduled_date && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {format(new Date(gig.scheduled_date), 'MMM d, yyyy')}
                      </div>
                    )}
                  </div>
                  {gig.required_skills && gig.required_skills.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {gig.required_skills.map((skill, idx) => (
                        <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="mt-2 text-xs text-gray-500">
                    Created: {format(new Date(gig.created_at), 'MMM d, yyyy h:mm a')}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {filteredGigs.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No gigs found
          </div>
        )}
      </div>
    </div>
  )
}













