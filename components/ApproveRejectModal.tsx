'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { PendingNeighborApplication } from '@/lib/types/database'

interface ApproveRejectModalProps {
  application: PendingNeighborApplication
  onClose: () => void
  onReject: (reason?: string) => void
}

export function ApproveRejectModal({ application, onClose, onReject }: ApproveRejectModalProps) {
  const [reason, setReason] = useState('')

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Reject Application</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">
            Rejecting application for <strong>{application.full_name}</strong>
          </p>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rejection Reason (optional)
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter reason for rejection..."
          />
        </div>
        <div className="flex gap-2 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => onReject(reason || undefined)}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  )
}














