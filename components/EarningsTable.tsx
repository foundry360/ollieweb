'use client'

import { useState, useMemo } from 'react'
import { format } from 'date-fns'
import { DollarSign, CheckCircle, Clock, XCircle } from 'lucide-react'
import { Earnings } from '@/lib/types/database'

interface EarningsTableProps {
  earnings: Earnings[]
}

export function EarningsTable({ earnings: initialEarnings }: EarningsTableProps) {
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const filteredEarnings = initialEarnings.filter((earning) => {
    return statusFilter === 'all' || earning.status === statusFilter
  })

  const totals = useMemo(() => {
    const paid = filteredEarnings
      .filter((e) => e.status === 'paid')
      .reduce((sum, e) => sum + parseFloat(e.amount.toString()), 0)
    const pending = filteredEarnings
      .filter((e) => e.status === 'pending')
      .reduce((sum, e) => sum + parseFloat(e.amount.toString()), 0)
    const total = filteredEarnings.reduce(
      (sum, e) => sum + parseFloat(e.amount.toString()),
      0
    )
    return { paid, pending, total }
  }, [filteredEarnings])

  const statusIcons: Record<string, any> = {
    paid: CheckCircle,
    pending: Clock,
    cancelled: XCircle,
  }

  const statusColors: Record<string, string> = {
    paid: 'text-green-600',
    pending: 'text-yellow-600',
    cancelled: 'text-red-600',
  }

  return (
    <div>
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-600">Total Paid</div>
          <div className="text-2xl font-bold text-green-600">
            ${totals.paid.toFixed(2)}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-600">Pending</div>
          <div className="text-2xl font-bold text-yellow-600">
            ${totals.pending.toFixed(2)}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-600">Total Earnings</div>
          <div className="text-2xl font-bold text-gray-900">
            ${totals.total.toFixed(2)}
          </div>
        </div>
      </div>

      <div className="mb-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="all">All Status</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Teen ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paid At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEarnings.map((earning) => {
                const Icon = statusIcons[earning.status] || DollarSign
                return (
                  <tr key={earning.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {earning.teen_id.substring(0, 8)}...
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${parseFloat(earning.amount.toString()).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`flex items-center gap-1 ${statusColors[earning.status] || 'text-gray-600'}`}>
                        <Icon className="w-4 h-4" />
                        {earning.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {earning.paid_at
                        ? format(new Date(earning.paid_at), 'MMM d, yyyy')
                        : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {format(new Date(earning.created_at), 'MMM d, yyyy')}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        {filteredEarnings.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No earnings found
          </div>
        )}
      </div>
    </div>
  )
}














