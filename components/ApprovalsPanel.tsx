'use client'

import { format } from 'date-fns'
import { ParentApproval, CompletionApproval } from '@/lib/types/database'

interface ApprovalsPanelProps {
  parentApprovals: ParentApproval[]
  completionApprovals: CompletionApproval[]
}

export function ApprovalsPanel({ parentApprovals, completionApprovals }: ApprovalsPanelProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Parent Approvals ({parentApprovals.length})
        </h2>
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {parentApprovals.map((approval) => (
              <li key={approval.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      Gig: {approval.gig_id.substring(0, 8)}...
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      Teen: {approval.teen_id.substring(0, 8)}... | Parent: {approval.parent_id.substring(0, 8)}...
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {format(new Date(approval.created_at), 'MMM d, yyyy h:mm a')}
                    </div>
                  </div>
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    Pending
                  </span>
                </div>
              </li>
            ))}
            {parentApprovals.length === 0 && (
              <li className="px-6 py-12 text-center text-gray-500">
                No pending parent approvals
              </li>
            )}
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Completion Approvals ({completionApprovals.length})
        </h2>
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {completionApprovals.map((approval) => (
              <li key={approval.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      Gig: {approval.gig_id.substring(0, 8)}...
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      Poster: {approval.poster_id.substring(0, 8)}... | Teen: {approval.teen_id.substring(0, 8)}...
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {format(new Date(approval.created_at), 'MMM d, yyyy h:mm a')}
                    </div>
                  </div>
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    Pending
                  </span>
                </div>
              </li>
            ))}
            {completionApprovals.length === 0 && (
              <li className="px-6 py-12 text-center text-gray-500">
                No pending completion approvals
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}













