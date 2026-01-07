import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { createAdminClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    await requireAuth()
    const adminClient = createAdminClient()

    // Fetch all stats in parallel
    const [
      usersByRole,
      verifiedUsers,
      totalGigs,
      totalEarnings,
      pendingNeighbors,
      pendingParentApprovals,
      pendingCompletionApprovals,
    ] = await Promise.all([
      adminClient.from('users').select('role'),
      adminClient.from('users').select('verified'),
      adminClient.from('gigs').select('status'),
      adminClient.from('earnings').select('status, amount'),
      adminClient.from('pending_neighbor_applications').select('status'),
      adminClient.from('parent_approvals').select('status'),
      adminClient.from('completion_approvals').select('status'),
    ])

    // Calculate stats
    const roleCounts: Record<string, number> = {}
    usersByRole.data?.forEach((user) => {
      roleCounts[user.role] = (roleCounts[user.role] || 0) + 1
    })

    const verifiedCount = verifiedUsers.data?.filter((u) => u.verified).length || 0
    const unverifiedCount = (verifiedUsers.data?.length || 0) - verifiedCount

    const gigStatusCounts: Record<string, number> = {}
    totalGigs.data?.forEach((gig) => {
      gigStatusCounts[gig.status] = (gigStatusCounts[gig.status] || 0) + 1
    })

    const earningsByStatus: Record<string, number> = {}
    let totalEarningsAmount = 0
    totalEarnings.data?.forEach((earning) => {
      earningsByStatus[earning.status] = (earningsByStatus[earning.status] || 0) + 1
      if (earning.status === 'paid') {
        totalEarningsAmount += parseFloat(earning.amount.toString())
      }
    })

    return NextResponse.json({
      users: {
        total: usersByRole.data?.length || 0,
        byRole: roleCounts,
        verified: verifiedCount,
        unverified: unverifiedCount,
      },
      gigs: {
        total: totalGigs.data?.length || 0,
        byStatus: gigStatusCounts,
      },
      earnings: {
        total: totalEarnings.data?.length || 0,
        byStatus: earningsByStatus,
        totalAmount: totalEarningsAmount,
      },
      approvals: {
        neighbors: {
          pending: pendingNeighbors.data?.filter((a) => a.status === 'pending').length || 0,
          total: pendingNeighbors.data?.length || 0,
        },
        parent: {
          pending: pendingParentApprovals.data?.filter((a) => a.status === 'pending').length || 0,
          total: pendingParentApprovals.data?.length || 0,
        },
        completion: {
          pending: pendingCompletionApprovals.data?.filter((a) => a.status === 'pending').length || 0,
          total: pendingCompletionApprovals.data?.length || 0,
        },
      },
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}




