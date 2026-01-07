'use client'

import { useQuery } from '@tanstack/react-query'
import { Users, CheckCircle } from 'lucide-react'

export function AnalyticsDashboard() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['analytics-stats'],
    queryFn: async () => {
      const response = await fetch('/api/admin/stats')
      if (!response.ok) throw new Error('Failed to fetch stats')
      return response.json()
    },
  })

  if (isLoading) {
    return <div className="text-center py-12">Loading analytics...</div>
  }

  if (error) {
    return <div className="text-center py-12 text-red-600">Error loading analytics</div>
  }

  if (!data) return null

  return (
    <div className="space-y-6">
      {/* Users Stats */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
          <Users className="w-5 h-5" />
          Users Statistics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <div className="text-sm text-gray-600">Total Users</div>
            <div className="text-2xl font-bold text-gray-900">{data.users.total}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Verified</div>
            <div className="text-2xl font-bold text-green-600">{data.users.verified}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Unverified</div>
            <div className="text-2xl font-bold text-yellow-600">{data.users.unverified}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">By Role</div>
            <div className="text-sm text-gray-900 mt-1">
              {Object.entries(data.users.byRole).map(([role, count]) => (
                <div key={role}>
                  {role}: <strong>{count as number}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Approvals Stats */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          Approvals Statistics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="text-sm text-gray-600">Neighbor Approvals</div>
            <div className="text-2xl font-bold text-yellow-600">
              {data.approvals.neighbors.pending} pending
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Total: {data.approvals.neighbors.total}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Parent Approvals</div>
            <div className="text-2xl font-bold text-yellow-600">
              {data.approvals.parent.pending} pending
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Total: {data.approvals.parent.total}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Completion Approvals</div>
            <div className="text-2xl font-bold text-yellow-600">
              {data.approvals.completion.pending} pending
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Total: {data.approvals.completion.total}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}




