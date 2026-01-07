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
    
    // Get user growth data for the specified number of days
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)
    startDate.setHours(0, 0, 0, 0) // Start of day
    
    // Fetch all users from the users table created in the specified period
    const { data: users, error } = await adminClient
      .from('users')
      .select('created_at')
      .gte('created_at', startDate.toISOString())
      .order('created_at', { ascending: true })
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    // Initialize all dates in the period with 0
    const userGrowth: Record<string, number> = {}
    for (let i = 0; i < days; i++) {
      const date = new Date()
      date.setDate(date.getDate() - (days - 1 - i))
      date.setHours(0, 0, 0, 0) // Start of day for consistent comparison
      const dateKey = date.toISOString().split('T')[0]
      userGrowth[dateKey] = 0
    }
    
    // Count users by creation date (using date only, ignoring time)
    users?.forEach((user) => {
      if (user.created_at) {
        const userDate = new Date(user.created_at)
        userDate.setHours(0, 0, 0, 0) // Normalize to start of day
        const dateKey = userDate.toISOString().split('T')[0]
        if (userGrowth[dateKey] !== undefined) {
          userGrowth[dateKey]++
        }
      }
    })
    
    // Convert to array format for the chart
    const chartData = Object.entries(userGrowth)
      .map(([date, count]) => ({
        date,
        count,
      }))
      .sort((a, b) => a.date.localeCompare(b.date))
    
    return NextResponse.json({ data: chartData })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

