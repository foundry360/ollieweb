import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { createAdminClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    await requireAuth()
    const adminClient = createAdminClient()
    
    const { searchParams } = new URL(request.url)
    const days = parseInt(searchParams.get('days') || '30')
    
    // Calculate date ranges
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)
    startDate.setHours(0, 0, 0, 0)
    
    const previousStartDate = new Date()
    previousStartDate.setDate(previousStartDate.getDate() - (days * 2))
    previousStartDate.setHours(0, 0, 0, 0)
    
    const previousEndDate = new Date()
    previousEndDate.setDate(previousEndDate.getDate() - days)
    previousEndDate.setHours(23, 59, 59, 999)
    
    // Fetch current period data
    const [authUsersData, neighborsPending, gigsOpen] = await Promise.all([
      adminClient.auth.admin.listUsers(),
      adminClient.from('pending_neighbor_applications')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'pending'),
      adminClient.from('gigs')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'open'),
    ])
    
    // Count current values
    const totalUsersCount = authUsersData?.data?.users?.length || 0
    
    // Active users: users who signed in within the date range
    const activeUsersCount = authUsersData?.data?.users?.filter(
      user => user.last_sign_in_at && new Date(user.last_sign_in_at) >= startDate
    ).length || 0
    
    // Calculate previous period values
    // Total users in previous period = current - users created in current period
    const usersCreatedInCurrentPeriod = authUsersData?.data?.users?.filter(
      user => user.created_at && new Date(user.created_at) >= startDate
    ).length || 0
    const previousTotalUsers = Math.max(0, totalUsersCount - usersCreatedInCurrentPeriod)
    
    // Active users in previous period
    const previousActiveUsers = authUsersData?.data?.users?.filter(
      user => user.last_sign_in_at && 
        new Date(user.last_sign_in_at) >= previousStartDate && 
        new Date(user.last_sign_in_at) <= previousEndDate
    ).length || 0
    
    // Previous period counts for pending neighbors and open gigs
    const [previousNeighborsPending, previousGigsOpen] = await Promise.all([
      adminClient.from('pending_neighbor_applications')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'pending')
        .gte('created_at', previousStartDate.toISOString())
        .lte('created_at', previousEndDate.toISOString()),
      adminClient.from('gigs')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'open')
        .gte('created_at', previousStartDate.toISOString())
        .lte('created_at', previousEndDate.toISOString()),
    ])
    
    const previousPendingNeighbors = previousNeighborsPending.count || 0
    const previousOpenGigs = previousGigsOpen.count || 0
    
    // Calculate percentage changes
    const calculatePercentageChange = (current: number, previous: number): number => {
      if (previous === 0) return current > 0 ? 100 : 0
      return ((current - previous) / previous) * 100
    }
    
    return NextResponse.json({
      totalUsers: {
        current: totalUsersCount,
        change: calculatePercentageChange(totalUsersCount, previousTotalUsers),
      },
      activeUsers: {
        current: activeUsersCount,
        change: calculatePercentageChange(activeUsersCount, previousActiveUsers),
      },
      pendingNeighbors: {
        current: neighborsPending.count || 0,
        change: calculatePercentageChange(neighborsPending.count || 0, previousPendingNeighbors),
      },
      openGigs: {
        current: gigsOpen.count || 0,
        change: calculatePercentageChange(gigsOpen.count || 0, previousOpenGigs),
      },
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}


